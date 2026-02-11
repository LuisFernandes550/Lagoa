/**
 * WP Armour - Honeypot Anti Spam
 * jQuery Version
 *
 * @since 1.0.0
 * @updated 2.4.0 - Added WooCommerce/EDD support, MutationObserver for dynamic forms
 */

var wpa_field_name, wpa_unique_id, wpa_add_test, wpa_hidden_field;
var wpa_observer = null;
var wpa_debounce_timer = null;

jQuery(document).ready(function(){
	wpa_field_name 	= wpa_field_info.wpa_field_name;
	wpa_unique_id 	= wpa_field_info.wpa_field_value;
	wpa_add_test 	= wpa_field_info.wpa_add_test;

	wpa_hidden_field = "<div id='altEmail_container' class='altEmail_container'><label for='alt_s'>Alternative:</label><input type='text' id='alt_s' name='alt_s' autocomplete='off'></div><span class='wpa_hidden_field' style='display:none;height:0;width:0;overflow:hidden;position:absolute;left:-9999px;'><label>WPA <input type='text' name='"+wpa_field_name+"' value='"+wpa_unique_id+"' autocomplete='off' tabindex='-1' /></label></span>";

	wpa_add_honeypot_field();

	if (typeof wpae_add_honeypot_field == 'function') {
		wpae_add_honeypot_field();
	}

	if (wpa_add_test == 'yes'){
		wpa_add_test_block();
	}

	// Initialize MutationObserver for dynamically loaded forms
	wpa_init_observer();

	// Bind to WooCommerce/EDD specific events
	wpa_bind_dynamic_events();
});

/**
 * Test mode - act as spam bot for testing
 */
function wpa_act_as_spam(){
	var actiontype = jQuery('span.wpa-button').data('actiontype');
	if (actiontype == 'remove'){
		wpa_remove_honeypot_field();
		jQuery('span.wpa-button').data('actiontype','add');
		jQuery('span.wpa-button').html('Acting as Spam Bot');
	} else {
		wpa_add_honeypot_field();
		jQuery('span.wpa-button').data('actiontype','remove');
		jQuery('span.wpa-button').html('Act as Spam Bot');
	}
}

/**
 * Add honeypot fields to all matching forms
 */
