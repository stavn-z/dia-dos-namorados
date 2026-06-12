# Para você ♥

Projeto de Dia dos Namorados — página animada com slideshow de fotos, poema e música.

## Estrutura

```
valentine/
├── index.html      ← página principal
├── style.css       ← estilos
├── script.js       ← lógica e animações
└── img/
    ├── photo1.jpg
    ├── photo2.jpg
    └── ... (photo9.jpg)
```

## Como publicar no GitHub Pages

1. Crie um repositório público no GitHub (ex: `para-voce`)
2. Faça upload de todos os arquivos mantendo a estrutura de pastas
3. Vá em **Settings → Pages**
4. Em "Branch", selecione `main` e pasta `/ (root)`
5. Clique em **Save**
6. Aguarde ~1 minuto e acesse: `https://seu-usuario.github.io/para-voce`

## Música

A página usa o embed do Spotify para tocar **Pétala — Djavan** automaticamente
após o primeiro clique do usuário (necessário por política dos navegadores).
No final do slideshow, há um botão direto para ouvir no Spotify.

## Personalização

- Para trocar a música: altere `SPOTIFY_TRACK_ID` em `script.js`
- Para trocar as fotos: substitua os arquivos em `img/` com os nomes `photo1.jpg` até `photo9.jpg`
- Para alterar o tempo entre as fotos: mude `SLIDE_INTERVAL` em `script.js` (em milissegundos)
