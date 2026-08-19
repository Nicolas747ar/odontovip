# Odonto Vip — landing page

Página institucional da Odonto Vip, reconstruída a partir do conteúdo da
landing anterior (`odontovip.base44.app`) com a linguagem visual do design
system CINCO.

## Como abrir

Arquivo único, sem build e sem dependências:

- `odontovip-completo.html` — versão autocontida (CSS, JS e imagens embutidos).
  Basta abrir no navegador ou mandar por WhatsApp/e-mail para alguém ver.
- `index.html` + `assets/` — versão para publicar (é esta que vai para o servidor).

Para servir localmente:

    python3 -m http.server 4321

e abrir <http://localhost:4321>.

## Estrutura

    index.html                          página completa
    assets/css/styles.css               tokens + componentes
    assets/js/main.js                   reveal on scroll, menu mobile, seção ativa
    assets/img/odontovip-selo.png       selo circular dourado (transparente)
    assets/img/odontovip-lettering.png  lettering ODONTO VIP (transparente)
    assets/img/odontovip-logo.png       logo horizontal, usado só em og:image
    assets/img/dra-marcelly.jpg         retrato do hero
    assets/img/equipe-cirurgia.jpg      foto da seção "Equipe e estrutura"
    Img/                                originais enviados, sem tratamento

Seções, na ordem: hero · números · 01 unidades · 02 serviços · 03 equipe e
estrutura · 04 diferenciais · 05 agendamento · Instagram · CTA final · rodapé.

Site inteiro (HTML + CSS + JS + imagens): **592 KB**.

## Direção de arte

A página tem impronta própria: nada aqui é herdado de template. As decisões que
sustentam o visual, e por quê:

- **Serifa editorial com itálico como acento.** Títulos em Newsreader; a palavra
  destacada vai em itálico com gradiente dourado (`.acc`). É o gesto que mais
  afasta a página do "sans geométrico em tudo".
- **Grão fino sobre a página inteira** (`body::after`, `feTurbulence` em SVG
  inline). Tira o aspecto liso de render.
- **Fotos em arco** — topo semicircular, não retângulo arredondado — com uma
  segunda moldura em fio de ouro deslocada, como passe-partout.
- **Fios de ouro** (hairlines em gradiente) em vez de bordas duras e caixas.
- **Numeração de seção** 01…05, rótulos verticais, numerais romanos i–vi nos
  diferenciais e citação em corpo grande.
- **Ícones de traço fino** (1.35) em anel de ouro, em vez da caixa preenchida
  repetida em cada item.
- **Grade de serviços com ritmo** 3+3 · 2+2+2 · 2+2+2 · 3+3 — todas as linhas
  fecham cheias, sem o buraco final típico de grade automática.
- **Placas de mapa vetoriais**: cada unidade tem um traçado de ruas próprio
  (`#map-a`, `#map-b`, `#map-c`), pin dourado com pulso e pílula "Abrir no Maps".
  Não usa tiles nem API — é desenho, e por isso não depende de rede nem de chave.

Paleta amostrada da própria marca (azul do dente, dourado da coroa):

    --navy   #08203F      --brand        #1880BF     --cyan  #30E3E5
    --navy-2 #0B2A52      --brand-deep   #0A5C96     --gold  #BC943D
    --paper  #FBFAF7      --brand-bright #3AA7DE     --wa    #25D366

O branco é quente (`#FBFAF7`), não clínico. Tipografia: **Newsreader** (títulos,
com itálico) + **Karla** (texto).

## Marca

O logo horizontal original foi separado em duas peças, medidas no pixel:

- `odontovip-selo.png` — selo circular dourado, recortado no anel exato
  (centro 421,499 / raio 385 do original) e mascarado em círculo com
  transparência. Substitui o dente do logo antigo.
- `odontovip-lettering.png` — só a palavra ODONTO VIP com a tagline.

O lockup do cabeçalho e do rodapé monta as duas peças em CSS, com altura fixa e
largura automática — por isso não estica em nenhum tamanho de tela.

## Dados usados

