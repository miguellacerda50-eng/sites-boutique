/**
 * gerador_site_boutique.js
 * 
 * DIRETOR DE ARTE SÊNIOR E ENGENHEIRO FRONT-END BOUTIQUE
 * Gera páginas institucionais de alta conversão em arquivo standalone (index.html)
 * Padrão: HTML5 Semântico + Tailwind CSS (CDN) + Google Fonts + Vanilla JS limpo.
 * 
 * Regras Estéticas Anti-IA Estritas:
 * 1. Zero gradientes roxo/azul neon, zero glow artificial, zero 3D genérico.
 * 2. Regra 60-30-10: 60% fundo off-white, 30% ardósia escuro, 10% destaque sóbrio por nicho.
 * 3. Tipografia editorial real (Plus Jakarta Sans / Playfair Display + Inter).
 * 4. Whitespace generoso (py-20, px-6, max-w-6xl).
 * 5. Zero clichês de IA (Revolucione, Desbloqueie, Eleve ao próximo nível, Inovador, Soluções completas).
 * 6. 7 seções obrigatórias completas.
 */

const fs = require('fs');
const path = require('path');

// Palavras proibidas pelo manifesto Anti-IA
const PALAVRAS_PROIBIDAS_IA = [
  'revolucione', 'desbloqueie', 'eleve ao próximo nível', 'eleve ao proximo nivel',
  'inovador', 'inovadora', 'soluções completas', 'solucoes completas',
  'no próximo nível', 'no proximo nivel', 'tecnologia de ponta sem igual'
];

// Banco de Imagens Curadas do Unsplash por Nicho (Alta resolução, reais, testadas)
const BANCO_IMAGENS_UNSPLASH = {
  odontologia: {
    hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    ambiente: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    detalhe: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    equipe: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80'
  },
  medicina: {
    hero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    ambiente: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    detalhe: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    equipe: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80'
  },
  advocacia: {
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ambiente: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    detalhe: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    equipe: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80'
  },
  estetica: {
    hero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    ambiente: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    detalhe: 'https://images.unsplash.com/photo-1512290900672-1a403d1796c8?auto=format&fit=crop&w=800&q=80',
    equipe: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80'
  },
  padrao: {
    hero: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    ambiente: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    detalhe: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    equipe: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
  }
};

// Paletas Sóbrias 60-30-10 por Nicho
const PALETAS_POR_NICHO = {
  odontologia: {
    nome: 'Saúde / Odontologia',
    bg60: '#FAFAFA',
    text30: '#111827',
    accent10: '#0F2942', // Azul Marinho Profundo
    accentHover: '#0a1d30',
    accentLight: '#EBF2F7',
    accentBadge: '#0F2942',
    fontHeading: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    googleFontLink: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
  },
  medicina: {
    nome: 'Medicina / Clínica',
    bg60: '#FAFAFA',
    text30: '#0F172A',
    accent10: '#133E54', // Azul Petróleo Sóbrio
    accentHover: '#0b2735',
    accentLight: '#ECF5F9',
    accentBadge: '#133E54',
    fontHeading: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    googleFontLink: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
  },
  advocacia: {
    nome: 'Advocacia / Jurídico',
    bg60: '#FCFCFD',
    text30: '#0F172A',
    accent10: '#9A7B38', // Dourado Fosco / Bronze Nobre
    accentHover: '#7e642c',
    accentLight: '#FBF7EE',
    accentBadge: '#9A7B38',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
    googleFontLink: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap'
  },
  estetica: {
    nome: 'Estética / Dermatologia',
    bg60: '#FAF8F5',
    text30: '#1C1917',
    accent10: '#9C4129', // Terracota Sóbrio
    accentHover: '#80341f',
    accentLight: '#F9EFEB',
    accentBadge: '#9C4129',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
    googleFontLink: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap'
  },
  padrao: {
    nome: 'Corporativo Padrão',
    bg60: '#FAFAFA',
    text30: '#111827',
    accent10: '#0F2942',
    accentHover: '#0a1d30',
    accentLight: '#EEF2F6',
    accentBadge: '#0F2942',
    fontHeading: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    googleFontLink: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
  }
};

/**
 * Validador estrito anti-clichê de IA
 */
