#!/usr/bin/env python3
"""Gerador de PDF — Estrategia Go-to-Market HiCare (para socios)"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, Frame
import os

DARK_BG = HexColor('#0A0B10')
DARK_CARD = HexColor('#1C1E26')
DARK_CARD2 = HexColor('#13141A')
NEON = HexColor('#CCFF00')
WHITE = HexColor('#F2F4F7')
GRAY = HexColor('#9CA3AF')
GREEN = HexColor('#22C55E')
DARK_LINE = HexColor('#2D3040')

OUT = os.path.join(os.path.dirname(__file__), 'HiCare_GoToMarket_Socios.pdf')

class DarkDoc(BaseDocTemplate):
    def __init__(self, fn, **kw):
        super().__init__(fn, **kw)
        f = Frame(2*cm, 2*cm, self.width - 2*cm, self.height - 2*cm, id='m')
        self.addPageTemplates([PageTemplate(id='d', frames=f, onPage=self._bg)])
    def _bg(self, c, doc):
        c.saveState()
        c.setFillColor(DARK_BG); c.rect(0, 0, A4[0], A4[1], fill=True, stroke=False)
        c.setFillColor(NEON); c.rect(0, A4[1]-3*mm, A4[0], 3*mm, fill=True, stroke=False)
        c.setFillColor(GRAY); c.setFont('Helvetica', 7)
        c.drawString(2*cm, 1.2*cm, 'AI HiCare — Confidencial — Abril 2026')
        c.drawRightString(A4[0]-2*cm, 1.2*cm, f'Pagina {doc.page}')
        c.setStrokeColor(DARK_LINE); c.setLineWidth(0.5)
        c.line(2*cm, 1.6*cm, A4[0]-2*cm, 1.6*cm)
        c.restoreState()

S = {}
S['title'] = ParagraphStyle('t', fontName='Helvetica-Bold', fontSize=28, textColor=WHITE, leading=34, spaceAfter=8)
S['sub'] = ParagraphStyle('su', fontName='Helvetica', fontSize=14, textColor=GRAY, leading=20, spaceAfter=6)
S['accent'] = ParagraphStyle('a', fontName='Helvetica-Bold', fontSize=12, textColor=NEON, spaceAfter=4)
S['sec'] = ParagraphStyle('se', fontName='Helvetica-Bold', fontSize=20, textColor=NEON, spaceBefore=16, spaceAfter=12, leading=26)
S['h2'] = ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=14, textColor=WHITE, spaceBefore=14, spaceAfter=8, leading=18)
S['body'] = ParagraphStyle('b', fontName='Helvetica', fontSize=10, textColor=WHITE, spaceAfter=6, leading=15)
S['gray'] = ParagraphStyle('g', fontName='Helvetica', fontSize=9, textColor=GRAY, spaceAfter=4, leading=13)
S['bullet'] = ParagraphStyle('bu', fontName='Helvetica', fontSize=10, textColor=WHITE, spaceAfter=4, leading=14, leftIndent=15)
S['hi'] = ParagraphStyle('hi', fontName='Helvetica-Bold', fontSize=11, textColor=NEON, spaceAfter=6, leading=15)
S['big'] = ParagraphStyle('bi', fontName='Helvetica-Bold', fontSize=24, textColor=NEON, alignment=TA_CENTER, spaceAfter=2, leading=30)
S['lbl'] = ParagraphStyle('lb', fontName='Helvetica', fontSize=9, textColor=GRAY, alignment=TA_CENTER, spaceAfter=8, leading=12)
S['qt'] = ParagraphStyle('qt', fontName='Helvetica-Oblique', fontSize=12, textColor=WHITE, alignment=TA_CENTER, spaceBefore=10, spaceAfter=10, leading=18, leftIndent=20, rightIndent=20)
S['logo'] = ParagraphStyle('lo', fontName='Helvetica-Bold', fontSize=36, textColor=NEON, spaceAfter=20)

def T(data, cw=None, hdr=True):
    w = 17*cm
    if cw is None: cw = [w/len(data[0])]*len(data[0])
    t = Table(data, colWidths=cw, repeatRows=1 if hdr else 0)
    st = [
        ('BACKGROUND',(0,0),(-1,-1),DARK_CARD),('TEXTCOLOR',(0,0),(-1,-1),WHITE),
        ('FONTNAME',(0,0),(-1,-1),'Helvetica'),('FONTSIZE',(0,0),(-1,-1),8),
        ('LEADING',(0,0),(-1,-1),12),('ALIGN',(0,0),(-1,-1),'LEFT'),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('TOPPADDING',(0,0),(-1,-1),6),
        ('BOTTOMPADDING',(0,0),(-1,-1),6),('LEFTPADDING',(0,0),(-1,-1),8),
        ('RIGHTPADDING',(0,0),(-1,-1),8),('GRID',(0,0),(-1,-1),0.5,DARK_LINE),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[DARK_CARD,DARK_CARD2]),
    ]
    if hdr:
        st += [('BACKGROUND',(0,0),(-1,0),HexColor('#1A1D28')),('TEXTCOLOR',(0,0),(-1,0),NEON),
               ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('LINEBELOW',(0,0),(-1,0),1,NEON)]
    t.setStyle(TableStyle(st))
    return t

def build():
    doc = DarkDoc(OUT, pagesize=A4, title='HiCare Go-to-Market')
    story = []

    # CAPA
    story += [Spacer(1,6*cm), Paragraph('HICARE +', S['logo']),
              Paragraph('Estrategia de Go-to-Market<br/>e Automacao de Marketing', S['title']),
              Spacer(1,8), Paragraph('Plano de 90 dias para entrada no mercado de IA para clinicas medicas', S['sub']),
              Spacer(1,2*cm), Paragraph('Documento para Socios — Abril 2026', S['accent']),
              Paragraph('Confidencial', S['gray']), PageBreak()]

    # SUMARIO
    story.append(Paragraph('SUMARIO', S['sec']))
    for n, t in [('01','O Mercado e a Oportunidade'),('02','Analise Competitiva'),('03','Posicionamento Estrategico'),
                 ('04','Plano de Marketing 90 Dias'),('05','Ferramentas de Automacao'),('06','Fluxo Semanal'),
                 ('07','Precificacao Sugerida'),('08','Metas e KPIs'),('09','O que Temos vs O que Falta'),
                 ('10','Como Usar Cada Ferramenta'),('11','Links Canva'),('12','Proximos Passos')]:
        r = Table([[Paragraph(n, ParagraphStyle('sn',fontName='Helvetica-Bold',fontSize=12,textColor=NEON)),
                    Paragraph(t, ParagraphStyle('st',fontName='Helvetica',fontSize=11,textColor=WHITE))]],
                  colWidths=[1.5*cm,14*cm])
        r.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),DARK_BG),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
                               ('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6),
                               ('LINEBELOW',(0,0),(-1,-1),0.3,DARK_LINE)]))
        story.append(r)
    story.append(PageBreak())

    # 01 MERCADO
    story.append(Paragraph('01 — O MERCADO E A OPORTUNIDADE', S['sec']))
    story.append(Paragraph('O mercado de IA para clinicas no Brasil esta em crescimento acelerado.', S['body']))
    story.append(Spacer(1,10))
    stats = [[Paragraph('92%',S['big']),Paragraph('40%',S['big']),Paragraph('25-30%',S['big']),Paragraph('R$15k',S['big'])],
             [Paragraph('dos brasileiros<br/>preferem WhatsApp',S['lbl']),Paragraph('desistem sem<br/>resposta em 5min',S['lbl']),
              Paragraph('taxa media de<br/>no-show',S['lbl']),Paragraph('perda mensal sem<br/>automacao',S['lbl'])]]
    st = Table(stats, colWidths=[4.25*cm]*4)
    st.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),DARK_CARD),('ALIGN',(0,0),(-1,-1),'CENTER'),
                            ('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),12),
                            ('BOX',(0,0),(-1,-1),1,DARK_LINE)]))
    story += [st, Spacer(1,12)]
    for b in ['Clinicas com IA reduzem no-show em 50-70%','IA ja e padrao em marketing medico em 2026',
              'Maioria dos contatos chega fora do horario comercial']:
        story.append(Paragraph(f'<bullet>&bull;</bullet> {b}', S['bullet']))
    story.append(PageBreak())

    # 02 COMPETITIVA
    story.append(Paragraph('02 — ANALISE COMPETITIVA', S['sec']))
    comp = [['','HiCare','Dr. IAgenda','SecretarIA','GenIA'],
            ['Preco','A definir','Nao divulgado','R$597-997/mes','A partir R$500'],
            ['Clinicas','Pre-lancamento','600+','150+','N/D'],
            ['Setup','2-3 semanas','24 horas','10 minutos','2-3 semanas'],
            ['Foco','Med/Odonto/Est.','Med/Hospitais','Odontologia','Multi-industria'],
            ['Audio','Sim','N/I','Sim','N/I'],
            ['Dashboard','Kanban','Funil','Basico','Basico'],
            ['Fundadores','Medicos','Medica+Empr.','Tech','Tech'],
            ['LGPD','Sim','Sim','N/I','Sim']]
    ct = T(comp, [2.5*cm,3.5*cm,3.5*cm,3.5*cm,3.5*cm])
    ct.setStyle(TableStyle([('BACKGROUND',(1,1),(1,-1),HexColor('#1A2510')),('TEXTCOLOR',(1,1),(1,-1),NEON),
                            ('FONTNAME',(1,1),(1,-1),'Helvetica-Bold')]))
    story += [ct, Spacer(1,12)]
    story.append(Paragraph('Dr. IAgenda', S['h2']))
    story.append(Paragraph('<b>Forcas:</b> 600+ clinicas, Unimed/Rede D\'Or, setup 24h, 20+ integracoes, Grupo Wiser', S['body']))
    story.append(Paragraph('<b>Fraquezas:</b> Esconde preco, foco clinicas grandes, comunicacao fria', S['body']))
    story.append(Paragraph('SecretarIA', S['h2']))
    story.append(Paragraph('<b>Forcas:</b> Preco transparente, setup 10min, anti-alucinacao, audio+fotos', S['body']))
    story.append(Paragraph('<b>Fraquezas:</b> So odonto, sem time medico, 150 clinicas', S['body']))
    story.append(Paragraph('GenIA', S['h2']))
    story.append(Paragraph('<b>Forcas:</b> Multi-canal, preco baixo R$500, humanizada', S['body']))
    story.append(Paragraph('<b>Fraquezas:</b> Nao especializada em saude, sem audio, sem prontuarios', S['body']))
    story.append(PageBreak())

    # 03 POSICIONAMENTO
    story.append(Paragraph('03 — POSICIONAMENTO ESTRATEGICO', S['sec']))
    story.append(Paragraph('"A unica IA feita por medicos que entende o protocolo da SUA clinica"', S['qt']))
    pilares = [['PILAR','O QUE SIGNIFICA','POR QUE IMPORTA'],
               ['DNA Medico','Fundada por medicos','Credibilidade instantanea'],
               ['IA Personalizada','Treinada no protocolo de cada clinica','Nao e chatbot generico'],
               ['Transparencia Total','Dashboard Kanban em tempo real','Sem caixa-preta']]
    story += [T(pilares,[3*cm,6*cm,8*cm]), Spacer(1,12)]
    msgs = [['MENSAGEM','DOR','PROVA'],
            ['Atendimento 24h sem contratar','Custo / horario','Demo ao vivo'],
            ['IA treinada no SEU protocolo','Medo de robotico','Video personalizacao'],
            ['Dashboard transparente','Caixa-preta','Tour pelo painel'],
            ['Feita por medicos','Desconfianca TI','Time fundador']]
    story += [T(msgs,[5*cm,5.5*cm,6.5*cm]), PageBreak()]

    # 04 PLANO 90 DIAS
    story.append(Paragraph('04 — PLANO DE MARKETING — 90 DIAS', S['sec']))
    story.append(Paragraph('Budget: R$5.000/mes | Meta: 60-100 leads | Timeline: 3 meses', S['hi']))
    canais = [['CANAL','INVESTIMENTO','OBJETIVO','META'],
              ['Instagram Organico','Tempo (5 posts/sem)','Awareness','+2.000 seguidores'],
              ['Google Ads','R$2.500/mes','Capturar demanda','50-100 leads/mes'],
              ['WhatsApp Outreach','Tempo','Relacional','10 grupos'],
              ['Parcerias','Comissao','Indicacoes','2 parceiros'],
              ['Email Marketing','Gratis','Nutrir leads','35%+ abertura']]
    story += [T(canais,[3.5*cm,3.5*cm,4.5*cm,4*cm]), Spacer(1,12)]
    budget = [['CATEGORIA','VALOR','%'],['Google Ads','R$2.500','50%'],['Producao','R$1.000','20%'],
              ['Ferramentas','R$500','10%'],['Testes','R$500','10%'],['Contingencia','R$500','10%'],
              ['TOTAL','R$5.000','100%']]
    story += [T(budget,[6*cm,5.5*cm,5.5*cm]), PageBreak()]

    # 05 FERRAMENTAS
    story.append(Paragraph('05 — FERRAMENTAS DE AUTOMACAO', S['sec']))
    story.append(Paragraph('4 ferramentas que reduzem o marketing para ~3 horas/semana:', S['body']))
    for nome, desc, cmd, custo in [
        ('1. Gerador de Copies (Claude IA)', 'Gera legendas, roteiros, emails e anuncios automaticamente', 'node marketing/scripts/gerar-copy.mjs', '~R$5/mes'),
        ('2. Monitor de Concorrentes', 'Rastreia sites de 6 concorrentes e gera relatorio', 'node marketing/scripts/monitor-concorrentes.mjs', 'Gratis'),
        ('3. Sequencia de Emails', '5 emails automaticos ao longo de 21 dias para cada lead', 'Configurar no Brevo (brevo.com)', 'Gratis'),
        ('4. Templates Canva', '16 designs prontos com identidade visual HiCare', 'Ver marketing/designs/LINKS_CANVA.md', 'Gratis')]:
        story.append(Paragraph(nome, S['h2']))
        story.append(Paragraph(desc, S['body']))
        story.append(Paragraph(f'<b>Comando:</b> {cmd} | <b>Custo:</b> {custo}', S['gray']))
    story.append(PageBreak())

    # 06 FLUXO SEMANAL
    story.append(Paragraph('06 — FLUXO SEMANAL', S['sec']))
    story.append(Paragraph('Total: ~3 horas/semana | 1 pessoa opera sozinha', S['hi']))
    fluxo = [['DIA','ATIVIDADE','TEMPO','FERRAMENTA'],
             ['Domingo','Rodar gerador de copies + revisar','30 min','Terminal + IA'],
             ['Segunda','Publicar carrossel educativo','15 min','Canva + IG'],
             ['Terca','Publicar Reel','15 min','Instagram'],
             ['Quarta','Story interativo (enquete)','10 min','Instagram'],
             ['Quinta','Publicar carrossel comparativo','15 min','Canva + IG'],
             ['Sexta','Reel + monitor concorrentes + metricas','35 min','Terminal + IG']]
    story += [T(fluxo,[2.5*cm,7*cm,2*cm,5.5*cm]), PageBreak()]

    # 07 PRECIFICACAO
    story.append(Paragraph('07 — PRECIFICACAO SUGERIDA', S['sec']))
    prec = [['PLANO','PRECO','REFERENCIA','INCLUI'],
            ['Essencial','R$697/mes','SecretarIA: R$597','Dashboard, IA, WhatsApp, suporte 8h'],
            ['Profissional','R$1.197/mes','SecretarIA Pro: R$997','IA avancada, multi-unidade, prioritario'],
            ['Enterprise','Sob consulta','Dr. IAgenda: N/D','400+ agendamentos, custom, dedicado']]
    story += [T(prec,[2.5*cm,3*cm,4.5*cm,7*cm]), Spacer(1,12)]
    launch = [['FASE','OFERTA','OBJETIVO'],
              ['Beta (Mes 1)','5 clinicas GRATIS 60 dias','Social proof e depoimentos'],
              ['Early Adopter','40% off (R$418/mes)','Primeiros 20 clientes'],
              ['Lancamento','Preco cheio + garantia 14 dias','Operacao normal']]
    story += [T(launch,[3.5*cm,6*cm,7.5*cm]), PageBreak()]

    # 08 KPIs
    story.append(Paragraph('08 — METAS E KPIs', S['sec']))
    kpis = [['KPI','META 90 DIAS','COMO MEDIR'],
            ['Leads gerados','60-100','Formulario + WhatsApp'],
            ['CPL','< R$50','Budget / leads'],
            ['Clientes fechados','5-15','Contratos'],
            ['MRR','R$3.500-10.500','Faturamento'],
            ['Seguidores IG','+2.000','Instagram Insights'],
            ['Conversao LP','> 8%','Google Analytics']]
    story += [T(kpis,[4.5*cm,4*cm,8.5*cm]), Spacer(1,12)]
    proj = [['','MES 1','MES 2','MES 3'],
            ['Investimento','R$5.000','R$5.000','R$5.000'],
            ['Leads','20-30','20-40','20-30'],
            ['Clientes','1-3','2-5','2-7'],
            ['MRR','R$697-2.091','R$2.788-7.670','R$6.273-18.125']]
    story += [T(proj,[4*cm,4.33*cm,4.33*cm,4.33*cm]), PageBreak()]

    # 09 O QUE TEMOS vs FALTA
    story.append(Paragraph('09 — O QUE TEMOS vs O QUE FALTA', S['sec']))
    story.append(Paragraph('O que ja esta pronto', S['h2']))
    pronto = [['ITEM','STATUS'],
              ['Estrategia de marketing completa','PRONTO'],['Analise de 3 concorrentes','PRONTO'],
              ['Script gerador de copies (IA)','PRONTO'],['Script monitor de concorrentes','PRONTO'],
              ['Sequencia de 5 emails','PRONTO'],['16 designs no Canva','PRONTO'],
              ['4 decks de apresentacao','PRONTO'],['PDF executivo (este doc)','PRONTO'],
              ['Node.js + pacotes instalados','PRONTO'],['Paleta de cores extraida','PRONTO']]
    pt = T(pronto,[12*cm,5*cm])
    for i in range(1,len(pronto)):
        pt.setStyle(TableStyle([('TEXTCOLOR',(1,i),(1,i),GREEN),('FONTNAME',(1,i),(1,i),'Helvetica-Bold')]))
    story += [pt, Spacer(1,12)]
    story.append(Paragraph('O que falta', S['h2']))
    falta = [['ACAO','TEMPO','CUSTO'],
             ['Criar API key Anthropic','5 min','~R$5/mes'],
             ['Criar conta Brevo (emails)','10 min','Gratis'],
             ['Criar conta Google Ads','15 min','R$2.500/mes'],
             ['Criar Instagram @ai.hicare','20 min','Gratis'],
             ['Escolher designs no Canva','15 min','Gratis'],
             ['Definir pricing com socios','30 min','-'],
             ['Selecionar 5 clinicas beta','1 hora','Gratis']]
    story += [T(falta,[8*cm,3*cm,6*cm]), Spacer(1,12)]
    story.append(Paragraph('Custo mensal total', S['h2']))
    custos = [['ITEM','CUSTO/MES'],['Google Ads','R$2.500'],['API Claude','~R$5'],
              ['Producao conteudo','R$1.000'],['Brevo/Canva','Gratis'],['Extras','R$500'],
              ['TOTAL','R$4.005-5.000/mes']]
    ct2 = T(custos,[10*cm,7*cm])
    ct2.setStyle(TableStyle([('BACKGROUND',(0,-1),(-1,-1),HexColor('#1A2510')),('TEXTCOLOR',(0,-1),(-1,-1),NEON),
                             ('FONTNAME',(0,-1),(-1,-1),'Helvetica-Bold'),('LINEABOVE',(0,-1),(-1,-1),1,NEON)]))
    story += [ct2, PageBreak()]

    # 10 COMO USAR
    story.append(Paragraph('10 — COMO USAR CADA FERRAMENTA', S['sec']))
    story.append(Paragraph('1. Gerador de Copies', S['h2']))
    s1 = [['PASSO','ACAO','COMANDO'],
          ['1','Criar conta console.anthropic.com','(navegador)'],
          ['2','Copiar API Key','(navegador)'],
          ['3','Configurar no terminal','export ANTHROPIC_API_KEY="sk-ant-..."'],
          ['4','Rodar','node marketing/scripts/gerar-copy.mjs']]
    story += [T(s1,[1.5*cm,5.5*cm,10*cm]),Paragraph('Custo: ~R$0,05/geracao. Frequencia: 1x/semana.',S['gray']),Spacer(1,8)]
    story.append(Paragraph('2. Monitor de Concorrentes', S['h2']))
    s2 = [['PASSO','ACAO','COMANDO'],
          ['1','Abrir Terminal','Cmd+Espaco → Terminal'],
          ['2','Ir para pasta','cd ~/Desktop/hicare_completo'],
          ['3','Rodar','node marketing/scripts/monitor-concorrentes.mjs']]
    story += [T(s2,[1.5*cm,5.5*cm,10*cm]),Paragraph('Custo: Gratis. Frequencia: 1x/semana (sexta).',S['gray']),Spacer(1,8)]
    story.append(Paragraph('3. Emails — Configurar Brevo', S['h2']))
    s3 = [['PASSO','ACAO'],['1','Criar conta em brevo.com'],['2','Configurar dominio'],
          ['3','Criar automacao com os 5 emails'],['4','Conectar formulario do site'],['5','Testar']]
    story += [T(s3,[1.5*cm,15.5*cm]),Paragraph('Custo: Gratis ate 300 emails/dia. Setup unico ~1h.',S['gray']),Spacer(1,8)]
    story.append(Paragraph('4. Canva — Publicar posts', S['h2']))
    s4 = [['PASSO','ACAO'],['1','Abrir link do design (ver LINKS_CANVA.md)'],
          ['2','Clicar "Usar template"'],['3','Editar texto'],['4','Baixar PNG ou agendar publicacao']]
    story += [T(s4,[1.5*cm,15.5*cm]),PageBreak()]

    # 11 LINKS CANVA
    story.append(Paragraph('11 — LINKS DOS DESIGNS (CANVA)', S['sec']))
    for titulo, links in [
        ('Deck Apresentacao Socios', [('A','https://www.canva.com/d/Y_TPQB5SDIoCVMb'),('B','https://www.canva.com/d/HNhx7ZSU4MYhG9g'),('C','https://www.canva.com/d/_2xm64gjSQFSQIl'),('D','https://www.canva.com/d/WZWwYe0pTymvvhW')]),
        ('Post 1: 5 Sinais', [('A','https://www.canva.com/d/YCrMdlTP5KADD39'),('B','https://www.canva.com/d/pSRqZEVN6OwVd68'),('C','https://www.canva.com/d/59z98mKa75J1KyK'),('D','https://www.canva.com/d/HGwzIu6fH7qhGV9')]),
        ('Post 2: WhatsApp', [('A','https://www.canva.com/d/uqN-gIyLh55Td3o'),('B','https://www.canva.com/d/8JlOtUG_Mlkvtzr'),('C','https://www.canva.com/d/U4ofvMq3GMrYmKu'),('D','https://www.canva.com/d/WgtYupvkgC2YXbr')]),
        ('Post 3: Chatbot vs IA', [('A','https://www.canva.com/d/IciQBSjuFxHKt_9'),('B','https://www.canva.com/d/7qwlhfNdB4n1P6j'),('C','https://www.canva.com/d/Qw5jVBMSVxz2EpZ'),('D','https://www.canva.com/d/ypSVUS8KDwsIYC0')]),
        ('Stories CTA', [('A','https://www.canva.com/d/hDEkkupZ0jOhpSh'),('B','https://www.canva.com/d/2y_BIggufaUOQvt'),('C','https://www.canva.com/d/59-agi-RtIeJU7r'),('D','https://www.canva.com/d/eVlkMdBM-PJtucv')])]:
        story.append(Paragraph(titulo, S['h2']))
        story.append(T([['OPCAO','LINK']]+[[o,l] for o,l in links],[3*cm,14*cm]))
        story.append(Spacer(1,8))
    story.append(PageBreak())

    # 12 PROXIMOS PASSOS
    story.append(Paragraph('12 — PROXIMOS PASSOS', S['sec']))
    story.append(Paragraph('Decisoes para os socios', S['h2']))
    dec = [['#','DECISAO','OPCOES','PRAZO'],
           ['1','Pricing final','R$697 ok? Ajustar?','Esta semana'],
           ['2','Quantos betas','3, 5 ou 10 clinicas?','Esta semana'],
           ['3','Quem opera mkt','Socio assume? Contrata?','Esta semana'],
           ['4','Budget Ads','R$2.500/mes confirmado?','Antes lancamento'],
           ['5','Timeline','Comecamos quando?','Hoje']]
    story += [T(dec,[1*cm,4*cm,7*cm,5*cm]), Spacer(1,12)]
    story.append(Paragraph('Acoes imediatas (Semana 1)', S['h2']))
    for i,a in enumerate(['Definir pricing final','Oferecer 5 pilotos gratuitos',
                          'Lancar Instagram + 3 primeiros posts','Configurar Google Ads',
                          'Configurar emails automaticos','Fechar 1 parceria estrategica',
                          'Agendar webinar para mes 2'],1):
        story.append(Paragraph(f'<b>{i}.</b> {a}', S['bullet']))
    story.append(Spacer(1,20))
    story.append(Paragraph('"Com R$5.000/mes e 3 horas/semana, operamos uma maquina de marketing completa."', S['qt']))

    doc.build(story)
    print(f'PDF gerado: {OUT}')
    print(f'Tamanho: {os.path.getsize(OUT)/1024:.0f} KB')

if __name__ == '__main__':
    build()