| Item | Valor |
|---|---|
| Slogan | Excelência em cada sorriso |
| Subtítulo | Saúde bucal, tratamento, prevenção e estética |
| Horário | Seg a sex 08:30–17h · Sáb 08–12h |
| Instagram | [@odontovip.oficial](https://www.instagram.com/odontovip.oficial/) |

**Unidade Prazeres** — Rua Doutor Luis Rigueira, 46, 1º andar, Sala 06,
Prazeres, Jaboatão dos Guararapes / PE · WhatsApp `81 99567-2364`

**Unidade Norte** — Av. Norte Miguel Arraes de Alencar, 5246, Casa Amarela,
Recife / PE · WhatsApp `81 99702-9109`

**Odonto Vip Boa Viagem** — Boa Viagem, Recife / PE. Em construção; aparece como
card "Em breve", sem número de WhatsApp e sem link de mapa até abrir.

Serviços (10): avaliação odontológica · limpeza e prevenção · restaurações ·
extrações · tratamento de canal · próteses · implantes · ortodontia ·
clareamento dental · dor e urgência.

As descrições de cada serviço e os textos de apoio foram escritos para esta
página — a landing anterior só listava os nomes.

## Escolha de unidade nos CTAs

Todo CTA que não é de uma unidade específica abre um seletor com Prazeres e
Norte, em vez de mandar para um número sem avisar qual. São sete: botão do
cabeçalho, hero, os dois cartões de serviço em destaque, "Falar com a equipe",
CTA final e o botão flutuante.

Feito com `<details>`/`<summary>`: abre e fecha nativamente, é acessível por
teclado e os itens são `<a href>` de verdade — funciona mesmo se o JS falhar. O
JS só fecha ao clicar fora, no Esc, e garante que só um fique aberto.

A mensagem do WhatsApp já vai preenchida com a unidade escolhida, então a
recepção sabe de onde veio o contato.

### Cuidado ao editar: nada que contenha um seletor pode ter `overflow:hidden`

Um popover é recortado por qualquer ancestral com `overflow` diferente de
`visible`. Por isso os enfeites que transbordam (o blob do hero, o selo de marca
d'água do CTA) ficam dentro de uma camada `.deco` — é ELA que tem
`overflow:hidden`, não a seção. E o brilho do cartão de serviço em destaque é um
gradiente com `inset:0`, não um círculo deslocado.

Há ainda o empilhamento: todas as seções têm `z-index:1`, então a seção seguinte
no DOM pintava por cima do menu. O JS marca com `.picker-open` a seção (e o
cartão) que hospeda o seletor aberto, e o CSS os eleva. O cartão também precisa
subir porque os vizinhos, durante o fade-in, ficam com `opacity < 1` e criam
contexto de empilhamento.

Se um menu voltar a aparecer cortado, procure primeiro por um `overflow:hidden`
novo em algum ancestral.

## A confirmar com o cliente

1. **WhatsApp da unidade Norte.** O link da página anterior estava quebrado
   (`558181997029109`, com o DDD duplicado). Corrigido para `5581997029109`,
   número que aparece no material de divulgação da clínica.
2. **Um número ou dois?** O material de divulgação usa `81 99702-9109` para as
   duas unidades; a página anterior usava `81 99567-2364` para Prazeres. Aqui
   ficou um número por unidade, como estava na página. Vale confirmar.
3. **Foto do hero.** O retrato da Dra. Marcelly veio de um post sazonal de Copa
   do Mundo (camisa da seleção, coroa de festa, fundo verde). Funciona, mas para
   uma home permanente o ideal é um retrato clínico com fundo neutro. A camisa
   também traz marcas de terceiros (CBF, Nike) — outro motivo para trocar quando
   houver uma foto própria.
4. **Endereço e data de abertura da unidade Boa Viagem**, para completar o card
   e ativar o WhatsApp e o mapa dela.
5. **Domínio.** `canonical` e `og:url` estão em `https://odontovip.com.br/` —
   ajustar para o domínio real antes de publicar.

## Publicação

Site estático: sobem `index.html` e `assets/`. Funciona em qualquer hospedagem
(Netlify, Vercel, Cloudflare Pages, GitHub Pages ou hospedagem comum via FTP).
Não há backend — os agendamentos vão direto para o WhatsApp.

Antes de publicar: revisar o item 5 acima e gerar um favicon `.ico`/`.png` em
32px e 180px a partir de `assets/img/odontovip-selo.png`.
