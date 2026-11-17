// Prompts compartilhados: usados pela função serverless (Vercel) e pela versão de demonstração.
(function (g) {
  const SCHEMAS = {
    resumo: `Responda SOMENTE com JSON neste formato:
{"titulo":"string","topicos":[{"titulo":"string","pontos":["string"]}],
"formulas":[{"nome":"string","expressao":"string","variaveis":[{"simbolo":"string","significado":"string","unidade":"string"}]}],
"definicoes":[{"termo":"string","definicao":"string"}]}
Se o material não tiver fórmulas ou definições, use listas vazias.`,
    quiz: `Responda SOMENTE com JSON neste formato:
{"perguntas":[{"tipo":"multipla"|"vf"|"curta","enunciado":"string",
"opcoes":["string"] (4 opções, só para multipla),
"resposta": número do índice correto (multipla) | true/false (vf) | "string" (curta),
"explicacao":"passo a passo curto de por que a resposta está certa"}]}`,
    cards: `Responda SOMENTE com JSON neste formato:
{"cartoes":[{"frente":"pergunta curta ou termo","verso":"resposta direta e concisa"}]}`
  };
  const NIVEIS = {
    facil: "FÁCIL: memorização de definições e conceitos diretos.",
    medio: "MÉDIO: aplicação de conceitos e interpretação.",
    avancado: "AVANÇADO: raciocínio em várias etapas, cálculos e casos novos."
  };
  const TAM = {
    curto: "Resumo CURTO: no máximo 4 tópicos com até 3 pontos cada.",
    medio: "Resumo de profundidade MODERADA: até 6 tópicos com até 5 pontos cada.",
    extenso: "Resumo EXTENSO e detalhado: tópicos completos com exemplos e detalhes."
  };
  function core({ text, mode, nivel = "medio", qtd = 10, tamanho = "curto" }) {
    if (mode === "cards") return `Crie ${qtd} cartões de estudo (flashcards) sobre os conceitos, definições e fórmulas mais importantes do material abaixo, no idioma do material. Frente curta, verso direto.\n${SCHEMAS.cards}\n\nMATERIAL:\n${text}`;
    if (mode === "mesclar") return `Os resumos parciais abaixo (JSON) vêm de partes do mesmo material. Una-os em UM único resumo executivo, sem repetições, mantendo as fórmulas e definições importantes. ${TAM[tamanho]}\n${SCHEMAS.resumo}\n\nRESUMOS PARCIAIS:\n${text}`;
    if (mode === "resumo") return `Você é um assistente de estudo universitário. Condense o material abaixo num resumo executivo sem redundâncias, no idioma do material. ${TAM[tamanho]} Extraia as fórmulas (com variáveis e unidades) e definições técnicas importantes.\n${SCHEMAS.resumo}\n\nMATERIAL:\n${text}`;
    return `Você é um professor universitário. Crie ${qtd} questões sobre o material abaixo, no idioma do material, nível ${NIVEIS[nivel]} Misture os tipos "multipla", "vf" e "curta", com maioria de múltipla escolha. Use apenas o conteúdo do material.\n${SCHEMAS.quiz}\n\nMATERIAL:\n${text}`;
  }
  const IDIOMAS = { pt: "português", en: "inglês", es: "espanhol" };
  function buildPrompt(o) {
    const p = core(o);
    return IDIOMAS[o.idioma] ? `Idioma da saída: escreva todo o conteúdo em ${IDIOMAS[o.idioma]}, mesmo que o material esteja em outro idioma. Mantenha as chaves do JSON exatamente como no formato.\n` + p : p;
  }
  const api = { buildPrompt, NIVEIS, TAM, MAX_CHARS: 60000 };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else g.MabuPrompts = api;
})(typeof window !== "undefined" ? window : globalThis);