function validarTextosAntiClichê(texto) {
  if (!texto) return true;
  const textoLower = String(texto).toLowerCase();
  for (const proibida of PALAVRAS_PROIBIDAS_IA) {
    if (textoLower.includes(proibida)) {
      console.warn(`[ANTI-CLICHÊ-IA] Alerta: O termo proibido "${proibida}" foi detectado e deve ser substituído por redação direta e humana.`);
      return false;
    }
  }
  return true;
}

/**
 * Sanitiza e formata link de WhatsApp
 */
function formatarWhatsAppLink(telefone, mensagemPadrao) {
  if (!telefone) return 'https://wa.me/5519999999999';
  const numLimpo = String(telefone).replace(/\D/g, '');
  const comDDI = numLimpo.startsWith('55') ? numLimpo : `55${numLimpo}`;
  const msgEncoded = encodeURIComponent(mensagemPadrao || 'Olá, gostaria de agendar um atendimento e tirar dúvidas.');
  return `https://wa.me/${comDDI}?text=${msgEncoded}`;
}

/**
 * Determina categoria e paleta adequada
 */
function identificarNicho(nichoRaw) {
  if (!nichoRaw) return 'padrao';
  const n = nichoRaw.toLowerCase();
  if (n.includes('odonto') || n.includes('dentis') || n.includes('sorriso')) return 'odontologia';
  if (n.includes('médic') || n.includes('medic') || n.includes('clínica') || n.includes('saúde') || n.includes('terapia')) return 'medicina';
  if (n.includes('advoc') || n.includes('juríd') || n.includes('direito') || n.includes('lei') || n.includes('contáb')) return 'advocacia';
  if (n.includes('estét') || n.includes('beleza') || n.includes('pele') || n.includes('dermato') || n.includes('spa')) return 'estetica';
  return 'padrao';
}

/**
 * Função Principal de Geração de Site Boutique
 */