function wpa_add_honeypot_field(){
	// Combined form selectors - organized by category
	var allFormSelectors = [
		// ===========================================
		// CONTACT FORM PLUGINS
		// ===========================================
		'form.wpcf7-form, .wpcf7 form',        // Contact Form 7
		'form.wpforms-form',                   // WPForms
		'.gform_wrapper form',                 // Gravity Forms
		'.frm_forms form',                     // Formidable Forms
		'.caldera-grid form',                  // Caldera Forms
		'.wp-block-toolset-cred-form form',    // Toolset Forms
		'form.cred-user-form',                 // Toolset Forms
		'form.cred-form',                      // Toolset Forms
		'form.et_pb_contact_form',             // Divi Form
		'form.fb_form',                        // Divi Form Builder - Divi Engine
		'form.elementor-form',                 // Elementor

		// ===========================================
		// WOOCOMMERCE FORMS
		// ===========================================
		'form.woocommerce-checkout',           // WooCommerce Checkout
		'form.checkout',                       // WooCommerce Checkout (alt)
		'form.checkout_coupon',                // WooCommerce Coupon Form
		'form.woocommerce-form-register',      // WooCommerce Registration
		'form.woocommerce-form-login',         // WooCommerce Login
		'form.woocommerce-ResetPassword',      // WooCommerce Password Reset
		'form.woocommerce-EditAccountForm',    // WooCommerce Edit Account
		'form.woocommerce-address-fields',     // WooCommerce Address Form
		'form.cart',                           // WooCommerce Cart/Add to Cart
		'form.woocommerce-form-coupon',        // WooCommerce Coupon
		'#review_form form',                   // WooCommerce Product Reviews
		'.woocommerce-Reviews form',           // WooCommerce Reviews (alt)
		'form.woocommerce-form',               // Generic WooCommerce form class

		// ===========================================
		// EASY DIGITAL DOWNLOADS (EDD) FORMS
		// ===========================================
		'form#edd_purchase_form',              // EDD Checkout
		'form#edd_login_form',                 // EDD Login
		'form#edd_register_form',              // EDD Registration
		'form#edd_profile_editor_form',        // EDD Profile Editor
		'form#edd-reviews-form',               // EDD Reviews
		'form.edd_form',                       // Generic EDD form class
		'form.edd_download_purchase_form',     // EDD Download Purchase
		'form#edd_lost_password_form',         // EDD Lost Password
		'.edd-free-download form',             // EDD Free Downloads extension

		// ===========================================
		// GENERIC / UTILITY CLASSES
		// ===========================================
		'form.wpa_form',                       // Generic WP Armour Class
		'.wpa_form form',                      // Generic WP Armour Class

		// ===========================================
		// MEMBERSHIP / USER FORMS
		// ===========================================
		'.um-form form',                       // Ultimate Member
		'form.form-contribution',              // WooCommerce Reviews Pro
		'form#learn-press-checkout-form',      // LearnPress Checkout Form

		// ===========================================
		// LOGIN FORMS
		// ===========================================
		'form.spectra-pro-login-form',         // Spectra Login Form
		'form#loginform',                      // Default WP Login Form
		'form.uwp-login-form',                 // UsersWP Login Form
		'.et_pb_login_form form',              // Divi/Elementor login form
		'form.eael-login-form',                // Essential Addons login form
		'form.user-registration-form-login',   // User Registration plugin

		// ===========================================
		// PASSWORD RESET FORMS
		// ===========================================
		'form#lostpasswordform',               // WP Lost Password Form
		'form.lost_reset_password',            // Tutor LMS Password Form
		'form.ur_lost_reset_password',         // User Registration plugin

		// ===========================================
		// REGISTRATION FORMS
		// ===========================================
		'form#registerform',                   // WP Registration Form
		'form.register',                       // Generic register class

		// ===========================================
		// COMMENT FORMS
		// ===========================================
		'form#commentform',                    // WP Comment with ID
		'form.ast-commentform',                // Astra Comment Form
		'form#fl-comment-form',                // Beaver Builder Theme Form
		'form.comment-form',                   // WP Comment with class
		'.review-form form',                   // LearnPress Review
		'form.wpr-comment-form',               // WP Review comment form

		// ===========================================
		// FORUM FORMS
		// ===========================================
		'.bbp-topic-form form',                // BBPress Topic Form
		'.bbp-reply-form form'                 // BBPress Reply Form
	];

	// Append hidden field to all matching forms (avoid duplicates)
	jQuery(allFormSelectors.join(', ')).each(function() {
		var $form = jQuery(this);
		if (!$form.find('.wpa_hidden_field').length) {
			$form.append(wpa_hidden_field);
		}
	});

	// Fluent Forms special handling
	jQuery('form.frm-fluent-form, .ff_conv_app').each(function() {
		var $form = jQuery(this);
		if (!$form.find('.wpa_hidden_field').length) {
			$form.append(wpa_hidden_field);
		}
	});

	if (typeof fluent_forms_global_var_1 !== 'undefined') {
		fluent_forms_global_var_1.extra_inputs[wpa_field_name] = wpa_unique_id;
		fluent_forms_global_var_1.extra_inputs['alt_s'] = '';
	}

	// Handle forms with initiator fields (custom/dynamic forms)
	jQuery('input.wpa_initiator').each(function() {
		var $form = jQuery(this).closest('form');
		if ($form.length && !$form.find('.wpa_hidden_field').length) {
			jQuery(wpa_hidden_field).insertAfter(this);
		}
	});
}

/**
 * Add test block for admins
 */
function wpa_add_test_block(){
	var checkingTest = '<div class="wpa-test-msg"><strong>WP Armour ( Only visible to site administrators. Not visible to other users. )</strong><br />This form has a honeypot trap enabled. If you want to act as spam bot for testing purposes, please click the button below.<br/><span class="wpa-button" onclick="wpa_act_as_spam()" data-actiontype="remove">Act as Spam Bot</span></div>';
	jQuery('.wpa-test-msg').remove();
	jQuery('span.wpa_hidden_field').after(checkingTest);
}

