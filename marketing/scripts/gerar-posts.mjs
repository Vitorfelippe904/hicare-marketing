import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'designs', 'exemplos_canva');

// =====================================================================
// GERADOR DE POSTS INSTAGRAM — AI HiCare
// =====================================================================
// Gera posts modernos em PNG usando Puppeteer + HTML/CSS
// Paleta HiCare: fundo escuro + verde neon (#CCFF00)
//
// Como usar:
//   node marketing/scripts/gerar-posts.mjs
//
// Os PNGs sao salvos em marketing/designs/exemplos_canva/
// =====================================================================

const CORES = {
  bg: '#0A0B10',
  accent: '#CCFF00',
  texto: '#F2F4F7',
  card: '#1C1E26',
  cardLight: '#252830',
  cinza: '#9CA3AF',
  accentDark: '#1a2600',
  gradientStart: '#0A0B10',
  gradientEnd: '#111318',
};

// =====================================================================
// TEMPLATES DOS POSTS
// =====================================================================

const posts = [
  // ── POST 1: 5 Sinais ──────────────────────────────────────────────
  {
    nome: 'post01_5sinais',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      padding: 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Grid decorativo -->
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;
        background-image:
          linear-gradient(rgba(204,255,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(204,255,0,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
      "></div>

      <!-- Circulo glow -->
      <div style="position:absolute;top:-120px;right:-120px;width:400px;height:400px;
        background:radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%);
        border-radius:50%;
      "></div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        width: fit-content; margin-bottom: 28px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Atendimento</span>
      </div>

      <!-- Titulo -->
      <h1 style="
        color: ${CORES.texto}; font-size: 52px; font-weight: 800;
        line-height: 1.15; margin: 0 0 40px 0;
        position: relative; z-index: 1;
      ">5 sinais de que sua<br>clinica esta <span style="color:${CORES.accent};">perdendo<br>pacientes</span></h1>

      <!-- Cards dos sinais -->
      <div style="display:flex;flex-direction:column;gap:14px;position:relative;z-index:1;">
        ${[
          'Demora mais de 5 min para responder',
          'Perde agendamentos fora do horario',
          'Secretaria sobrecarregada com WhatsApp',
          'Taxa de no-show acima de 20%',
          'Nao faz follow-up pos-consulta'
        ].map((item, i) => `
          <div style="
            display:flex; align-items:center; gap:16px;
            background: linear-gradient(135deg, ${CORES.card} 0%, ${CORES.cardLight} 100%);
            border: 1px solid rgba(204,255,0,0.08);
            border-radius: 16px; padding: 18px 24px;
          ">
            <div style="
              min-width:40px;height:40px;
              background:linear-gradient(135deg, ${CORES.accent}, #a8d600);
              border-radius:10px;
              display:flex;align-items:center;justify-content:center;
              font-size:18px;font-weight:800;color:${CORES.bg};
            ">${i + 1}</div>
            <span style="color:${CORES.texto};font-size:20px;font-weight:500;">${item}</span>
          </div>
        `).join('')}
      </div>

      <!-- Footer -->
      <div style="
        position:absolute;bottom:40px;left:60px;right:60px;
        display:flex;justify-content:space-between;align-items:center;
      ">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── POST 2: WhatsApp 24h ──────────────────────────────────────────
  {
    nome: 'post02_whatsapp',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      padding: 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Glow central -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;
        background:radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%);
        border-radius:50%;
      "></div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        width: fit-content; margin-bottom: 28px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">WhatsApp + IA</span>
      </div>

      <!-- Titulo -->
      <h1 style="
        color: ${CORES.texto}; font-size: 56px; font-weight: 800;
        line-height: 1.12; margin: 0 0 20px 0;
        position: relative; z-index: 1;
      ">Sua clinica<br>atendendo <span style="color:${CORES.accent};">24 horas</span><br>pelo WhatsApp</h1>

      <p style="color:${CORES.cinza};font-size:22px;line-height:1.5;margin:0 0 36px 0;max-width:700px;position:relative;z-index:1;">
        Pacientes agendam, tiram duvidas e recebem lembretes — tudo automatico, com o tom de voz da sua clinica.
      </p>

      <!-- Mockup de chat -->
      <div style="
        background: ${CORES.card};
        border: 1px solid rgba(204,255,0,0.1);
        border-radius: 24px;
        padding: 28px;
        position: relative; z-index: 1;
        max-width: 580px;
      ">
        <!-- Mensagem paciente -->
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px;">
          <div style="background:#1a3a1a;border-radius:16px 16px 4px 16px;padding:14px 20px;max-width:380px;">
            <span style="color:#d4f7d4;font-size:18px;">Oi, quero agendar uma consulta para amanha a tarde</span>
          </div>
        </div>
        <!-- Resposta IA -->
        <div style="display:flex;justify-content:flex-start;margin-bottom:16px;">
          <div style="background:${CORES.cardLight};border:1px solid rgba(204,255,0,0.15);border-radius:16px 16px 16px 4px;padding:14px 20px;max-width:420px;">
            <span style="color:${CORES.texto};font-size:18px;">Claro! Temos horarios disponiveis amanha as 14h, 15h30 e 17h. Qual prefere? 😊</span>
          </div>
        </div>
        <!-- Mensagem paciente -->
        <div style="display:flex;justify-content:flex-end;">
          <div style="background:#1a3a1a;border-radius:16px 16px 4px 16px;padding:14px 20px;">
            <span style="color:#d4f7d4;font-size:18px;">15h30 por favor!</span>
          </div>
        </div>

        <!-- Badge IA -->
        <div style="position:absolute;top:-14px;left:28px;
          background:linear-gradient(135deg, ${CORES.accent}, #a8d600);
          border-radius:100px;padding:6px 16px;
          display:flex;align-items:center;gap:6px;
        ">
          <span style="font-size:13px;font-weight:700;color:${CORES.bg};">⚡ Respondido pela IA em 3 segundos</span>
        </div>
      </div>

      <!-- Stats -->
      <div style="display:flex;gap:40px;margin-top:32px;position:relative;z-index:1;">
        ${[
          ['23h', 'Horario do agendamento'],
          ['3s', 'Tempo de resposta'],
          ['0', 'Secretarias envolvidas']
        ].map(([num, label]) => `
          <div style="display:flex;flex-direction:column;">
            <span style="color:${CORES.accent};font-size:36px;font-weight:800;">${num}</span>
            <span style="color:${CORES.cinza};font-size:14px;">${label}</span>
          </div>
        `).join('')}
      </div>

      <!-- Footer -->
      <div style="
        position:absolute;bottom:40px;left:60px;right:60px;
        display:flex;justify-content:space-between;align-items:center;
      ">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── POST 3: Chatbot vs IA ────────────────────────────────────────
  {
    nome: 'post03_chatbot_vs_ia',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      padding: 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Grid -->
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;
        background-image:
          linear-gradient(rgba(204,255,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(204,255,0,0.02) 1px, transparent 1px);
        background-size: 80px 80px;
      "></div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        width: fit-content; margin-bottom: 28px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Comparativo</span>
      </div>

      <!-- Titulo -->
      <h1 style="
        color: ${CORES.texto}; font-size: 48px; font-weight: 800;
        line-height: 1.15; margin: 0 0 40px 0;
        position: relative; z-index: 1;
      ">Chatbot comum<br><span style="color:${CORES.cinza};font-size:36px;font-weight:400;">vs</span><br><span style="color:${CORES.accent};">IA HiCare</span></h1>

      <!-- Tabela comparativa -->
      <div style="display:flex;gap:20px;position:relative;z-index:1;flex:1;">
        <!-- Coluna Chatbot -->
        <div style="flex:1;display:flex;flex-direction:column;gap:12px;">
          <div style="
            background:rgba(255,60,60,0.08);
            border:1px solid rgba(255,60,60,0.15);
            border-radius:16px;padding:16px 20px;text-align:center;margin-bottom:8px;
          ">
            <span style="color:#ff6b6b;font-size:20px;font-weight:700;">Chatbot Comum</span>
          </div>
          ${[
            'Respostas engessadas',
            'Menu com opcoes fixas',
            'Nao entende contexto',
            'Frustra o paciente',
            'Funciona so em horario comercial',
            'Sem follow-up'
          ].map(item => `
            <div style="
              background:${CORES.card};
              border:1px solid rgba(255,255,255,0.05);
              border-radius:12px;padding:14px 18px;
              display:flex;align-items:center;gap:12px;
            ">
              <span style="color:#ff6b6b;font-size:18px;">✕</span>
              <span style="color:${CORES.cinza};font-size:16px;">${item}</span>
            </div>
          `).join('')}
        </div>

        <!-- Coluna HiCare -->
        <div style="flex:1;display:flex;flex-direction:column;gap:12px;">
          <div style="
            background:rgba(204,255,0,0.08);
            border:1px solid rgba(204,255,0,0.2);
            border-radius:16px;padding:16px 20px;text-align:center;margin-bottom:8px;
          ">
            <span style="color:${CORES.accent};font-size:20px;font-weight:700;">IA HiCare</span>
          </div>
          ${[
            'Conversa natural por IA',
            'Entende qualquer pergunta',
            'Lembra do historico',
            'Experiencia humanizada',
            'Atende 24h, inclusive feriados',
            'Follow-up automatico'
          ].map(item => `
            <div style="
              background:linear-gradient(135deg, ${CORES.card} 0%, rgba(204,255,0,0.04) 100%);
              border:1px solid rgba(204,255,0,0.1);
              border-radius:12px;padding:14px 18px;
              display:flex;align-items:center;gap:12px;
            ">
              <span style="color:${CORES.accent};font-size:18px;">✓</span>
              <span style="color:${CORES.texto};font-size:16px;font-weight:500;">${item}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Footer -->
      <div style="
        position:absolute;bottom:40px;left:60px;right:60px;
        display:flex;justify-content:space-between;align-items:center;
      ">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── POST 4: Carrossel — Antes e Depois ────────────────────────────
  {
    nome: 'post04_antes_depois',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      padding: 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Grid -->
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;
        background-image:
          linear-gradient(rgba(204,255,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(204,255,0,0.02) 1px, transparent 1px);
        background-size: 80px 80px;
      "></div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        width: fit-content; margin-bottom: 24px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Transformacao</span>
      </div>

      <h1 style="color:${CORES.texto};font-size:44px;font-weight:800;line-height:1.15;margin:0 0 36px 0;position:relative;z-index:1;">
        Antes e depois<br>da <span style="color:${CORES.accent};">IA HiCare</span>
      </h1>

      <!-- Duas colunas -->
      <div style="display:flex;gap:24px;flex:1;position:relative;z-index:1;">
        <!-- Antes -->
        <div style="flex:1;display:flex;flex-direction:column;gap:14px;">
          <div style="background:rgba(255,60,60,0.06);border:1px solid rgba(255,60,60,0.12);border-radius:16px;padding:16px;text-align:center;">
            <span style="color:#ff6b6b;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Antes</span>
          </div>
          ${[
            ['😰', 'Secretaria sobrecarregada'],
            ['📵', 'Sem resposta a noite'],
            ['📉', '30% de no-show'],
            ['😤', 'Pacientes frustrados'],
            ['💸', 'Receita perdida']
          ].map(([emoji, text]) => `
            <div style="background:${CORES.card};border:1px solid rgba(255,255,255,0.04);border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:14px;">
              <span style="font-size:22px;">${emoji}</span>
              <span style="color:${CORES.cinza};font-size:16px;">${text}</span>
            </div>
          `).join('')}
        </div>
        <!-- Depois -->
        <div style="flex:1;display:flex;flex-direction:column;gap:14px;">
          <div style="background:rgba(204,255,0,0.06);border:1px solid rgba(204,255,0,0.15);border-radius:16px;padding:16px;text-align:center;">
            <span style="color:${CORES.accent};font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Depois</span>
          </div>
          ${[
            ['🤖', 'IA responde tudo automatico'],
            ['🌙', 'Atendimento 24h, 7 dias'],
            ['📈', 'No-show caiu para 8%'],
            ['😊', 'Pacientes satisfeitos'],
            ['💰', '+40% de agendamentos']
          ].map(([emoji, text]) => `
            <div style="background:linear-gradient(135deg,${CORES.card},rgba(204,255,0,0.03));border:1px solid rgba(204,255,0,0.08);border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:14px;">
              <span style="font-size:22px;">${emoji}</span>
              <span style="color:${CORES.texto};font-size:16px;font-weight:500;">${text}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Footer -->
      <div style="position:absolute;bottom:40px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── POST 5: Dado / Estatistica ────────────────────────────────────
  {
    nome: 'post05_estatistica',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 80px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Glow grande -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;
        background:radial-gradient(circle, rgba(204,255,0,0.07) 0%, transparent 60%);border-radius:50%;"></div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        margin-bottom: 40px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Voce sabia?</span>
      </div>

      <!-- Numero grande -->
      <div style="position:relative;z-index:1;text-align:center;">
        <span style="
          color:${CORES.accent};font-size:180px;font-weight:900;line-height:1;
          text-shadow: 0 0 80px rgba(204,255,0,0.3);
        ">64%</span>
      </div>

      <p style="color:${CORES.texto};font-size:32px;font-weight:600;text-align:center;line-height:1.4;margin:20px 0 16px 0;position:relative;z-index:1;max-width:700px;">
        dos pacientes preferem<br>agendar por mensagem<br>do que por ligacao
      </p>

      <p style="color:${CORES.cinza};font-size:18px;text-align:center;position:relative;z-index:1;max-width:600px;line-height:1.5;">
        Fonte: Pesquisa Doctoralia 2024 — Se sua clinica so atende por telefone, voce esta perdendo pacientes.
      </p>

      <!-- Divider -->
      <div style="width:60px;height:3px;background:${CORES.accent};border-radius:100px;margin:36px 0;position:relative;z-index:1;"></div>

      <p style="color:${CORES.accent};font-size:20px;font-weight:700;text-align:center;position:relative;z-index:1;">
        A HiCare conecta sua clinica ao WhatsApp com IA
      </p>

      <!-- Footer -->
      <div style="position:absolute;bottom:40px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── POST 6: Depoimento / Social Proof ─────────────────────────────
  {
    nome: 'post06_depoimento',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      padding: 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Aspas grandes decorativas -->
      <div style="position:absolute;top:40px;right:60px;font-size:200px;font-weight:900;color:rgba(204,255,0,0.06);line-height:1;font-family:Georgia,serif;">"</div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        width: fit-content; margin-bottom: 40px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Depoimento</span>
      </div>

      <!-- Quote -->
      <div style="position:relative;z-index:1;flex:1;display:flex;flex-direction:column;justify-content:center;">
        <p style="
          color:${CORES.texto};font-size:36px;font-weight:500;line-height:1.5;
          margin:0 0 40px 0;font-style:italic;max-width:800px;
        ">
          "Antes a gente perdia uns 10 agendamentos por semana so porque nao conseguia responder a tempo. Agora a IA da HiCare responde na hora, e nossos pacientes adoram."
        </p>

        <!-- Autor -->
        <div style="display:flex;align-items:center;gap:20px;">
          <!-- Avatar placeholder -->
          <div style="
            width:64px;height:64px;
            background:linear-gradient(135deg, ${CORES.accent}, #a8d600);
            border-radius:50%;
            display:flex;align-items:center;justify-content:center;
          ">
            <span style="font-size:28px;font-weight:800;color:${CORES.bg};">D</span>
          </div>
          <div>
            <p style="color:${CORES.texto};font-size:20px;font-weight:700;margin:0;">Dra. Camila Rodrigues</p>
            <p style="color:${CORES.cinza};font-size:16px;margin:4px 0 0 0;">Clinica Dermavida — Sao Paulo</p>
          </div>
        </div>

        <!-- Estrelas -->
        <div style="display:flex;gap:6px;margin-top:24px;">
          ${Array(5).fill('').map(() => `
            <div style="width:32px;height:32px;background:${CORES.accent};border-radius:6px;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:16px;">★</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Resultado -->
      <div style="
        background:${CORES.card};border:1px solid rgba(204,255,0,0.1);
        border-radius:20px;padding:24px 32px;
        display:flex;gap:48px;position:relative;z-index:1;
      ">
        ${[
          ['+40%', 'agendamentos'],
          ['-85%', 'tempo de espera'],
          ['24/7', 'atendimento']
        ].map(([num, label]) => `
          <div style="display:flex;flex-direction:column;">
            <span style="color:${CORES.accent};font-size:32px;font-weight:800;">${num}</span>
            <span style="color:${CORES.cinza};font-size:14px;">${label}</span>
          </div>
        `).join('')}
      </div>

      <!-- Footer -->
      <div style="position:absolute;bottom:40px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── POST 7: Como Funciona (3 passos) ──────────────────────────────
  {
    nome: 'post07_como_funciona',
    html: `
    <div style="
      width: 1080px; height: 1080px;
      background: linear-gradient(160deg, ${CORES.bg} 0%, ${CORES.gradientEnd} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      padding: 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Glow -->
      <div style="position:absolute;bottom:-150px;right:-150px;width:500px;height:500px;
        background:radial-gradient(circle, rgba(204,255,0,0.07) 0%, transparent 60%);border-radius:50%;"></div>

      <!-- Tag -->
      <div style="
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(204,255,0,0.1);
        border: 1px solid rgba(204,255,0,0.2);
        border-radius: 100px; padding: 10px 20px;
        width: fit-content; margin-bottom: 24px;
        position: relative; z-index: 1;
      ">
        <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
        <span style="color:${CORES.accent};font-size:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Passo a Passo</span>
      </div>

      <h1 style="color:${CORES.texto};font-size:48px;font-weight:800;line-height:1.15;margin:0 0 20px 0;position:relative;z-index:1;">
        Como a <span style="color:${CORES.accent};">HiCare</span><br>funciona na pratica
      </h1>
      <p style="color:${CORES.cinza};font-size:20px;margin:0 0 40px 0;position:relative;z-index:1;">
        Implementacao a partir de 2 a 3 semanas dependendo do projeto
      </p>

      <!-- 3 Passos -->
      <div style="display:flex;flex-direction:column;gap:20px;position:relative;z-index:1;flex:1;">
        ${[
          {
            num: '01',
            titulo: 'Diagnostico gratuito',
            desc: 'Analisamos o fluxo de atendimento da sua clinica e identificamos onde a IA pode atuar'
          },
          {
            num: '02',
            titulo: 'Configuracao personalizada',
            desc: 'Treinamos a IA com o tom de voz, especialidades e regras da sua clinica'
          },
          {
            num: '03',
            titulo: 'IA ativa no WhatsApp',
            desc: 'Sua clinica começa a atender 24h com agendamento, lembretes e follow-up automatico'
          }
        ].map((step, i) => `
          <div style="
            display:flex;gap:24px;align-items:flex-start;
            background:${CORES.card};
            border:1px solid rgba(204,255,0,${i === 2 ? '0.2' : '0.06'});
            border-radius:20px;padding:28px 32px;
            ${i === 2 ? 'box-shadow:0 0 30px rgba(204,255,0,0.05);' : ''}
          ">
            <div style="
              min-width:56px;height:56px;
              background:${i === 2 ? 'linear-gradient(135deg,'+CORES.accent+',#a8d600)' : 'rgba(204,255,0,0.08)'};
              border-radius:14px;
              display:flex;align-items:center;justify-content:center;
              ${i === 2 ? 'box-shadow:0 0 20px rgba(204,255,0,0.2);' : ''}
            ">
              <span style="font-size:22px;font-weight:800;color:${i === 2 ? CORES.bg : CORES.accent};">${step.num}</span>
            </div>
            <div>
              <p style="color:${CORES.texto};font-size:22px;font-weight:700;margin:0 0 8px 0;">${step.titulo}</p>
              <p style="color:${CORES.cinza};font-size:17px;margin:0;line-height:1.5;">${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- CTA -->
      <div style="
        background:linear-gradient(135deg,${CORES.accent},#a8d600);
        border-radius:100px;padding:18px 40px;
        display:inline-flex;align-items:center;gap:10px;
        width:fit-content;margin-top:32px;position:relative;z-index:1;
        box-shadow:0 0 30px rgba(204,255,0,0.2);
      ">
        <span style="color:${CORES.bg};font-size:18px;font-weight:800;">AGENDAR DIAGNOSTICO GRATUITO</span>
        <span style="color:${CORES.bg};font-size:20px;">→</span>
      </div>

      <!-- Footer -->
      <div style="position:absolute;bottom:40px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${CORES.accent};border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:16px;font-weight:900;color:${CORES.bg};">H</span>
          </div>
          <span style="color:${CORES.texto};font-size:18px;font-weight:700;">HiCare</span>
        </div>
        <span style="color:${CORES.cinza};font-size:15px;">ai-hicare.com.br</span>
      </div>
    </div>`
  },

  // ── STORY 2: Urgencia / CTA ───────────────────────────────────────
  {
    nome: 'story02_vagas',
    width: 1080,
    height: 1920,
    html: `
    <div style="
      width: 1080px; height: 1920px;
      background: linear-gradient(180deg, ${CORES.bg} 0%, #0d0e14 50%, ${CORES.bg} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 80px 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Glow -->
      <div style="position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;
        background:radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 60%);border-radius:50%;"></div>

      <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:900px;">

        <!-- Alerta -->
        <div style="
          background:rgba(255,60,60,0.1);
          border:1px solid rgba(255,60,60,0.2);
          border-radius:100px;padding:12px 28px;
          margin-bottom:50px;display:inline-flex;align-items:center;gap:10px;
        ">
          <div style="width:10px;height:10px;background:#ff6b6b;border-radius:50%;"></div>
          <span style="color:#ff6b6b;font-size:16px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Vagas Limitadas</span>
        </div>

        <h1 style="color:${CORES.texto};font-size:68px;font-weight:800;line-height:1.1;margin:0 0 30px 0;">
          Apenas<br><span style="color:${CORES.accent};font-size:120px;">5</span><br>clinicas novas<br>este mes
        </h1>

        <p style="color:${CORES.cinza};font-size:24px;line-height:1.6;margin:0 0 50px 0;">
          Para garantir qualidade na<br>implementacao, limitamos o<br>numero de novas clinicas
        </p>

        <!-- Beneficios rapidos -->
        <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:60px;width:100%;">
          ${[
            'Setup completo em ate 3 semanas',
            'Treinamento com sua equipe',
            'Suporte dedicado no primeiro mes'
          ].map(item => `
            <div style="display:flex;align-items:center;gap:14px;justify-content:center;">
              <span style="color:${CORES.accent};font-size:20px;">✓</span>
              <span style="color:${CORES.texto};font-size:22px;font-weight:500;">${item}</span>
            </div>
          `).join('')}
        </div>

        <!-- CTA -->
        <div style="
          background:linear-gradient(135deg,${CORES.accent},#a8d600);
          border-radius:100px;padding:28px 64px;
          box-shadow:0 0 50px rgba(204,255,0,0.35);
        ">
          <span style="color:${CORES.bg};font-size:26px;font-weight:800;">GARANTIR MINHA VAGA</span>
        </div>

        <p style="color:${CORES.cinza};font-size:18px;margin-top:24px;">ai-hicare.com.br</p>
      </div>

      <!-- Swipe -->
      <div style="position:absolute;bottom:60px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;">
        <span style="color:${CORES.cinza};font-size:14px;letter-spacing:2px;text-transform:uppercase;">Arraste para cima</span>
        <span style="color:${CORES.accent};font-size:24px;">↑</span>
      </div>
    </div>`
  },

  // ── STORY: Diagnostico Gratuito ───────────────────────────────────
  {
    nome: 'story_diagnostico',
    width: 1080,
    height: 1920,
    html: `
    <div style="
      width: 1080px; height: 1920px;
      background: linear-gradient(180deg, ${CORES.bg} 0%, #0d0e14 50%, ${CORES.bg} 100%);
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 80px 60px;
      position: relative;
      overflow: hidden;
    ">
      <!-- Glow topo -->
      <div style="position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:800px;height:800px;
        background:radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 60%);
        border-radius:50%;
      "></div>

      <!-- Glow inferior -->
      <div style="position:absolute;bottom:-200px;left:50%;transform:translateX(-50%);width:600px;height:600px;
        background:radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 60%);
        border-radius:50%;
      "></div>

      <!-- Conteudo centralizado -->
      <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:900px;">

        <!-- Logo -->
        <div style="
          width:80px;height:80px;
          background:linear-gradient(135deg, ${CORES.accent}, #a8d600);
          border-radius:20px;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:60px;
          box-shadow: 0 0 60px rgba(204,255,0,0.2);
        ">
          <span style="font-size:40px;font-weight:900;color:${CORES.bg};">H</span>
        </div>

        <!-- Tag -->
        <div style="
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(204,255,0,0.1);
          border: 1px solid rgba(204,255,0,0.2);
          border-radius: 100px; padding: 12px 24px;
          margin-bottom: 40px;
        ">
          <div style="width:8px;height:8px;background:${CORES.accent};border-radius:50%;"></div>
          <span style="color:${CORES.accent};font-size:16px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Gratuito</span>
        </div>

        <!-- Titulo -->
        <h1 style="
          color: ${CORES.texto}; font-size: 72px; font-weight: 800;
          line-height: 1.1; margin: 0 0 30px 0;
        ">Diagnostico<br><span style="color:${CORES.accent};">Gratuito</span></h1>

        <p style="color:${CORES.cinza};font-size:26px;line-height:1.6;margin:0 0 50px 0;">
          Descubra onde sua clinica esta<br>perdendo pacientes e como a IA<br>pode resolver em semanas
        </p>

        <!-- Bullets -->
        <div style="display:flex;flex-direction:column;gap:20px;margin-bottom:60px;width:100%;">
          ${[
            'Analise completa do seu atendimento',
            'Mapa de oportunidades com IA',
            'Plano de acao personalizado',
            'Sem compromisso'
          ].map(item => `
            <div style="
              display:flex;align-items:center;gap:16px;
              background: ${CORES.card};
              border: 1px solid rgba(204,255,0,0.08);
              border-radius:16px;padding:20px 28px;
            ">
              <div style="min-width:32px;height:32px;background:rgba(204,255,0,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                <span style="color:${CORES.accent};font-size:16px;font-weight:700;">✓</span>
              </div>
              <span style="color:${CORES.texto};font-size:22px;font-weight:500;">${item}</span>
            </div>
          `).join('')}
        </div>

        <!-- CTA -->
        <div style="
          background: linear-gradient(135deg, ${CORES.accent}, #a8d600);
          border-radius: 100px;
          padding: 24px 60px;
          box-shadow: 0 0 40px rgba(204,255,0,0.3);
        ">
          <span style="color:${CORES.bg};font-size:24px;font-weight:800;letter-spacing:0.5px;">AGENDAR DIAGNOSTICO</span>
        </div>

        <p style="color:${CORES.cinza};font-size:18px;margin-top:20px;">ai-hicare.com.br</p>
      </div>

      <!-- Swipe up indicator -->
      <div style="position:absolute;bottom:60px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;">
        <span style="color:${CORES.cinza};font-size:14px;letter-spacing:2px;text-transform:uppercase;">Arraste para cima</span>
        <span style="color:${CORES.accent};font-size:24px;">↑</span>
      </div>
    </div>`
  }
];

// =====================================================================
// RENDERIZACAO
// =====================================================================

async function gerarPosts() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('=============================================');
  console.log('  HiCare — Gerador de Posts Instagram');
  console.log('=============================================');
  console.log('');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const post of posts) {
    const width = post.width || 1080;
    const height = post.height || 1080;

    console.log(`Gerando ${post.nome} (${width}x${height})...`);

    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    // Carregar fonte Inter do Google Fonts
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: ${width}px; height: ${height}px; overflow: hidden; }
        </style>
      </head>
      <body>${post.html}</body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const path = join(OUTPUT_DIR, `${post.nome}.png`);
    await page.screenshot({ path, type: 'png' });
    console.log(`  ✓ Salvo: ${path}`);

    await page.close();
  }

  await browser.close();

  console.log('');
  console.log('=============================================');
  console.log(`  ${posts.length} posts gerados com sucesso!`);
  console.log(`  Pasta: marketing/designs/exemplos_canva/`);
  console.log('=============================================');
}

gerarPosts().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