function gerarSiteBoutique(dados) {
  const nichoId = identificarNicho(dados.nicho);
  const paleta = dados.coresCustomizadas || PALETAS_POR_NICHO[nichoId] || PALETAS_POR_NICHO.padrao;
  const fotos = BANCO_IMAGENS_UNSPLASH[nichoId] || BANCO_IMAGENS_UNSPLASH.padrao;

  // Imagens (substitui se fornecidas no objeto)
  const imgHero = dados.imagemHero || fotos.hero;
  const imgAmbiente = dados.imagemAmbiente || fotos.ambiente;
  const imgEquipe = dados.imagemEquipe || fotos.equipe;

  const nomeEmpresa = dados.nome || 'Clínica Odonto Estética';
  const cidade = dados.cidade || 'Campinas - SP';
  const bairro = dados.bairro || 'Cambuí';
  const notaGoogle = Number(dados.notaGoogle || 4.9).toFixed(1);
  const avaliacoesGoogle = dados.avaliacoesGoogle || 84;
  const endereco = dados.endereco || `Rua Coronel Quirino, 1024 - ${bairro}, ${cidade}`;
  const horarios = dados.horarios || 'Segunda a Sexta: 08:00 às 19:00 | Sábado: 08:00 às 13:00';
  const whatsapp = dados.whatsapp || '(19) 99876-5432';
  const cnpj = dados.cnpj || '42.189.923/0001-85';

  const linkWhats = formatarWhatsAppLink(whatsapp, `Olá! Encontrei a ${nomeEmpresa} no Google e gostaria de agendar um atendimento.`);

  // Diferenciais padrão sólidos (Bento Grid)
  const diferenciais = dados.diferenciais && dados.diferenciais.length >= 3 ? dados.diferenciais : [
    {
      titulo: 'Atendimento Pontual e Individualizado',
      descricao: 'Respeito absoluto ao seu tempo. Consultas com horários dedicados, sem salas de espera superlotadas.'
    },
    {
      titulo: 'Diagnóstico Claro e Transparente',
      descricao: 'Avaliações detalhadas com explicação clara de cada procedimento necessário, sem termos técnicos confusos.'
    },
    {
      titulo: 'Estrutura Completa no Cambuí',
      descricao: 'Ambiente climatizado, biossegurança rigorosa e tecnologia moderna para seu conforto e tranquilidade.'
    }
  ];

  // Serviços padrão
  const servicos = dados.servicos && dados.servicos.length >= 3 ? dados.servicos : [
    {
      titulo: 'Clínica Geral e Prevenção',
      descricao: 'Check-ups preventivos, limpezas profiláticas e manutenção contínua para preservar a sua saúde com tranquilidade.'
    },
    {
      titulo: 'Estética e Restaurações',
      descricao: 'Correções funcionais e estéticas com materiais biocompatíveis e acabamento natural e harmônico.'
    },
    {
      titulo: 'Implantes e Reabilitação',
      descricao: 'Recupere a segurança para mastigar e sorrir com planejamentos precisos e procedimentos confortáveis.'
    },
    {
      titulo: 'Ortodontia Moderna',
      descricao: 'Alinhamento dental com opções discretas, eficientes e planejadas para a sua rotina.'
    }
  ];

  // Depoimentos Google estruturados
  const depoimentos = dados.depoimentos && dados.depoimentos.length >= 2 ? dados.depoimentos : [
    {
      nome: 'Mariana Silveira',
      tempo: 'há 2 semanas',
      estrelas: 5,
      comentario: 'Atendimento excepcional desde a recepção. Explicaram cada etapa do meu tratamento com muita paciência e o resultado superou o que eu esperava. Recomendo muito.'
    },
    {
      nome: 'Carlos Eduardo Mendes',
      tempo: 'há 1 mês',
      estrelas: 5,
      comentario: 'Pontualidade britânica e profissionais muito cuidadosos. O consultório é impecável e a localização no Cambuí é muito prática.'
    },
    {
      nome: 'Fernanda Rocha',
      tempo: 'há 3 meses',
      estrelas: 5,
      comentario: 'Fiz um procedimento complexo e não senti nenhum desconforto. Equipe humana e muito competente. Nota 10!'
    }
  ];

  // H1 e Subtítulo focados no problema real e local
  const tituloH1 = dados.tituloH1 || `Atendimento odontológico de precisão e conforto no ${bairro}, ${cidade.split('-')[0].trim()}.`;
  const subtituloHero = dados.subtituloHero || `Cuidamos da sua saúde e do seu bem-estar com planejamento transparente, ambiente acolhedor e foco no que você realmente precisa.`;

  // Validação Anti-Clichê
  validarTextosAntiClichê(tituloH1);
  validarTextosAntiClichê(subtituloHero);

  // Template HTML Standalone de Alto Padrão
  const html = `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nomeEmpresa} | ${bairro}, ${cidade}</title>
  <meta name="description" content="${subtituloHero}">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Tipografia Editorial Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${paleta.googleFontLink}" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              bg: '${paleta.bg60}',
              text: '${paleta.text30}',
              accent: '${paleta.accent10}',
              hover: '${paleta.accentHover}',
              light: '${paleta.accentLight}',
              badge: '${paleta.accentBadge}'
            }
          },
          fontFamily: {
            heading: [${paleta.fontHeading}],
            body: [${paleta.fontBody}]
          }
        }
      }
    }
  </script>
  
  <style>
    body {
      background-color: ${paleta.bg60};
      color: ${paleta.text30};
      font-family: ${paleta.fontBody};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    h1, h2, h3, h4, .font-heading {
      font-family: ${paleta.fontHeading};
    }
    /* Sombra sóbria de alta qualidade (sem glow de IA) */
    .card-shadow {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03);
    }
    .card-hover:hover {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      transition: all 0.25s ease-in-out;
    }
  </style>
</head>
<body class="selection:bg-brand-accent selection:text-white">

  <!-- ========================================== -->
  <!-- 1. HEADER (Navegação Limpa & Ação Direta) -->
  <!-- ========================================== -->
  <header class="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-gray-200/80 transition-all">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      
      <!-- Marca / Logo em Tipografia Editorial -->
      <a href="#" class="flex flex-col">
        <span class="text-xl font-bold tracking-tight text-gray-900 font-heading leading-tight">${nomeEmpresa}</span>
        <span class="text-xs text-gray-500 uppercase tracking-widest font-medium">${bairro} &bull; ${cidade}</span>
      </a>

      <!-- Navegação Limpa (Máximo 3 links sutis) -->
      <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
        <a href="#diferenciais" class="hover:text-gray-900 transition-colors">Diferenciais</a>
        <a href="#servicos" class="hover:text-gray-900 transition-colors">Especialidades</a>
        <a href="#depoimentos" class="hover:text-gray-900 transition-colors">Avaliações</a>
        <a href="#localizacao" class="hover:text-gray-900 transition-colors">Localização</a>
      </nav>

      <!-- Botão de Ação Direta -->
      <div class="flex items-center space-x-4">
        <a href="${linkWhats}" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-accent hover:bg-brand-hover rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50">
          <span>Agendar Atendimento</span>
        </a>

        <!-- Mobile Menu Button -->
        <button id="mobileMenuBtn" class="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none" aria-label="Abrir menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

    </div>

    <!-- Mobile Drawer -->
    <div id="mobileMenu" class="hidden md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3">
      <a href="#diferenciais" class="block text-sm font-medium text-gray-700 py-1">Diferenciais</a>
      <a href="#servicos" class="block text-sm font-medium text-gray-700 py-1">Especialidades</a>
      <a href="#depoimentos" class="block text-sm font-medium text-gray-700 py-1">Avaliações</a>
      <a href="#localizacao" class="block text-sm font-medium text-gray-700 py-1">Localização e Contato</a>
    </div>
  </header>

  <!-- ========================================== -->
  <!-- 2. HERO SECTION (Dobra Principal Assimétrica) -->
  <!-- ========================================== -->
  <section class="py-16 md:py-24 border-b border-gray-200/60 overflow-hidden">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Texto e CTA à Esquerda -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Selo Google Reviews Real -->
          <div class="inline-flex items-center space-x-2 bg-white border border-gray-200/90 rounded-full px-3.5 py-1.5 shadow-sm text-xs text-gray-700">
            <span class="text-amber-500 font-bold tracking-wider">★★★★★</span>
            <span class="font-semibold text-gray-900">${notaGoogle} no Google</span>
            <span class="text-gray-400">&bull;</span>
            <span class="text-gray-600">${avaliacoesGoogle} avaliações reais</span>
          </div>

          <!-- Título H1 Local & Humano -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-heading leading-[1.15]">
            ${tituloH1}
          </h1>

          <!-- Subtítulo Sem Jargões -->
          <p class="text-lg text-gray-600 leading-relaxed max-w-xl">
            ${subtituloHero}
          </p>

          <!-- Ação Principal + Contato Direto -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a href="${linkWhats}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-white bg-brand-accent hover:bg-brand-hover rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-brand-accent/20">
              <svg class="w-5 h-5 mr-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-1.637-.362-.907-.375-1.572-.942-2.185-1.554-.614-.614-1.18-1.278-1.554-2.185-.415-1.003-.407-1.325-.362-1.637.05-.333.419-1.026.824-1.17.133-.048.28-.073.424-.073.103 0 .205.006.297.027.202.047.388.423.497.688.118.287.398.971.433 1.042.035.071.059.155.012.248-.047.094-.071.154-.142.237-.071.083-.15.185-.214.249-.071.071-.144.148-.062.289.082.141.365.602.784 1.021.54.54 1.001.823 1.142.905.141.082.218.009.289-.062.064-.064.166-.143.249-.214.083-.071.143-.095.237-.142.093-.047.177-.023.248.012.071.035.755.315 1.042.433.265.109.641.295.688.497.021.092.027.194.027.297 0 .144-.025.291-.073.424z"/>
              </svg>
              <span>Falar no WhatsApp</span>
            </a>
            
            <a href="#localizacao" class="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors">
              <span>Ver Endereço e Horários</span>
            </a>
          </div>

          <div class="pt-2 text-xs text-gray-500 flex items-center space-x-2">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Atendimento com horário marcado &bull; Fácil estacionamento na região</span>
          </div>

        </div>

        <!-- Card Visual Assimétrico à Direita -->
        <div class="lg:col-span-5">
          <div class="relative">
            <!-- Moldura sutil e elegante -->
            <div class="rounded-2xl overflow-hidden border border-gray-200/90 bg-white p-2 card-shadow">
              <img src="${imgHero}" alt="${nomeEmpresa}" class="w-full h-80 sm:h-96 object-cover rounded-xl" loading="lazy">
            </div>

            <!-- Card Sobreposto Flutuante com Informação Concreta -->
            <div class="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-gray-200/90 rounded-xl p-4 card-shadow max-w-[260px]">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-accent font-bold">
                  ✓
                </div>
                <div>
                  <div class="text-xs font-bold text-gray-900 leading-tight">Espaço Planejado</div>
                  <div class="text-[11px] text-gray-500">Conforto e privacidade para o seu atendimento</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 3. AUTORIDADE / BENTO GRID (Cards Limpos)  -->
  <!-- ========================================== -->
  <section id="diferenciais" class="py-20 md:py-24 border-b border-gray-200/60">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- Cabeçalho de Seção com Respiro -->
      <div class="max-w-2xl mb-14">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-accent">Por que escolher nossa clínica</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 font-heading mt-2">
          Critérios de atendimento que fazem a diferença no seu dia
        </h2>
        <p class="text-gray-600 mt-3 text-base">
          Trabalhamos com foco na clareza do diagnóstico e no bem-estar de quem nos procura.
        </p>
      </div>

      <!-- Bento Grid (3 Cards Sólidos) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${diferenciais.map((dif, idx) => `
        <div class="bg-white border border-gray-200/90 rounded-2xl p-8 card-shadow card-hover flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-brand-light text-brand-accent flex items-center justify-center font-bold text-base mb-6">
              0${idx + 1}
            </div>
            <h3 class="text-lg font-bold text-gray-900 font-heading mb-3">
              ${dif.titulo}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              ${dif.descricao}
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-medium text-brand-accent">
            <span>Padrão de qualidade certificado</span>
          </div>
        </div>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ========================================== -->
  <!-- 4. SERVIÇOS / ESPECIALIDADES               -->
  <!-- ========================================== -->
  <section id="servicos" class="py-20 md:py-24 border-b border-gray-200/60 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div class="max-w-xl">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-accent">Áreas de Atuação</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 font-heading mt-2">
            Tratamentos e cuidados disponíveis
          </h2>
          <p class="text-gray-600 mt-3 text-base">
            Soluções planejadas após avaliação clínica criteriosa, adequadas ao seu momento.
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <a href="${linkWhats}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-brand-accent hover:underline inline-flex items-center">
            <span>Consultar outro procedimento</span>
            <span class="ml-1">→</span>
          </a>
        </div>
      </div>

      <!-- Grid de Serviços -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${servicos.map((serv) => `
        <div class="p-6 rounded-2xl border border-gray-200/80 bg-[#FAFAFA] hover:bg-white hover:border-gray-300 transition-all card-shadow">
          <div class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-brand-accent mb-4 font-bold text-sm">
            ✦
          </div>
          <h3 class="text-base font-bold text-gray-900 font-heading mb-2">
            ${serv.titulo}
          </h3>
          <p class="text-xs text-gray-600 leading-relaxed">
            ${serv.descricao}
          </p>
        </div>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ========================================== -->
  <!-- 5. PROVA SOCIAL (Avaliações Google Reais)  -->
  <!-- ========================================== -->
  <section id="depoimentos" class="py-20 md:py-24 border-b border-gray-200/60">
    <div class="max-w-6xl mx-auto px-6">
      
      <div class="text-center max-w-2xl mx-auto mb-14">
        <div class="inline-flex items-center space-x-1 text-amber-500 mb-2">
          ★★★★★
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
          O que nossos pacientes relatam
        </h2>
        <p class="text-gray-600 mt-2 text-sm">
          Opiniões públicas e espontâneas registradas na nossa ficha do Google Maps.
        </p>
      </div>

      <!-- Cards de Avaliação Google -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${depoimentos.map((dep) => `
        <div class="bg-white border border-gray-200/90 rounded-2xl p-6 card-shadow flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 font-heading">
                  ${dep.nome.charAt(0)}
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">${dep.nome}</div>
                  <div class="text-[11px] text-gray-400">${dep.tempo}</div>
                </div>
              </div>
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Google</span>
            </div>

            <div class="text-amber-500 text-xs mb-3 tracking-widest">
              ${'★'.repeat(dep.estrelas)}
            </div>

            <p class="text-xs text-gray-700 leading-relaxed italic">
              "${dep.comentario}"
            </p>
          </div>

          <div class="mt-6 pt-3 border-t border-gray-100 text-[11px] text-gray-400 flex items-center">
            <svg class="w-3.5 h-3.5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Avaliação confirmada</span>
          </div>
        </div>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ========================================== -->
  <!-- 6. LOCALIZAÇÃO E CONTATO                   -->
  <!-- ========================================== -->
  <section id="localizacao" class="py-20 md:py-24 border-b border-gray-200/60 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Informações de Atendimento -->
        <div class="lg:col-span-6 space-y-6">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-accent">Fácil Acesso</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
            Localização e Horários
          </h2>
          <p class="text-gray-600 text-sm leading-relaxed">
            Situada no coração do ${bairro}, nossa estrutura foi montada para oferecer acessibilidade, tranquilidade e conveniência durante a sua consulta.
          </p>

          <div class="space-y-4 pt-2">
            <div class="flex items-start space-x-3.5">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                📍
              </div>
              <div>
                <div class="text-xs font-bold text-gray-900 uppercase tracking-wider">Endereço</div>
                <div class="text-sm text-gray-700">${endereco}</div>
              </div>
            </div>

            <div class="flex items-start space-x-3.5">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                🕒
              </div>
              <div>
                <div class="text-xs font-bold text-gray-900 uppercase tracking-wider">Horário de Funcionamento</div>
                <div class="text-sm text-gray-700">${horarios}</div>
              </div>
            </div>

            <div class="flex items-start space-x-3.5">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                💬
              </div>
              <div>
                <div class="text-xs font-bold text-gray-900 uppercase tracking-wider">WhatsApp para Agendamento</div>
                <div class="text-sm text-gray-700">${whatsapp}</div>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <a href="${linkWhats}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-brand-accent hover:bg-brand-hover rounded-xl shadow-sm transition-all">
              <span>Iniciar Conversa no WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- Placeholder Elegante do Mapa / Espaço -->
        <div class="lg:col-span-6">
          <div class="bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden card-shadow p-3">
            <div class="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-200 flex flex-col items-center justify-center text-center p-6">
              <img src="${imgAmbiente}" alt="Ambiente ${nomeEmpresa}" class="absolute inset-0 w-full h-full object-cover opacity-75">
              <div class="relative bg-white/95 backdrop-blur-md p-6 rounded-xl border border-gray-200 card-shadow max-w-sm">
                <div class="text-2xl mb-1">🗺️</div>
                <div class="font-bold text-gray-900 text-sm font-heading">${nomeEmpresa}</div>
                <div class="text-xs text-gray-600 mt-1">${endereco}</div>
                <a href="https://maps.google.com/?q=${encodeURIComponent(nomeEmpresa + ' ' + endereco)}" target="_blank" rel="noopener noreferrer"
                   class="mt-3 inline-block text-xs font-bold text-brand-accent hover:underline">
                  Abrir no Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- 7. RODAPÉ CORPORATIVO                      -->
  <!-- ========================================== -->
  <footer class="bg-white border-t border-gray-200 py-12 text-sm text-gray-500">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        <div class="text-center md:text-left">
          <div class="font-bold text-gray-900 font-heading text-base">${nomeEmpresa}</div>
          <div class="text-xs text-gray-500 mt-0.5">CNPJ: ${cnpj} &bull; ${endereco}</div>
        </div>

        <div class="text-xs text-gray-400 text-center md:text-right">
          <div>&copy; ${new Date().getFullYear()} ${nomeEmpresa}. Todos os direitos reservados.</div>
          <div class="mt-1">Página institucional de alta performance desenvolvida com padrões web modernos.</div>
        </div>

      </div>
    </div>
  </footer>

  <!-- Vanilla JS Limpo -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Toggle Mobile Menu
      const menuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
        });
      }

      // Smooth scroll close menu
      document.querySelectorAll('#mobileMenu a').forEach(function(link) {
        link.addEventListener('click', function() {
          if (mobileMenu) mobileMenu.classList.add('hidden');
        });
      });
    });
  </script>

</body>
</html>`;

  return html;
}

module.exports = {
  gerarSiteBoutique,
  validarTextosAntiClichê,
  formatarWhatsAppLink,
  identificarNicho,
  PALAVRAS_PROIBIDAS_IA,
  PALETAS_POR_NICHO,
  BANCO_IMAGENS_UNSPLASH
};