/**
 * Remove honeypot fields (for spam bot testing)
 */
function wpa_remove_honeypot_field(){
	jQuery('.wpa_hidden_field').remove();
	jQuery('#altEmail_container, .altEmail_container').remove();

	if (typeof fluent_forms_global_var_1 !== 'undefined') {
		delete fluent_forms_global_var_1.extra_inputs[wpa_field_name];
		delete fluent_forms_global_var_1.extra_inputs['alt_s'];
	}
}

/**
 * Initialize MutationObserver for dynamically loaded forms
 * Critical for AJAX-heavy sites like WooCommerce/EDD
 */
function wpa_init_observer() {
	// Check for MutationObserver support
	if (typeof MutationObserver === 'undefined') {
		// Fallback: periodically check for new forms
		setInterval(function() {
			wpa_add_honeypot_field();
			if (wpa_add_test == 'yes') {
				wpa_add_test_block();
			}
		}, 2000);
		return;
	}

	// Create observer
	wpa_observer = new MutationObserver(function(mutations) {
		var shouldUpdate = false;

		mutations.forEach(function(mutation) {
			// Check if nodes were added
			if (mutation.addedNodes.length) {
				mutation.addedNodes.forEach(function(node) {
					// Check if added node is or contains a form
					if (node.nodeType === 1) {
						if (node.tagName === 'FORM' || (node.querySelector && node.querySelector('form'))) {
							shouldUpdate = true;
						}
						// Also check for specific WooCommerce/EDD containers
						if (node.classList && (
							node.classList.contains('woocommerce') ||
							node.classList.contains('edd_checkout') ||
							node.classList.contains('wc-block-checkout') ||
							node.id === 'review_form'
						)) {
							shouldUpdate = true;
						}
					}
				});
			}
		});

		// Debounce updates to avoid excessive processing
		if (shouldUpdate) {
			clearTimeout(wpa_debounce_timer);
			wpa_debounce_timer = setTimeout(function() {
				wpa_add_honeypot_field();
				if (wpa_add_test == 'yes') {
					wpa_add_test_block();
				}
			}, 100);
		}
	});

	// Start observing
	wpa_observer.observe(document.body, {
		childList: true,
		subtree: true
	});
}

/**
 * Bind to WooCommerce and EDD specific AJAX events
 */
function wpa_bind_dynamic_events() {
	// WooCommerce events
	jQuery(document.body).on('updated_checkout', function() {
		wpa_add_honeypot_field();
		if (wpa_add_test == 'yes') wpa_add_test_block();
	});

	jQuery(document.body).on('updated_cart_totals', function() {
		wpa_add_honeypot_field();
	});

	jQuery(document.body).on('wc_fragments_refreshed', function() {
		wpa_add_honeypot_field();
	});

	jQuery(document.body).on('init_checkout', function() {
		wpa_add_honeypot_field();
		if (wpa_add_test == 'yes') wpa_add_test_block();
	});

	// WooCommerce Blocks checkout
	if (typeof wp !== 'undefined' && wp.hooks) {
		wp.hooks.addAction('experimental__woocommerce_blocks-checkout-render-checkout-form', 'wpa', function() {
			setTimeout(function() {
				wpa_add_honeypot_field();
			}, 100);
		});
	}

	// EDD events
	jQuery(document.body).on('edd_gateway_loaded', function() {
		wpa_add_honeypot_field();
		if (wpa_add_test == 'yes') wpa_add_test_block();
	});

	jQuery(document.body).on('edd_cart_item_added', function() {
		wpa_add_honeypot_field();
	});

	jQuery(document.body).on('edd_quantity_updated', function() {
		wpa_add_honeypot_field();
	});

	// Generic AJAX complete handler for forms loaded via AJAX
	jQuery(document).ajaxComplete(function(event, xhr, settings) {
		// Check if response might contain forms
		if (xhr.responseText && (
			xhr.responseText.indexOf('<form') !== -1 ||
			xhr.responseText.indexOf('wpa_initiator') !== -1
		)) {
			setTimeout(function() {
				wpa_add_honeypot_field();
				if (wpa_add_test == 'yes') wpa_add_test_block();
			}, 100);
		}
	});
}
