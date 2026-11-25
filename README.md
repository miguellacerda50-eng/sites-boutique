# 🌐 SITES — Motor de Páginas Institucionais Boutique Anti-IA

Gerador de sites institucionais e landing pages de alta conversão no padrão de agências boutique de São Paulo, entregando código limpo, semântico e standalone (`index.html`) sem dependências pesadas de build.

---

## 🎯 Objetivo

Gerar sites modernos, sóbrios e humanos que se diferenciam radicalmente de templates genéricos gerados por inteligência artificial. Criado para empresas locais (clínicas, escritórios de advocacia, consultorias e estética) com foco em velocidade de carregamento, autoridade e conversão direta via WhatsApp.

---

## 💎 Diretrizes Estéticas Anti-IA (Obrigatórias)

1. **Zero Clichês Visuais:** Proibição estrita de fundos gradientes roxos/azuis neon, brilhos artificiais (*glow effects*), ilustrações 3D genéricas e excesso de ícones flutuantes.
2. **Regra de Cores 60-30-10:**
   - **60% Fundo:** Branco puro ou off-white sóbrio (`#FAFAFA` / `#FCFCFD`).
   - **30% Texto:** Ardósia escuro / grafite (`#111827` / `#0F172A`) para alto contraste e legibilidade.
   - **10% Destaque:** Cor sóbria de autoridade calibrada por nicho:
     - *Saúde / Odontologia:* Azul Marinho Profundo (`#0F2942`)
     - *Advocacia / Jurídico:* Dourado Fosco / Bronze Nobre (`#9A7B38`)
     - *Estética / Dermatologia:* Terracota Sóbrio (`#9C4129`) ou Verde Esmeralda (`#1E3F35`)
3. **Tipografia Editorial:** Fontes Google reais com hierarquia apurada:
   - Títulos: *Plus Jakarta Sans* (Saúde/Moderna) ou *Playfair Display* (Advocacia/Clássico).
   - Corpo: *Inter* com entrelinha relaxada (`leading-relaxed`).
4. **Espaço e Respiro (Whitespace):** Margens generosas (`py-20`, `px-6`, `max-w-6xl mx-auto`).
5. **Copywriting Real e Validador Anti-Clichê:** Filtro ativo que bloqueia termos batidos de IA (*"Revolucione"*, *"Desbloqueie"*, *"Eleve ao próximo nível"*, *"Inovador"*, *"Soluções completas"*), priorizando clareza, transparência e localização.

---

## 📐 As 7 Seções Obrigatórias

1. **Header:** Marca com tipografia editorial, no máximo 3 links suaves e CTA direto.
2. **Hero Section:** Layout assimétrico, H1 local, subtítulo transparente, CTA de WhatsApp e selo de nota no Google (*★★★★★ 4.9 no Google*).
3. **Bento Grid de Diferenciais:** Cards limpos com bordas suaves (`border-gray-200/90`) e métricas concretas.
4. **Serviços / Especialidades:** Apresentação clara em linguagem acessível ao paciente/cliente final.
5. **Prova Social:** Cards elegantes formatados como avaliações da ficha do Google Maps com estrelas e depoimento autêntico.
6. **Localização e Contato:** Endereço completo, horários de atendimento, WhatsApp e bloco visual de localização com link para rotas no Google Maps.
7. **Rodapé Corporativo:** Razão social, CNPJ, responsável técnico e copyright limpo.

---

## 📂 Estrutura de Arquivos

```text
SITES/
├── PROMPT_DIRETOR_DE_ARTE_SITES.md # Diretrizes completas do Diretor de Arte Sênior
├── gerador_site_boutique.js        # Motor em Node.js com catálogo de fotos e paletas por nicho
├── test_gerador_site.js            # Suíte com 32 testes automatizados
├── demo_clinica_odonto.html        # Exemplo real compilado: Odontologia no Cambuí
├── demo_advocacia_boutique.html    # Exemplo real compilado: Advocacia na Faria Lima
├── .gitignore                      # Regras de exclusão Git
└── README.md                       # Documentação do projeto
```

---

## 🚀 Como Executar

### 1. Executar os Testes Automatizados
```bash
node test_gerador_site.js
```

### 2. Gerar uma Nova Página Institucional
```bash
node -e "const { gerarSiteBoutique } = require('./gerador_site_boutique'); /* passe os dados do cliente */"
```
O arquivo gerado é um `index.html` autônomo, mobile-first, que utiliza Tailwind CSS via CDN e vanilla JS, pronto para publicação instantânea na Hostinger ou qualquer VPS/hospedagem estática.
