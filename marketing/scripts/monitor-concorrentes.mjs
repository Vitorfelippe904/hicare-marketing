import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs';

// INSTRUCOES:
// Rode: node marketing/scripts/monitor-concorrentes.mjs
// Recomendado: rodar toda sexta-feira

const concorrentes = [
  { nome: 'Dr. IAgenda', url: 'https://sobre.driagenda.com/', instagram: '@driagenda' },
  { nome: 'SecretarIA', url: 'https://usesecretariaia.com/', instagram: '@usesecretariaia' },
  { nome: 'GenIA', url: 'https://suagenia.com.br/', instagram: '@suagenia' },
  { nome: 'Cloudia', url: 'https://www.cloudia.com.br/', instagram: '@cloudia.com.br' },
  { nome: 'AgendAI', url: 'https://meagendai.com.br/', instagram: '@meagendai' },
  { nome: 'MedZap', url: 'https://medzapia.com/', instagram: '@medzapia' }
];

async function monitorar() {
  console.log('Iniciando monitoramento de concorrentes...\n');
  console.log('Data:', new Date().toLocaleDateString('pt-BR'));
  console.log('='.repeat(60));

  const browser = await puppeteer.launch({ headless: true });
  const resultados = [];

  for (const c of concorrentes) {
    try {
      console.log(`\nAnalisando ${c.nome}...`);
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
      await page.goto(c.url, { waitUntil: 'networkidle2', timeout: 30000 });
      const html = await page.content();
      const $ = cheerio.load(html);

      const titulo = $('title').text().trim();
      const descricao = $('meta[name="description"]').attr('content') || '';
      const h1s = []; $('h1').each((i, el) => h1s.push($(el).text().trim()));
      const h2s = []; $('h2').each((i, el) => h2s.push($(el).text().trim()));
      const textoCompleto = $('body').text();
      const precos = [...new Set(textoCompleto.match(/R\$[\s]?[\d.,]+/g) || [])];

      const keywords = [];
      ['IA', 'inteligencia artificial', 'WhatsApp', 'agendamento', '24/7', 'LGPD', 'audio', 'prontuario']
        .forEach(t => { if (textoCompleto.toLowerCase().includes(t.toLowerCase())) keywords.push(t); });

      resultados.push({
        nome: c.nome, url: c.url, instagram: c.instagram,
        titulo, descricao: descricao.substring(0, 200),
        headlines: h1s.slice(0, 3), subtitulos: h2s.slice(0, 8),
        precos, keywords, dataAnalise: new Date().toISOString()
      });

      console.log(`  Titulo: ${titulo}`);
      console.log(`  Precos: ${precos.length > 0 ? precos.join(', ') : 'Nao divulgado'}`);
      console.log(`  Keywords: ${keywords.join(', ')}`);
      await page.close();
    } catch (err) {
      console.log(`  ERRO: ${err.message}`);
      resultados.push({ nome: c.nome, erro: err.message });
    }
  }

  await browser.close();

  const outputDir = 'marketing/concorrentes';
  const date = new Date().toISOString().split('T')[0];
  fs.writeFileSync(`${outputDir}/relatorio-${date}.json`, JSON.stringify(resultados, null, 2));

  let resumo = `# Relatorio de Concorrentes — ${new Date().toLocaleDateString('pt-BR')}\n\n`;
  resultados.forEach(r => {
    resumo += `## ${r.nome}\n- URL: ${r.url}\n- Instagram: ${r.instagram || 'N/A'}\n`;
    if (r.erro) { resumo += `- ERRO: ${r.erro}\n`; }
    else {
      resumo += `- Titulo: ${r.titulo}\n- Precos: ${r.precos?.length > 0 ? r.precos.join(', ') : 'Nao divulgado'}\n`;
      resumo += `- Headlines: ${r.headlines?.join(' | ')}\n- Keywords: ${r.keywords?.join(', ')}\n`;
    }
    resumo += '\n';
  });
  fs.writeFileSync(`${outputDir}/relatorio-${date}.md`, resumo);

  console.log('\n' + '='.repeat(60));
  console.log(`Relatorios salvos em ${outputDir}/`);
}

monitorar();
