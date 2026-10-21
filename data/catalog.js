// Transcrição editorial das cinco capturas do catálogo fornecidas pelo cliente.
// A presença de um item nas capturas NÃO confirma disponibilidade ou preço atuais.
// Fotos associadas foram recebidas nesta conversa; não representam versões não identificadas.
const ENTRIES = [
  // Destaques com fotografias recebidas
  ['Sonic e Shadow luxo','herois','sonic-shadow','⚡',1],
  ['Barbie Movie 2023','tematicos','barbie-evento','💗',1],
  ['Hello Kitty','mascotes','hello-kitty','🎀',1],
  ['Stitch e Angel','mascotes','stitch-angel','💙',1],
  ['Cinderella','princesas','cinderela','✨',1],
  ['Guerreiras do K-pop','shows','guerreiras-kpop','🎤',1],
  ['Unicórnio','princesas','unicornio-fada','🦄',1],
  ['Homem Aranha','herois','homem-aranha','🕸',1],
  ['Prateados (animação de pista)','shows','prateados','✦',1],
  ['Fadas','princesas','sininho-evento','🧚',1],
  ['Mickey e Minnie luxo','mascotes','mickey-minnie','♥',1],
  ['Sonic','herois','sonic','⚡',1],
  ['Olaf luxo','mascotes','olaf','❄',1],
  ['Shadow','herois','shadow','⚡'],
  ['Homem-Aranha Miles Morales','herois','miles-morales','🕸'],
  ['Peter Pan e Sininho','princesas','sininho-peter','🧚'],
  // Primeira captura
  ['Doceira','shows',null,'🍭'],['Bobo da corte','shows',null,'🎭'],['Palhaço','shows',null,'🎪'],
  ['A Freira','tematicos',null,'🌙'],['Malévola','princesas',null,'🌘'],['Halloween','tematicos',null,'🎃'],
  ['Batman medieval','herois',null,'🦇'],['Aranha verso 2099','herois',null,'🕷'],
  ['Estação Candy','shows',null,'🍬'],['Ariel Live Action','princesas',null,'🐚'],['Spider Gwen','herois','spider-gwen','🕸'],
  ['Aurora','princesas',null,'👑'],['Alice no País das Maravilhas','princesas',null,'♣'],
  ['Visita de Natal Mickey e Minnie','tematicos',null,'🎄'],['Barbie Rock Star','tematicos',null,'🎸'],
  ['Coelho','mascotes',null,'🐰'],['Nick 365 (apresentadora humorista)','shows',null,'🎙'],
  // Segunda captura
  ['Moana','princesas',null,'🌺'],['Casa Mágica da Gaby','tematicos',null,'🐱'],
  ['Barbie boiadeira','tematicos','barbie-boiadeira','🤠'],['Minecraft','herois',null,'🟩'],
  ['Ansiedade','tematicos',null,'🧡'],['Round 6','tematicos',null,'◯'],
  ['Mickey e Minnie natalinos','tematicos',null,'🎅'],['Batman','herois',null,'🦇'],
  ['Grinch','tematicos',null,'🎄'],['Rapunzel','princesas',null,'🌼'],
  ['Bob Esponja','mascotes',null,'🧽'],['Frozen 2','princesas',null,'❄'],
  ['Branca de Neve','princesas',null,'🍎'],['Noelete','tematicos',null,'🎁'],
  ['Apresentação / pocket show / teatro','shows',null,'🎭'],['Deadpool','herois',null,'🔴'],
  ['Pomni Circo Digital','tematicos',null,'🎪'],
  // Terceira captura
  ['Luna','tematicos',null,'🌙'],['Turma da Mônica','mascotes',null,'🐇'],
  ['Hulk','herois','hulk','💚'],['Mário e Luigi','herois','mario-luigi','🍄'],
  ['Stitch','mascotes','stitch-angel','💙'],['Divertidamente','tematicos',null,'🎨'],
  ['Rei Leão','mascotes',null,'🦁'],['Bolofofos (Rick)','mascotes',null,'🐝'],
  ['Mickey e Minnie juninos','tematicos',null,'🌽'],['Homem de Ferro','herois',null,'🤖'],
  ['Bolofofos (Pow)','mascotes',null,'🐥'],['Ana Castela (dublê e presença)','shows',null,'🎵'],
  ['Recreação e oficinas','shows',null,'🎨'],['Galinha Pintadinha','mascotes',null,'🐓'],
  ['Masha e o Urso','mascotes',null,'🧸'],
  // Quarta captura
  ['Roblox','herois',null,'🎮'],['Fofão','mascotes',null,'⭐'],
  ['Bluey e Bingo','mascotes',null,'🐾'],['PJ Masks','herois',null,'🌟'],
  ['Boiadeirinha','tematicos',null,'🤠'],['Labubu','mascotes',null,'🧸'],
  ['Heróis','herois',null,'🦸'],['LOL','tematicos',null,'💖'],
  ['Patrulha Canina luxo','mascotes',null,'🐕'],['Capitão América','herois',null,'🛡'],
  ['Wandinha e Enid','tematicos',null,'🖤'],['Frozen','princesas',null,'❄'],
  ['Lady Bug e Cat','herois',null,'🐞'],['Bita','mascotes',null,'🎩'],
  ['Batman modelo novo','herois',null,'🦇'],['Ariel','princesas',null,'🧜'],
  // Quinta captura
  ['Pretador (animador de pista)','shows',null,'🎶'],['Barbie Dreams House','tematicos',null,'💕'],
  ['Mickey e Minnie rosa','mascotes',null,'💗'],['Canário Pistola','mascotes',null,'🐦'],
  ['Maria Clara e JP','tematicos','maria-clara-jp','🌟'],['Capivara','mascotes',null,'🦫'],
  ['Toy Story luxo','mascotes',null,'🚀'],['Mickey e Minnie noivos','tematicos',null,'💍'],
  ['Bella','princesas',null,'🌹'],['Minnie Princesa','princesas',null,'👑'],
  ['Mickey e Minnie Safari','tematicos',null,'🌴'],['Mickey e Minnie modelo Disney','mascotes',null,'♥']
];
const CATEGORIES={princesas:'Princesas & Fantasia',herois:'Heróis & Games',mascotes:'Mascotes & Fofuras',tematicos:'Temáticos & Cultura Pop',shows:'Shows & Experiências'};
const slugify=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const CATALOG=ENTRIES.map(([name,category,image,icon,featured],i)=>({
 id:slugify(name),name,category,categoryName:CATEGORIES[category],image:image?'/assets/'+image+'.webp':null,icon,
 featured:Boolean(featured),order:i,
 description: 'Uma opção do catálogo da Quimera Magic para consultar para a sua festa ou evento. Disponibilidade, configuração do personagem e valores devem ser confirmados com a equipe.'
}));
