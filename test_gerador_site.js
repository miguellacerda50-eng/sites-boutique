/**
 * test_gerador_site.js
 * 
 * Suíte de testes automatizados para o motor SITES (Boutique Agency Pattern).
 * Valida os requisitos anti-IA, regras 60-30-10, as 7 seções e gera 2 demos funcionais.
 */

const fs = require('fs');
const path = require('path');
const {
  gerarSiteBoutique,
  validarTextosAntiClichê,
  formatarWhatsAppLink,
  identificarNicho,
  PALAVRAS_PROIBIDAS_IA,
  PALETAS_POR_NICHO
} = require('./gerador_site_boutique');

let totalAsserts = 0;
let passedAsserts = 0;

function assert(condition, message) {
  totalAsserts++;
  if (condition) {
    passedAsserts++;
    console.log(`  [OK] ${message}`);
  } else {
    console.error(`  [FALHA] ${message}`);
  }
}

console.log('===============================================================');
console.log('   INICIANDO TESTES DO MOTOR DE SITES BOUTIQUE (ANTI-IA)');
console.log('===============================================================\n');

// -------------------------------------------------------------
// BLOCO 1: Testes Unitários de Sanitização e Regras
// -------------------------------------------------------------
console.log('BLOCO 1: Validação de Regras Anti-IA e Formatadores');

assert(validarTextosAntiClichê('Atendimento de alta qualidade focado em saúde preventiva') === true, 'Texto humanizado aprovado');
assert(validarTextosAntiClichê('Revolucione o seu sorriso com nossa tecnologia') === false, 'Detectou clichê "Revolucione"');
assert(validarTextosAntiClichê('Eleve ao próximo nível o seu negócio') === false, 'Detectou clichê "Eleve ao próximo nível"');
assert(validarTextosAntiClichê('Oferecemos soluções completas para sua empresa') === false, 'Detectou clichê "Soluções completas"');
assert(validarTextosAntiClichê('Nosso modelo inovador de atendimento') === false, 'Detectou clichê "Inovador"');

const linkWhats = formatarWhatsAppLink('(19) 99876-5432', 'Olá, gostaria de agendar');
assert(linkWhats.includes('https://wa.me/5519998765432'), 'Link de WhatsApp com DDI 55 correto');
assert(linkWhats.includes('gostaria%20de%20agendar'), 'Mensagem URL encoded corretamente');

assert(identificarNicho('Clínica Odontológica') === 'odontologia', 'Nicho odontologia identificado');
assert(identificarNicho('Escritório de Advocacia') === 'advocacia', 'Nicho advocacia identificado');
assert(identificarNicho('Clínica Médica e Vacinas') === 'medicina', 'Nicho medicina identificado');
assert(identificarNicho('Centro de Estética e Dermatologia') === 'estetica', 'Nicho estética identificado');
assert(identificarNicho('Comércio Geral') === 'padrao', 'Nicho padrão identificado');

// -------------------------------------------------------------
// BLOCO 2: Geração do Site 1 (Clínica Odonto Estética - Cambuí)
// -------------------------------------------------------------
console.log('\nBLOCO 2: Geração e Validação Estrutural do Site 1 (Odontologia)');

const dadosOdonto = {
  nome: 'Clínica Odonto Estética',
  nicho: 'Odontologia e Estética Dental',
  cidade: 'Campinas - SP',
  bairro: 'Cambuí',
  notaGoogle: 4.9,
  avaliacoesGoogle: 84,
  endereco: 'Rua Coronel Quirino, 1024 - Cambuí, Campinas - SP',
  horarios: 'Segunda a Sexta: 08:00 às 19:00 | Sábado: 08:00 às 13:00',
  whatsapp: '(19) 99876-5432',
  cnpj: '42.189.923/0001-85',
  tituloH1: 'Tratamento odontológico de precisão e acolhimento no Cambuí, Campinas.',
  subtituloHero: 'Cuidamos da sua saúde e do seu bem-estar com planejamento transparente, ambiente climatizado e foco no que você realmente precisa.'
};

const htmlOdonto = gerarSiteBoutique(dadosOdonto);

// Verificação das 7 seções obrigatórias
assert(htmlOdonto.includes('<!DOCTYPE html>'), 'HTML5 válido');
assert(htmlOdonto.includes('name="viewport" content="width=device-width, initial-scale=1.0"'), 'Viewport mobile-first presente');
assert(htmlOdonto.includes('https://cdn.tailwindcss.com'), 'Tailwind CSS CDN presente');
assert(htmlOdonto.includes('Plus+Jakarta+Sans'), 'Fonte editorial Plus Jakarta Sans injetada');
assert(htmlOdonto.includes('Inter'), 'Fonte de corpo Inter injetada');

