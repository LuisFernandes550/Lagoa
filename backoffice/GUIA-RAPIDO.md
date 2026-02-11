# 🚀 Guia Rápido - Backoffice Lagoa de Óbidos

## Como Iniciar

### 1. Abrir o Projeto
```
📂 Abrir pasta: backoffice/
🌐 Iniciar com: backoffice/pages/auth/login.html
```

### 2. Navegar pelo Sistema
- **Login** → Inserir qualquer email/password → Dashboard
- **Sidebar** → Todas as secções disponíveis
- **Dashboard** → Estatísticas e acesso rápido

---

## 📍 Páginas Principais

### Autenticação
- `pages/auth/login.html` - Login
- `pages/auth/register.html` - Registo
- `pages/auth/forgot-password.html` - Recuperar password

### Utilizadores
- `pages/users/list.html` - Listagem
- `pages/users/create.html` - Criar (formulário dedicado)
- `pages/users/edit.html` - Editar (formulário dedicado)

### Gastronomia ⭐ NOVO
- `pages/content/gastronomia/list.html` - Listagem
- `pages/content/gastronomia/create.html` - Criar (formulário dedicado)
- `pages/content/gastronomia/edit.html` - Editar (formulário dedicado)

### Alojamento ⭐ NOVO
- `pages/content/alojamento/list.html` - Listagem
- `pages/content/alojamento/create.html` - Criar (formulário dedicado)
- `pages/content/alojamento/edit.html` - Editar (formulário dedicado)

### Outros Conteúdos
- `pages/content/historia.html` - História
- `pages/content/pontos-interesse.html` - Pontos de Interesse
- `pages/content/experiencias.html` - Experiências
- `pages/content/galeria.html` - Galeria

---

## ✅ O Que Funciona

### Formulários com Validação
- ✅ Todos os campos obrigatórios validados
- ✅ Feedback visual (verde/vermelho)
- ✅ Mensagens de erro específicas
- ✅ Toasts de sucesso após submissão

### Navegação
- ✅ Sidebar responsiva (colapsa em mobile)
- ✅ Breadcrumbs em todas as páginas
- ✅ Links funcionais entre páginas
- ✅ Botões voltar/cancelar

### Dados de Exemplo
- ✅ 5 utilizadores
- ✅ 5 estabelecimentos gastronomia
- ✅ 5 alojamentos
- ✅ Dados realistas

---

## 🎯 Estrutura de Formulários

### Gastronomia - Campos
```
✅ Nome do Estabelecimento
✅ Tipo (Restaurante/Café/Tasca/Bar/Pastelaria/Outro)
✅ Especialidade
✅ Localização
✅ Descrição
✅ Telefone
✅ Email
✅ Website
✅ Horário
✅ Preço Médio
✅ Morada Completa
✅ Coordenadas GPS
✅ Capacidade
✅ Características (Estacionamento/Wi-Fi/Terraço/Acessibilidade)
✅ Imagem Principal
✅ Estado (Publicado/Rascunho)
✅ Destaque (Sim/Não)
```

### Alojamento - Campos
```
✅ Nome do Alojamento
✅ Tipo (Hotel/Apartamento/Casa Férias/Turismo Rural/Hostel/Camping/Outro)
✅ Capacidade (quartos ou pessoas)
✅ Localização
✅ Descrição
✅ Telefone
✅ Email
✅ Website
✅ Horário
✅ Preço
✅ Morada Completa
✅ Coordenadas GPS
✅ Capacidade (número)
✅ Características (Estacionamento/Wi-Fi/Terraço/Acessibilidade)
✅ Imagem Principal
✅ Estado (Publicado/Rascunho)
✅ Destaque (Sim/Não)
```

---

## 🔧 Tecnologias

- **Bootstrap 5.3.2** - CDN
- **Bootstrap Icons** - CDN
- **JavaScript Vanilla** - Validação e interatividade
- **CSS3 Custom** - Estilos personalizados

---

## 📱 Responsividade

### Desktop (> 992px)
- Sidebar visível
- Tabelas completas
- 4 colunas de cards

### Tablet (768px - 992px)
- Sidebar colapsável
- Tabelas com scroll
- 2 colunas de cards

### Mobile (< 768px)
- Sidebar oculta (toggle)
- Tabelas scroll horizontal
- 1 coluna de cards

---

## 🎨 Cores do Tema

```css
Primária: #667eea → #764ba2 (gradiente roxo)
Sucesso: #10b981 (verde)
Perigo: #ef4444 (vermelho)
Aviso: #f59e0b (laranja)
Info: #3b82f6 (azul)
```

---

## 📝 Para Integração Laravel

### 1. Criar Modelos
```bash
php artisan make:model Gastronomia -mcr
php artisan make:model Alojamento -mcr
```

### 2. Definir Rotas
```php
Route::resource('gastronomia', GastronomiaController::class);
Route::resource('alojamento', AlojamentoController::class);
```

### 3. Conectar Forms
```php
// GastronomiaController@store
public function store(Request $request) {
    $validated = $request->validate([
        'nome' => 'required|string|max:255',
        'tipo' => 'required|string',
        'especialidade' => 'required|string',
        // ... outros campos
    ]);
    
    Gastronomia::create($validated);
    return redirect()->route('gastronomia.index');
}
```

### 4. Blade Templates
- Substituir `.html` por `.blade.php`
- Adicionar `@csrf` nos formulários
- Usar `{{ route('gastronomia.index') }}` nos links
- Implementar `@foreach` nas tabelas

---

## 🐛 Troubleshooting

### Sidebar não aparece em mobile?
- Clicar no ícone hamburger (☰) no canto superior esquerdo

### Formulário não valida?
- Verificar se todos os campos obrigatórios (*) estão preenchidos
- Validação é apenas visual (frontend)

### Links não funcionam?
- Verificar caminhos relativos (`../`, `../../`)
- Estrutura de pastas deve estar correta

---

## 📚 Documentação Completa

- `README.md` - Documentação técnica detalhada
- `PROJETO-FINALIZADO.md` - Resumo do projeto completo

---

## ✨ Funcionalidades Extra

1. **Toggle Password** - Ver/ocultar password
2. **Toasts** - Mensagens de feedback animadas
3. **Paginação** - Navegação entre páginas
4. **Breadcrumbs** - Trilha de navegação
5. **Search Bar** - Barra de pesquisa (visual)
6. **Notificações** - Badge com contador (visual)
7. **User Dropdown** - Avatar e info do utilizador
8. **Características** - Checkboxes para Wi-Fi, etc.
9. **GPS Coordinates** - Campo para coordenadas
10. **Destaque** - Marcar itens como destaque

---

## 🎓 Boas Práticas Implementadas

✅ Código HTML semântico  
✅ CSS organizado com variáveis  
✅ JavaScript modular  
✅ Validação client-side  
✅ Responsividade mobile-first  
✅ Acessibilidade (labels, alt text)  
✅ Comentários no código  
✅ Estrutura de pastas clara  
✅ Nomenclatura consistente  
✅ Reutilização de componentes  

---

**Pronto para começar! 🚀**
