$menuCorreto = @'
                    <li class="sidebar-menu-item">
                        <a href="../pontos-interesse/list.html" class="sidebar-menu-link">
                            <i class="bi bi-geo-alt sidebar-menu-icon"></i>
                            <span class="sidebar-menu-text">Pontos de Interesse</span>
                        </a>
                    </li>
                    
                    <li class="sidebar-menu-item">
                        <a href="../experiencias/list.html" class="sidebar-menu-link">
                            <i class="bi bi-star sidebar-menu-icon"></i>
                            <span class="sidebar-menu-text">Experiências</span>
                        </a>
                    </li>
                    
                    <li class="sidebar-menu-item">
                        <a href="../gastronomia/list.html" class="sidebar-menu-link">
                            <i class="bi bi-cup-hot sidebar-menu-icon"></i>
                            <span class="sidebar-menu-text">Gastronomia</span>
                        </a>
                    </li>
                    
                    <li class="sidebar-menu-item">
                        <a href="../alojamento/list.html" class="sidebar-menu-link">
                            <i class="bi bi-house-door sidebar-menu-icon"></i>
                            <span class="sidebar-menu-text">Alojamento</span>
                        </a>
                    </li>
'@

Get-ChildItem -Path "backoffice\pages\content" -Recurse -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    $pattern = '<li class="sidebar-menu-item">[\s\S]*?<a href="[^"]*pontos-interesse[^"]*"[\s\S]*?</li>[\s\S]*?<li class="sidebar-menu-item">[\s\S]*?<a href="[^"]*alojamento[^"]*"[\s\S]*?</li>'
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $menuCorreto
        Set-Content $_.FullName $content
        Write-Host "Atualizado: $($_.Name)"
    }
}

Write-Host "Menus atualizados nas paginas de content"
