import nodemailer from 'nodemailer';

// INSTRUCOES:
// 1. Configurar Gmail App Password ou conta Brevo/SendGrid
// 2. Ajustar as credenciais abaixo
// 3. Rode: node marketing/automacao/email-sequence.mjs

// Configurar SMTP (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contato@ai-hicare.com.br',   // TROCAR
    pass: 'SUA_SENHA_DE_APP'              // TROCAR (App Password do Google)
  }
});

const sequencia = [
  {
    dia: 0,
    assunto: 'Bem-vindo a HiCare! Aqui esta seu video exclusivo',
    corpo: `Ola {{nome}},

Obrigado por agendar seu diagnostico com a HiCare!

Enquanto preparamos sua analise, assista este video de 2 minutos para entender como a IA pode transformar o atendimento da sua clinica:

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

No seu diagnostico gratuito, vamos analisar exatamente onde sua clinica esta perdendo pacientes e como resolver.

[CTA: CONFIRMAR MEU DIAGNOSTICO]`
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

[CTA: QUERO SABER MAIS]`
  },
  {
    dia: 21,
    assunto: 'Ultima chance: diagnostico gratuito para sua clinica',
    corpo: `{{nome}},

Estamos selecionando as proximas clinicas para nosso programa de implementacao.

As vagas para diagnostico gratuito sao limitadas este mes.

Se voce ainda nao agendou, este e o momento:

[CTA: AGENDAR AGORA - GRATIS]

Qualquer duvida, estou a disposicao.

Dr. [Nome], Fundador da HiCare`
  }
];

async function enviarEmail(destinatario, nome, diaSequencia) {
  const email = sequencia.find(e => e.dia === diaSequencia);
  if (!email) return;

  const corpo = email.corpo.replace(/\{\{nome\}\}/g, nome);

  await transporter.sendMail({
    from: '"HiCare" <contato@ai-hicare.com.br>',
    to: destinatario,
    subject: email.assunto,
    text: corpo
  });

  console.log(`Email dia ${diaSequencia} enviado para ${destinatario}`);
}

// Exemplo de uso:
// enviarEmail('clinica@exemplo.com', 'Dr. Carlos', 0);

console.log('Sequencia de emails configurada!');
console.log('Emails disponiveis:', sequencia.map(e => `Dia ${e.dia}: ${e.assunto}`).join('\n'));
