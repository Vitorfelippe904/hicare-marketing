import nodemailer from 'nodemailer';
import http from 'http';

// =====================================================================
// SEQUENCIA DE EMAILS AUTOMATIZADA — AI HiCare
// =====================================================================
//
// QUANDO DISPARA?
// Somente quando o lead entrega o contato (email) por meio de:
//   - Formulario do site (ai-hicare.com.br)
//   - Link na bio do Instagram
//   - DM nas redes sociais (manual: adicionar via API)
//   - Landing page de campanha
//
// O lead NUNCA recebe email sem ter fornecido o contato voluntariamente.
//
// COMO FUNCIONA:
// 1. O site/landing page faz um POST para /novo-lead com { nome, email, origem }
// 2. O sistema agenda os 5 emails automaticamente
// 3. Os emails sao enviados nos dias 0, 3, 7, 14 e 21
//
// COMO RODAR:
// 1. Configurar credenciais SMTP abaixo
// 2. Rodar: node marketing/automacao/email-sequence.mjs
// 3. O servidor fica escutando na porta 3001
// 4. Conectar o formulario do site para enviar POST /novo-lead
// =====================================================================

// Configurar SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contato@ai-hicare.com.br',   // TROCAR
    pass: 'SUA_SENHA_DE_APP'              // TROCAR (App Password do Google)
  }
});

// Base de leads (em producao, usar banco de dados)
const leads = [];

const sequencia = [
  {
    dia: 0,
    assunto: 'Bem-vindo a HiCare! Aqui esta seu video exclusivo',
    corpo: `Ola {{nome}},

Obrigado pelo seu interesse na HiCare!

Voce se cadastrou pela {{origem}} e queremos te mostrar como a IA pode transformar o atendimento da sua clinica.

Assista este video de 2 minutos:
[LINK DO VIDEO]

Nos falamos em breve!
Equipe HiCare`
  },
  {
    dia: 3,
    assunto: '3 sinais de que sua clinica esta perdendo pacientes agora',
    corpo: `{{nome}}, voce sabia que:

- 40% dos pacientes desistem se nao recebem resposta em 5 min
- A taxa media de no-show no Brasil e de 25-30%
- 92% dos brasileiros preferem WhatsApp

Sua clinica esta preparada para isso?

Podemos analisar exatamente onde sua clinica esta perdendo pacientes — de graca.

[CTA: AGENDAR DIAGNOSTICO GRATUITO → ai-hicare.com.br]`
  },
  {
    dia: 7,
    assunto: 'Veja como a HiCare funciona na pratica [Demo]',
    corpo: `{{nome}},

Quer ver a HiCare em acao?

Assista essa demo de 3 minutos mostrando:
- Um paciente agendando consulta as 23h pelo WhatsApp
- O dashboard com todas as metricas em tempo real
- A IA respondendo com o tom de voz da clinica

[LINK DA DEMO]

Ficou com alguma duvida? Responda esse email!`
  },
  {
    dia: 14,
    assunto: 'O que a IA NAO substitui na sua clinica',
    corpo: `{{nome}},

Muitos medicos tem receio de que a IA vai "substituir" o atendimento humano.

A verdade: a IA da HiCare cuida do operacional para que sua equipe foque no que importa — o cuidado com o paciente.

O que a IA faz: responde, agenda, lembra, faz follow-up
O que sua equipe faz: atende, diagnostica, trata, cuida

E a combinacao perfeita.

[CTA: QUERO SABER MAIS → ai-hicare.com.br]`
  },
  {
    dia: 21,
    assunto: 'Ultima chance: diagnostico gratuito para sua clinica',
    corpo: `{{nome}},

Estamos selecionando as proximas clinicas para nosso programa de implementacao.

As vagas para diagnostico gratuito sao limitadas este mes.

Se voce ainda nao agendou, este e o momento:

[CTA: AGENDAR AGORA - GRATIS → ai-hicare.com.br]

Qualquer duvida, estou a disposicao.

Dr. [Nome], Fundador da HiCare`
  }
];

