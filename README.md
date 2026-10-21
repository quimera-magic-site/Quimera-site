# Quimera Magic — versão editorial premium

Site estático responsivo da Quimera Magic, em português, sem dependências de build. Preparado para hospedar na Vercel.

## Como executar

```sh
python -m http.server 8000
```

Abra http://localhost:8000/. Arquivos: `index.html`, `style.css`, `app.js`, `data/catalog.js`, `assets/`, `favicon.svg`, `robots.txt`.

## Recursos funcionais

- Hero com CTA direto para o WhatsApp comercial (+55 15 99663-6845).
- 90 opções do catálogo fornecido, busca sem acentos, filtros e carregamento progressivo.
- Seleção de vários personagens e uma única consulta com a lista completa pelo WhatsApp. A seleção só existe na memória da página; não é armazenada.
- Visualização dos detalhes de cada personagem, com avisos claros sobre disponibilidade e referência visual.
- Experiências por categoria e mini planejador de aniversário, evento escolar ou evento especial.
- Galeria com fotografias recebidas no briefing.
- Formulário de orçamento e mensagem formatada para o WhatsApp (os dados não são enviados para servidor próprio).
- Microanimações, menu mobile, modais acessíveis, teclado e suporte a movimento reduzido.

## Dados e publicação

O arquivo `data/catalog.js` contém os nomes das opções transcritas das cinco imagens de catálogo; **isto não confirma disponibilidade, figurino ou valor**. Não mostrar preços não confirmados.

As fotografias `assets/*.webp` foram fornecidas no projeto. Necessário validar os direitos de uso e autorização dos responsáveis por crianças fotografadas antes da utilização comercial definitiva. A imagem da hero é uma **montagem ilustrativa gerada** e está identificada no site, não sendo registro de evento.

SEO foi habilitado em 2026-10-09 com sitemap.xml, canônicas, novas páginas de serviço e robots.txt permitindo rastreamento. Ver SEO-CONFIGURACAO.md para verificação de propriedade e pendências.

O Instagram reserva é usado para contato social porque havia indícios de conflito de propriedade da conta principal; confirmar com a empresa os dados oficiais antes de publicar definitivamente.

## Validação

`test_premium.py` executa testes em Chrome headless com os scripts e mídias embutidos para pré-visualização offline (o ambiente usado no desenvolvimento bloqueava navegação local do navegador). Testa desktop 1440, tablet 768 e celular 390, além das funcionalidades críticas e do link formatado para WhatsApp. Execute com:

```sh
python test_premium.py
```

O script é ferramenta auxiliar local; não é necessário no deploy.


## Revisão mobile 2026-10-09
- Camada `mobile.css`: tipografia legível, hero mais objetiva, catálogo adaptativo, navegação fixa de duas ações com suporte a safe-area, entradas 16px para iOS e controles touch >=44px.
- O botão na foto dos cards abre os detalhes. O menu fecha por toque externo, Escape e redimensionamento.
- Ao selecionar personagens, a barra fixa dá lugar à bandeja de orçamento (sem sobreposição).
- A identidade desktop e as fotografias foram preservadas.
- Execute `python3 test_mobile.py` para auditar larguras 320–1440px, teclado, toques, modal e WhatsApp.