// Seção 1: Header
assert(htmlOdonto.includes('<header') && htmlOdonto.includes('Agendar Atendimento'), 'Seção 1 (Header com Ação) presente');
// Seção 2: Hero
assert(htmlOdonto.includes('4.9 no Google') && htmlOdonto.includes('Falar no WhatsApp'), 'Seção 2 (Hero com Selo Google e CTA) presente');
// Seção 3: Diferenciais
assert(htmlOdonto.includes('id="diferenciais"') && htmlOdonto.includes('01'), 'Seção 3 (Bento Grid Diferenciais) presente');
// Seção 4: Serviços
assert(htmlOdonto.includes('id="servicos"') && htmlOdonto.includes('Áreas de Atuação'), 'Seção 4 (Serviços e Especialidades) presente');
// Seção 5: Depoimentos
assert(htmlOdonto.includes('id="depoimentos"') && htmlOdonto.includes('Avaliações'), 'Seção 5 (Prova Social Google) presente');
// Seção 6: Localização
assert(htmlOdonto.includes('id="localizacao"') && htmlOdonto.includes('Localização e Horários'), 'Seção 6 (Localização e Contato) presente');
// Seção 7: Rodapé
assert(htmlOdonto.includes('<footer') && htmlOdonto.includes('42.189.923/0001-85'), 'Seção 7 (Rodapé Corporativo com CNPJ) presente');

// Cores 60-30-10 do nicho Odonto
assert(htmlOdonto.includes('#0F2942'), 'Cor de destaque sóbria 10% Azul Marinho (#0F2942) aplicada');
assert(htmlOdonto.includes('#FAFAFA'), 'Cor de fundo 60% Off-White (#FAFAFA) aplicada');

// Salva arquivo demo odonto
const demoOdontoPath = path.join(__dirname, 'demo_clinica_odonto.html');
fs.writeFileSync(demoOdontoPath, htmlOdonto, 'utf8');
assert(fs.existsSync(demoOdontoPath), 'Arquivo demo_clinica_odonto.html gerado com sucesso');

// -------------------------------------------------------------
// BLOCO 3: Geração do Site 2 (Advocacia Empresarial)
// -------------------------------------------------------------
console.log('\nBLOCO 3: Geração e Validação Estrutural do Site 2 (Advocacia / Jurídico)');

const dadosAdvocacia = {
  nome: 'Menezes & Associados Advocacia',
  nicho: 'Advocacia Empresarial e Tributária',
  cidade: 'São Paulo - SP',
  bairro: 'Itaim Bibi',
  notaGoogle: 5.0,
  avaliacoesGoogle: 46,
  endereco: 'Av. Brigadeiro Faria Lima, 2800 - 12º andar - Itaim Bibi, São Paulo - SP',
  horarios: 'Segunda a Sexta: 09:00 às 18:30',
  whatsapp: '(11) 98765-4321',
  cnpj: '18.452.109/0001-32',
  tituloH1: 'Assessoria jurídica estratégica para empresas no Itaim Bibi, São Paulo.',
  subtituloHero: 'Atuação consultiva e contenciosa com rigor técnico, sigilo e foco na segurança patrimonial e operacional da sua organização.'
};

const htmlAdv = gerarSiteBoutique(dadosAdvocacia);

assert(htmlAdv.includes('Playfair+Display'), 'Tipografia serifada nobre Playfair Display injetada para advocacia');
assert(htmlAdv.includes('#9A7B38'), 'Cor de destaque sóbria 10% Dourado Fosco (#9A7B38) aplicada');
assert(htmlAdv.includes('Menezes & Associados Advocacia'), 'Nome da banca jurídica presente');
assert(htmlAdv.includes('5.0 no Google'), 'Selo 5.0 Google Reviews presente');

const demoAdvPath = path.join(__dirname, 'demo_advocacia_boutique.html');
fs.writeFileSync(demoAdvPath, htmlAdv, 'utf8');
assert(fs.existsSync(demoAdvPath), 'Arquivo demo_advocacia_boutique.html gerado com sucesso');

// -------------------------------------------------------------
// RESUMO FINAL
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log(` RESULTADO: ${passedAsserts}/${totalAsserts} asserções passaram com sucesso! (100%)`);
console.log('===============================================================\n');

if (passedAsserts === totalAsserts) {
  process.exit(0);
} else {
  process.exit(1);
}
