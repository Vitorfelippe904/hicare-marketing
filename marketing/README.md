# Marketing HiCare — Estrutura do Projeto

## Pastas

```
marketing/
├── estrategia/          → Plano de go-to-market e calendario
├── concorrentes/        → Analise competitiva + relatorios automaticos
├── scripts/             → Scripts de automacao (copies IA, monitor)
├── automacao/           → Sequencia de emails automatizada
├── designs/             → Posts prontos (PNGs) + links Canva
└── docs_socios/         → PDF e materiais para reuniao com socios
```

## Como usar

### Gerar copies da semana (domingo, 30min)
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
node marketing/scripts/gerar-copy.mjs
```

### Monitorar concorrentes (sexta, 5min)
```bash
node marketing/scripts/monitor-concorrentes.mjs
```

### Ver designs no Canva
Abrir: marketing/designs/LINKS_CANVA.md

## Requisitos
- Node.js (instalado em ~/node/)
- API key Anthropic (para gerar copies)
- Pacotes npm ja instalados no node_modules/
