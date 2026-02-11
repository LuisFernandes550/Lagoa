# Backoffice - Lagoa de Óbidos

## Descrição

Backoffice completo em HTML/CSS/Bootstrap 5 para gestão do site da Lagoa de Óbidos. Frontend pronto para integração futura com Laravel.

## Estrutura do Projeto

```
backoffice/
├── index.html                 # Dashboard principal
├── assets/
│   ├── css/
│   │   ├── auth.css          # Estilos de autenticação
│   │   └── dashboard.css     # Estilos do dashboard
│   ├── js/
│   │   ├── auth.js           # Scripts de autenticação
│   │   └── dashboard.js      # Scripts do dashboard
│   └── images/               # Imagens do backoffice
├── pages/
│   ├── auth/
│   │   ├── login.html        # Página de login
│   │   ├── register.html     # Página de registo
│   │   └── forgot-password.html  # Recuperação de password
│   ├── users/
│   │   ├── list.html         # Listagem de utilizadores
│   │   ├── create.html       # Criar utilizador
│   │   └── edit.html         # Editar utilizador
│   └── content/
│       ├── historia.html     # Gestão de História
│       ├── pontos-interesse.html  # Pontos de Interesse
│       ├── experiencias.html # Experiências
│       ├── gastronomia/      # Gastronomia (list, create, edit)
│       │   ├── list.html
│       │   ├── create.html
│       │   └── edit.html
│       ├── alojamento/       # Alojamento (list, create, edit)
│       │   ├── list.html
│       │   ├── create.html
│       │   └── edit.html
│       └── galeria.html      # Galeria de imagens
```

## Funcionalidades Implementadas

### Autenticação
- ✅ Página de Login com validação
- ✅ Página de Registo com validação
- ✅ Página de Recuperação de Palavra-passe
- ✅ Toggle de visualização de password
- ✅ Feedback visual com toasts

### Dashboard
- ✅ Layout responsivo com sidebar e header
- ✅ Estatísticas em cards
- ✅ Tabela de conteúdos recentes
- ✅ Acesso rápido a funcionalidades
- ✅ Navegação intuitiva

### Gestão de Utilizadores
- ✅ Listagem com tabela
- ✅ Criar novo utilizador
- ✅ Editar utilizador existente
- ✅ Formulários com validação
- ✅ Paginação
- ✅ Ações de eliminar

### Gestão de Conteúdos

#### História
- ✅ Formulário de edição completo
- ✅ Campos para título, subtítulo, textos
- ✅ Upload de imagens
- ✅ Estados (Publicado/Rascunho)

#### Pontos de Interesse
- ✅ Listagem em tabela
- ✅ Modal para criar/editar
- ✅ Categorias (Praia, Trilho, Observação, etc.)
- ✅ Upload de imagens

#### Experiências
- ✅ Listagem em tabela
- ✅ Modal para criar/editar
- ✅ Tipos (Cultural, Desportiva, Educativa)
- ✅ Campo de duração

#### Galeria
- ✅ Grid de imagens responsivo
- ✅ Área de upload drag-and-drop
- ✅ Visualização e eliminação de imagens
- ✅ Paginação

#### Gastronomia
- ✅ Listagem em tabela com paginação
- ✅ Página dedicada para criar estabelecimento
- ✅ Página dedicada para editar estabelecimento
- ✅ Tipos (Restaurante, Café, Tasca, Bar, Pastelaria)
- ✅ Campos completos (especialidade, localização, contactos, horário, preço, características)

#### Alojamento
- ✅ Listagem em tabela com paginação
- ✅ Página dedicada para criar alojamento
- ✅ Página dedicada para editar alojamento
- ✅ Tipos (Hotel, Apartamento, Casa de Férias, Turismo Rural, Hostel, Camping)
- ✅ Campos completos (capacidade, contactos, características)

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **Bootstrap 5.3.2** - Framework CSS responsivo
- **Bootstrap Icons** - Iconografia
- **JavaScript Vanilla** - Interatividade

## Design e UX

