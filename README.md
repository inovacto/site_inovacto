# Inovacto Tecnologia: landing page

HTML estático + Tailwind CSS v4 (CLI).

## Rodar
    npm install
    npm run dev     # watch
    npm run build   # CSS minificado em assets/css/app.css

## Deploy
Publique só: index.html, assets/ (node_modules, src e package*.json não vão pro servidor).

## Identidade visual (derivada da pasta Arte Inovacto)
- Símbolo vetorizado: assets/img/simbolo.svg; as 5 peças também estão inline no topo do index.html (`#p-*`)
- Cada barra do símbolo representa um serviço (apps, IA, dados, cloud) e é usada como ícone
- Fonte do logotipo: assets/fonts/conthrax-semibold.woff2 (Conthrax SemiBold, Typodermic, subset latin)
- Favicon: assets/img/favicon.svg + apple-touch-icon.png
- Imagem de compartilhamento: assets/img/og-image.jpg (1200x630)
- Cores: bloco @theme em src/input.css (verde #00be9c, grafite #1a1a1a, névoa #f0f0f0)

## Formulário
Configure `data-endpoint` no <form id="contact-form"> (Formspree, API própria etc.).
Vazio = o envio abre o programa de e-mail do visitante com a mensagem pronta para gustavo@inovacto.com.br.
O POST envia JSON: { nome, telefone, email, servico, mensagem }.