// Envia um email especifico da sequencia
async function enviarEmail(lead, diaSequencia) {
  const email = sequencia.find(e => e.dia === diaSequencia);
  if (!email) return;

  const corpo = email.corpo
    .replace(/\{\{nome\}\}/g, lead.nome)
    .replace(/\{\{origem\}\}/g, lead.origem || 'nosso site');

  try {
    await transporter.sendMail({
      from: '"HiCare" <contato@ai-hicare.com.br>',
      to: lead.email,
      subject: email.assunto,
      text: corpo
    });
    console.log(`[OK] Email dia ${diaSequencia} enviado para ${lead.email} (${lead.nome})`);
  } catch (err) {
    console.log(`[ERRO] Email dia ${diaSequencia} para ${lead.email}: ${err.message}`);
  }
}

// Verifica quais emails precisam ser enviados
function processarFila() {
  const agora = Date.now();

  leads.forEach(lead => {
    sequencia.forEach(email => {
      const chave = `dia_${email.dia}`;
      if (lead.enviados[chave]) return; // ja enviou

      const msParaEnviar = email.dia * 24 * 60 * 60 * 1000;
      if (agora - lead.cadastradoEm >= msParaEnviar) {
        enviarEmail(lead, email.dia);
        lead.enviados[chave] = true;
      }
    });
  });
}

// Registra novo lead (disparado pelo formulario do site/redes sociais)
function registrarLead(nome, email, origem) {
  // Verifica se ja existe
  if (leads.find(l => l.email === email)) {
    console.log(`[INFO] Lead ${email} ja cadastrado, ignorando duplicata`);
    return false;
  }

  const lead = {
    nome,
    email,
    origem, // 'site', 'instagram', 'facebook', 'landing-page', 'whatsapp'
    cadastradoEm: Date.now(),
    enviados: {}
  };

  leads.push(lead);
  console.log(`[NOVO LEAD] ${nome} (${email}) via ${origem}`);

  // Envia email de boas-vindas imediatamente
  enviarEmail(lead, 0);
  lead.enviados['dia_0'] = true;

  return true;
}

// =====================================================================
// SERVIDOR HTTP — Recebe leads do site e redes sociais
// =====================================================================
// O formulario do site faz POST /novo-lead com JSON:
// { "nome": "Dr. Carlos", "email": "carlos@clinica.com", "origem": "site" }
//
// Origens aceitas: site, instagram, facebook, landing-page, whatsapp
// =====================================================================

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/novo-lead') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { nome, email, origem } = JSON.parse(body);

        if (!nome || !email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ erro: 'nome e email sao obrigatorios' }));
          return;
        }

        const origensValidas = ['site', 'instagram', 'facebook', 'landing-page', 'whatsapp'];
        const origemFinal = origensValidas.includes(origem) ? origem : 'site';

        const novo = registrarLead(nome, email, origemFinal);

        res.writeHead(novo ? 201 : 200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          mensagem: novo ? 'Lead cadastrado, sequencia iniciada' : 'Lead ja cadastrado'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'JSON invalido' }));
      }
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/leads') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ total: leads.length, leads }));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const PORTA = 3001;

server.listen(PORTA, () => {
  console.log('=============================================');
  console.log('  HiCare — Sequencia de Emails Automatizada');
  console.log('=============================================');
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  POST /novo-lead  → Cadastrar lead (quando entrega contato)`);
  console.log(`  GET  /leads      → Ver leads cadastrados`);
  console.log('');
  console.log('Exemplo de cadastro (curl):');
  console.log(`  curl -X POST http://localhost:${PORTA}/novo-lead \\`);
  console.log(`    -H "Content-Type: application/json" \\`);
  console.log(`    -d '{"nome":"Dr. Carlos","email":"carlos@clinica.com","origem":"instagram"}'`);
  console.log('');
  console.log('Origens aceitas: site, instagram, facebook, landing-page, whatsapp');
  console.log('=============================================');
});

// Verificar fila a cada hora
setInterval(processarFila, 60 * 60 * 1000);