### Cores
- **Primária**: Gradiente roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#10b981)
- **Perigo**: Vermelho (#ef4444)
- **Aviso**: Laranja (#f59e0b)
- **Info**: Azul (#3b82f6)

### Componentes
- Cards com sombras suaves
- Botões com efeitos hover
- Formulários com validação visual
- Tabelas responsivas
- Modais para ações rápidas
- Badges coloridos por estado
- Sidebar colapsável
- Header fixo com search

### Responsividade
- Mobile First
- Breakpoints Bootstrap
- Sidebar escondível em mobile
- Tabelas com scroll horizontal
- Grid adaptável

## Como Usar

### 1. Estrutura de Navegação

```
Login → Dashboard → Secções de Gestão
```

### 2. Páginas de Entrada

**Login:** `backoffice/pages/auth/login.html`
- Email e password com validação
- Checkbox "Lembrar-me"
- Link para recuperação e registo

**Dashboard:** `backoffice/index.html`
- Visão geral com estatísticas
- Acesso rápido a todas as secções

### 3. Gestão

Todas as páginas de gestão seguem o mesmo padrão:
1. Header com breadcrumbs
2. Ações principais (criar, filtrar)
3. Listagem ou formulário
4. Footer com copyright

## Integração com Laravel

### Próximos Passos para Backend

1. **Autenticação**
   - Implementar Laravel Sanctum ou Breeze
   - Conectar formulários aos controllers
   - Validação server-side

2. **Rotas**
   ```php
   Route::middleware('auth')->group(function () {
       Route::resource('users', UserController::class);
       Route::resource('pontos-interesse', PontoInteresseController::class);
       Route::resource('experiencias', ExperienciaController::class);
       // etc.
   });
   ```

3. **Modelos**
   - User
   - Historia
   - PontoInteresse
   - Experiencia
   - Gastronomia
   - Alojamento
   - GaleriaImagem

4. **API REST**
   - Endpoints JSON para operações CRUD
   - Middleware de autenticação
   - Validação de requests

5. **Upload de Ficheiros**
   - Storage público para imagens
   - Validação de tipos e tamanhos
   - Otimização de imagens

## Validação de Formulários

### Frontend (Atual)
- Bootstrap validation classes
- JavaScript custom validation
- Feedback visual imediato

### Backend (A Implementar)
```php
$request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|email|unique:users',
    'password' => 'required|min:6|confirmed',
]);
```

## Segurança

### Implementado
- Input validation visual
- Password toggle seguro
- HTTPS recomendado (via CDN)

### A Implementar (Laravel)
- CSRF Protection
- XSS Prevention
- SQL Injection Prevention
- Password Hashing (bcrypt)
- Authorization (Gates/Policies)

## Notas Importantes

1. **Sem Backend**: Todas as ações são simuladas com JavaScript. Dados não são persistidos.

2. **Modais**: Usam Bootstrap 5 modals. Prontos para Ajax/Fetch API.

3. **Tabelas**: Dados estáticos. Substituir por chamadas API.

4. **Imagens**: URLs apontam para Unsplash. Substituir por storage local.

5. **Validação**: Frontend apenas. Implementar validação server-side no Laravel.

## Personalização

### Cores
Editar variáveis CSS em `assets/css/dashboard.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... */
}
```

### Sidebar
Adicionar/remover itens em cada ficheiro HTML na secção `<nav>`.

### Dashboard
Modificar cards e estatísticas em `index.html`.

## Browser Support

- Chrome (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Edge (últimas 2 versões)

## Tarefas Pendentes

- [ ] Adicionar mais validações customizadas
- [ ] Implementar dark mode (opcional)
- [ ] Melhorar acessibilidade (ARIA labels)
- [ ] Testes cross-browser
- [ ] Otimizar assets (minify CSS/JS)

## Suporte

Para integração com Laravel, consultar:
- [Laravel Documentation](https://laravel.com/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Bootstrap Icons](https://icons.getbootstrap.com)

---

**Desenvolvido para:** Lagoa de Óbidos - Turismo e Património  
**Ano:** 2026  
**Tecnologia:** HTML5, CSS3, Bootstrap 5, JavaScript
