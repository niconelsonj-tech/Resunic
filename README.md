# MabuData

Plataforma web que transforma PDFs de aula em resumos ultra-concentrados e quizzes de 3 níveis. Fase 1 (MVP).

## O que já funciona
- Upload de PDF; o texto é extraído **no navegador** (pdf.js), então só texto vai para a internet (economiza dados móveis).
- Resumo por tópicos + tabela de fórmulas (variáveis e unidades) + definições.
- Quiz Fácil / Médio / Avançado: múltipla escolha, V ou F e resposta curta, com explicação.
- Painel de desempenho por disciplina e revisão espaçada (1, 3 e 7 dias), salvos no aparelho (localStorage).
- Exportar resumo em Markdown ou imprimir/salvar em PDF.

## Estrutura
```
index.html        interface (HTML + CSS + JS, sem build)
prompts.js        prompts de IA compartilhados
api/generate.js   função serverless que chama o Gemini
vercel.json       tempo máximo da função
```

## Publicar (GitHub + Vercel)
1. Crie um repositório no GitHub e envie estes arquivos.
2. Em vercel.com, **Add New > Project** e importe o repositório (sem build command).
3. Em **Settings > Environment Variables**, adicione `GEMINI_API_KEY` (chave grátis em aistudio.google.com).
   Opcional: `GEMINI_MODEL` (padrão `gemini-2.5-flash`).
4. Faça **Redeploy**. Pronto.

## Testar localmente
`npm i -g vercel`, depois `vercel dev` na pasta (precisa da variável GEMINI_API_KEY).

## Fase 2 (feita)
- OCR para PDFs escaneados (Tesseract.js, português e inglês, até 40 páginas).
- Arquivos grandes: o texto é dividido em partes de 50 mil caracteres; os resumos parciais são unidos em um só.
- Cache local de resumos e cartões (o mesmo material não gasta IA nem dados de novo).
- App instalável e offline: abre pelo ícone na tela inicial e mostra resumos salvos sem internet.

## Fase 3 (feita)
- Cartões de revisão (frente e verso) com repetição espaçada de 1, 3, 7 e 14 dias.
- Exportação formatada: .html, .md e impressão em PDF.
- Evolução dos testes e backup/importação dos dados em arquivo .json.

## Limites conhecidos
- Slides: exporte como PDF antes de enviar.
- Os dados ficam no aparelho. Contas e sincronização na nuvem exigem um banco de dados (por exemplo Supabase ou Vercel KV) e login: é o próximo passo se quiser. Por ora, use Exportar e Importar no painel.
- Depende do Gemini: a cota grátis tem limite de uso por minuto e por dia.

## Interface e créditos
- Telas: Início (upload PDF/PPTX e recentes), Análise (tamanho do resumo e dificuldade do quiz), Resultado, Quiz, Biblioteca, Estudo, Perfil e Créditos.
- Custos: resumo Curto e quiz Fácil são grátis; Médio custa 1 crédito; Extenso e Difícil, 2. Só cobra se a geração der certo.
- Os créditos ficam no aparelho e servem para testar o fluxo. Para cobrar de verdade (Pacote Universitário, US$ 6), é preciso contas de usuário, saldo no servidor e pagamento (Stripe ou Google Play Billing). O botão Comprar agora ainda não cobra e o anúncio é de demonstração.

## Idiomas e regiões
- Português de Moçambique (`/`), português do Brasil (`/pt-br`), inglês dos EUA (`/en`) e espanhol (`/es`), cada um com título, descrição, canonical e hreflang próprios.
- Os textos ficam em `i18n.js` (a chave é a frase em português). Para adicionar um idioma, acrescente uma coluna em `ROWS` e `PAT`, uma entrada em `LANGS`, `PATHS`, `LOC`, `REG` e `SEO`.
- Depois de editar `index.html` ou `i18n.js`, rode `node scripts/idiomas.js` e só então `node scripts/configurar.js`.
- Preço e pagamentos previstos mudam por região (M-Pesa e e-Mola em Moçambique, Pix no Brasil, Apple Pay e Google Pay nos EUA). O pagamento ainda não está conectado.
- A página de privacidade ainda existe só em português.
