import Anthropic from '@anthropic-ai/sdk';

// INSTRUCOES:
// 1. Pegue sua API key em: https://console.anthropic.com/
// 2. Rode: export ANTHROPIC_API_KEY="sk-ant-sua-chave"
// 3. Rode: node marketing/scripts/gerar-copy.mjs

const client = new Anthropic();

const CONTEXTO_MARCA = `
MARCA: HiCare — Plataforma de IA para automacao de clinicas medicas
SITE: ai-hicare.com.br
TOM DE VOZ: Profissional mas acessivel, direto, sem jargao tecnico. Confiante sem ser arrogante.
PUBLICO: Donos de clinicas odontologicas, esteticas e medicas (28-55 anos)
CORES: Preto (#0A0B10), Verde-limao neon (#CCFF00), Branco (#F2F4F7)
DIFERENCIAL: Feita por medicos, IA treinada no protocolo de cada clinica, dashboard transparente
CTA PADRAO: "Agende um Diagnostico Gratuito"
CONCORRENTES (nao citar): Dr. IAgenda, SecretarIA, GenIA, Cloudia

DADOS DO MERCADO:
- 40% dos pacientes desistem se nao recebem resposta em 5 min
- Taxa media de no-show no Brasil: 25-30%
- 92% dos brasileiros preferem WhatsApp
- Clinicas que usam IA reduzem no-show em 50-70%
`;

const PROMPTS = {
  'carrossel': (tema) => `${CONTEXTO_MARCA}

Crie um CARROSSEL para Instagram sobre: ${tema}

Formato:
- Slide 1: Titulo impactante (max 8 palavras) + subtitulo curto
- Slides 2-6: Um ponto por slide (max 20 palavras cada)
- Slide 7: CTA "Agende um Diagnostico Gratuito — ai-hicare.com.br"

Depois: LEGENDA (max 150 palavras) + 15 HASHTAGS + HORARIO sugerido`,

  'reel': (tema) => `${CONTEXTO_MARCA}

Crie um ROTEIRO DE REEL sobre: ${tema}

Formato (30-60s): HOOK (0-3s) + PROBLEMA (3-15s) + SOLUCAO (15-40s) + CTA (40-50s)
Para cada trecho: texto na tela, visual, duracao.
Depois: LEGENDA + 15 HASHTAGS + MUSICA sugerida`,

  'email': (tema) => `${CONTEXTO_MARCA}

Crie um EMAIL MARKETING sobre: ${tema}

Formato: ASSUNTO (3 opcoes) + PREVIEW TEXT + CORPO (max 200 palavras) + CTA + PS`,

  'google-ads': (tema) => `${CONTEXTO_MARCA}

Crie 5 ANUNCIOS GOOGLE ADS sobre: ${tema}

Cada: Titulo 1 (30 chars) + Titulo 2 (30 chars) + Titulo 3 (30 chars) + Descricao 1 (90 chars) + Descricao 2 (90 chars)`,

  'story': (tema) => `${CONTEXTO_MARCA}

Crie 5 STORIES sequenciais sobre: ${tema}

Cada: Texto principal (max 15 palavras) + Elemento interativo + Sticker sugerido
Ultimo story: CTA "Link na bio"`
};

async function gerarCopy(tipo, tema) {
  const prompt = PROMPTS[tipo];
  if (!prompt) {
    console.error(`Tipo invalido. Use: ${Object.keys(PROMPTS).join(', ')}`);
    return;
  }

  console.log(`\nGerando ${tipo} sobre "${tema}"...\n`);

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt(tema) }]
  });

  const texto = response.content[0].text;
  console.log(texto);
  console.log('\n' + '='.repeat(60) + '\n');
  return texto;
}

// ============================================
// GERAR CONTEUDO DA SEMANA
// ============================================

await gerarCopy('carrossel', '5 sinais de que sua clinica precisa de IA no atendimento');
await gerarCopy('reel', 'demonstracao de agendamento automatico pelo WhatsApp as 23h');
await gerarCopy('story', 'quanto tempo sua clinica demora pra responder um lead no WhatsApp');
await gerarCopy('carrossel', 'chatbot tradicional vs agente de IA - as 5 diferencas que importam');
await gerarCopy('reel', 'como uma clinica reduziu no-show em 50% com atendimento automatico');
await gerarCopy('email', 'convite para diagnostico gratuito - como sua clinica esta perdendo pacientes');
await gerarCopy('google-ads', 'automacao whatsapp clinica odontologica agendamento IA');
