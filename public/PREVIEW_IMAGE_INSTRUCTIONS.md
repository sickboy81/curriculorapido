# Instruções para Criar a Imagem de Preview (Open Graph)

A imagem de preview é usada quando o site é compartilhado em redes sociais (Facebook, Twitter, LinkedIn, WhatsApp).

## Especificações Técnicas

- **Tamanho:** 1200x630 pixels (proporção 1.91:1)
- **Formato:** JPG ou PNG
- **Tamanho do arquivo:** Máximo 1MB (recomendado: 200-500KB)
- **Nome do arquivo:** `preview-image.jpg` ou `preview-image.png`
- **Localização:** `/public/preview-image.jpg` (raiz do projeto)

## Conteúdo Recomendado

A imagem deve conter:
- Logo ou nome "Currículo Rápido"
- Texto principal: "Criar Currículo Online Grátis"
- Subtítulo: "Modelos Profissionais em PDF"
- Cores da marca (roxo #7c3aed)
- Design limpo e profissional

## Ferramentas para Criar

1. **Canva** (gratuito): https://www.canva.com
   - Use o template "Facebook Post" (1200x630px)
   - Adicione texto e logo
   - Exporte como JPG

2. **Figma** (gratuito): https://www.figma.com
   - Crie um frame de 1200x630px
   - Adicione elementos visuais
   - Exporte como PNG ou JPG

3. **Photoshop/GIMP**
   - Crie um documento de 1200x630px
   - Adicione elementos
   - Exporte otimizado para web

## Após Criar

1. Salve o arquivo como `preview-image.jpg` na pasta `/public/`
2. O arquivo será automaticamente referenciado no `index.html`
3. Teste usando:
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Nota

Atualmente, o site referencia `preview-image.jpg` mas o arquivo não existe. 
Crie a imagem seguindo as instruções acima para melhorar o compartilhamento social.

