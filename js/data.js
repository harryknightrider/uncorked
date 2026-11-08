/* ==========================================================================
   Uncorked: all game content lives here.
   Edit this file to change grapes, questions or levels. No code changes needed.
   UK English throughout.
   ========================================================================== */

/* ---------- The grapes ----------
   map.x = body (0 = light, 100 = full)
   map.y = character (0 = fruity, 100 = savoury)
*/
const GRAPES = [
  {
    id: 'pinotgrigio', name: 'Pinot Grigio', colour: 'white', emoji: '🍐',
    nickname: 'The Easy-Going One',
    personality: 'Never shouts, never offends. The friend who is happy to go wherever you fancy.',
    flavours: ['Lemon', 'Green apple', 'Pear'],
    body: 'Light', acidity: 'Medium', tannin: null, oak: 'Unoaked',
    places: 'Italy (Veneto). Called Pinot Gris in Alsace, France, where it is richer and spicier.',
    food: 'Light pasta, salads, seafood, nibbles',
    oneLiner: 'Light, lemony and easy. The safe, refreshing choice.',
    tryNext: [
      { name: 'Sauvignon Blanc', why: 'Just as fresh, with lots more flavour.' },
      { name: 'Chablis (unoaked Chardonnay)', why: 'Still crisp, with a little more body.' }
    ],
    map: { x: 14, y: 34 }, cellar: 'whites'
  },
  {
    id: 'sauvignon', name: 'Sauvignon Blanc', colour: 'white', emoji: '🌿',
    nickname: 'The Zesty One',
    personality: 'First on the dance floor. Loud, fresh and full of zing.',
    flavours: ['Gooseberry', 'Cut grass', 'Lime', 'Passion fruit'],
    body: 'Light to medium', acidity: 'High', tannin: null, oak: 'Usually unoaked',
    places: 'Sancerre (Loire Valley, France), Marlborough (New Zealand)',
    food: "Goat's cheese, salads, fish, anything with fresh herbs",
    oneLiner: 'Zingy, grassy, citrusy. Think New Zealand.',
    tryNext: [
      { name: 'Dry Riesling', why: 'The same mouth-watering zing, with lime and blossom.' },
      { name: 'Albariño', why: "Spain's crisp, citrusy, seaside-fresh white." }
    ],
    map: { x: 30, y: 18 }, cellar: 'whites'
  },
  {
    id: 'riesling', name: 'Riesling', colour: 'white', emoji: '🌸',
    nickname: 'The Aromatic One',
    personality: 'Perfumed, precise and a bit of a dark horse. Can be bone dry or dessert-sweet.',
    flavours: ['Lime', 'Green apple', 'Blossom', 'Honey (with age)'],
    body: 'Light', acidity: 'High', tannin: null, oak: 'Unoaked',
    places: 'Germany (Mosel), Alsace (France), Clare & Eden Valley (Australia)',
    food: 'Spicy Asian dishes, pork, smoked fish',
    oneLiner: 'Floral and limey with laser acidity. Check the label for sweetness.',
    tryNext: [
      { name: 'Sauvignon Blanc', why: 'Similar zesty freshness, but greener and grassier.' },
      { name: 'Pinot Gris from Alsace', why: 'A richer, spicier aromatic white.' }
    ],
    map: { x: 12, y: 10 }, cellar: 'whites'
  },
  {
    id: 'chardonnay', name: 'Chardonnay', colour: 'white', emoji: '🦎',
    nickname: 'The Chameleon',
    personality: 'Changes outfit depending on where it is grown and how it is made. Lean and crisp, or rich and creamy.',
    flavours: ['Green apple & lemon (cool)', 'Peach & pineapple (warm)', 'Vanilla, toast & butter (oaked)'],
    body: 'Medium to full', acidity: 'Medium to high', tannin: null, oak: 'Often oaked',
    places: 'Burgundy incl. Chablis (France), California, Australia',
    food: 'Roast chicken, creamy sauces, lobster, rich fish',
    oneLiner: 'Crisp and appley (Chablis) or rich, buttery and oaky. Ask which!',
    tryNext: [
      { name: 'Chenin Blanc', why: 'Apple and honey, and can be oaked or unoaked too.' },
      { name: 'Viognier', why: 'Rich, peachy and full-bodied, for oaky Chardonnay fans.' }
    ],
    map: { x: 66, y: 44 }, cellar: 'whites', labelLeft: true
  },
  {
    id: 'pinotnoir', name: 'Pinot Noir', colour: 'red', emoji: '🍒',
    nickname: 'The Delicate One',
    personality: 'Thin-skinned and a bit fussy, but silky, elegant and worth the effort.',
    flavours: ['Red cherry', 'Strawberry', 'Raspberry', 'Mushroom & earth (with age)'],
    body: 'Light', acidity: 'High', tannin: 'Low', oak: 'Sometimes',
    places: 'Burgundy (France), New Zealand, Oregon & California (USA)',
    food: 'Duck, salmon, mushrooms, roast chicken',
    oneLiner: 'Light, silky red with red cherry. Lovely slightly chilled.',
    tryNext: [
      { name: 'Beaujolais (Gamay)', why: 'Another light, juicy, low-tannin red.' },
      { name: 'Grenache / Garnacha', why: 'Soft red fruit, with a touch more body.' }
    ],
    map: { x: 26, y: 58 }, cellar: 'reds'
  },
  {
    id: 'merlot', name: 'Merlot', colour: 'red', emoji: '🫐',
    nickname: 'The Smooth Operator',
    personality: 'Soft, plump and easy to love. Gets on with everyone at the party.',
    flavours: ['Plum', 'Blackberry', 'Chocolate'],
    body: 'Medium to full', acidity: 'Medium', tannin: 'Medium, soft', oak: 'Often',
    places: 'Bordeaux, especially the Right Bank (France), Chile',
    food: 'Roast chicken, pork, burgers, pasta',
    oneLiner: 'Soft, plummy, smooth. The crowd-pleaser red.',
    tryNext: [
      { name: 'Malbec', why: 'Also soft and plummy, with a floral, violet twist.' },
      { name: 'Grenache / Garnacha', why: 'Juicy, ripe and gentle on the tannin.' }
    ],
    map: { x: 58, y: 24 }, cellar: 'reds'
  },
  {
    id: 'cabernet', name: 'Cabernet Sauvignon', colour: 'red', emoji: '🛡️',
    nickname: 'The Bold One',
    personality: 'Structured, serious and built to last. Thick skins mean lots of grip.',
    flavours: ['Blackcurrant', 'Cedar', 'Mint', 'Vanilla (from oak)'],
    body: 'Full', acidity: 'High', tannin: 'High', oak: 'Usually',
    places: 'Bordeaux, especially the Left Bank (France), Napa Valley (USA), Coonawarra (Australia)',
    food: 'Steak, roast lamb, hard cheeses',
    oneLiner: 'Big, blackcurranty and grippy. Made for steak.',
    tryNext: [
      { name: 'Syrah / Shiraz', why: 'Just as bold, with more spice and pepper.' },
      { name: 'Rioja Reserva (Tempranillo)', why: 'Full and oaky, with leather and dried fruit.' }
    ],
    map: { x: 88, y: 62 }, cellar: 'reds', labelLeft: true
  },
  {
    id: 'syrah', name: 'Syrah / Shiraz', colour: 'red', emoji: '🌶️',
    nickname: 'The Spicy One',
    personality: 'Two personalities, one grape: peppery and savoury in France, jammy and generous in Australia.',
    flavours: ['Black pepper', 'Blackberry', 'Smoke', 'Liquorice'],
    body: 'Full', acidity: 'Medium', tannin: 'Medium to high', oak: 'Often',
    places: 'Northern Rhône (France), Barossa Valley (Australia)',
    food: 'Barbecue, sausages, game, spiced dishes',
    oneLiner: 'Dark and full. Peppery (Syrah) or jammy (Shiraz).',
    tryNext: [
      { name: 'Malbec', why: 'Dark, rich and generous, but a little softer.' },
      { name: 'Grenache / Garnacha', why: 'Its blending partner in the Rhône. Riper and softer.' }
    ],
    map: { x: 80, y: 84 }, cellar: 'reds', labelLeft: true
  },

  /* --- Bonus grapes (Cellar 7). bonus: true keeps them apart from the core 8 --- */
  {
    id: 'malbec', name: 'Malbec', colour: 'red', emoji: '🌺', bonus: true,
    nickname: 'The Smooth Argentine',
    personality: 'Dark, plush and generous. Born in France, but found fame high in the Andes in Argentina.',
    flavours: ['Plum', 'Blackberry', 'Violet', 'Chocolate'],
    body: 'Full', acidity: 'Medium', tannin: 'Medium to high, but soft', oak: 'Often',
    places: 'Mendoza (Argentina), Cahors (France)',
    food: 'Steak, burgers, barbecue',
    oneLiner: 'Dark, plummy and velvety. The steak-night favourite.',
    tryNext: [
      { name: 'Australian Shiraz', why: 'Just as dark, plush and generous, with a peppery, spicy kick.' },
      { name: 'Chilean Carmenère', why: 'Like Malbec, a Bordeaux grape that found fame in South America. Soft and plummy, with a hint of green pepper, and often great value.' },
      { name: 'Rioja Crianza (Tempranillo)', why: 'Smooth and juicy, with a touch of vanilla from oak. A gentle step towards Europe.' }
    ],
    map: { x: 86, y: 44 }, cellar: 'bonus', labelLeft: true
  },
  {
    id: 'tempranillo', name: 'Tempranillo', colour: 'red', emoji: '🐂', bonus: true,
    nickname: 'The Spanish Classic',
    personality: 'Spain\'s star grape. Labels usually name the place (Rioja) rather than the grape, and words like Crianza and Reserva tell you how long it was aged.',
    flavours: ['Red cherry', 'Strawberry', 'Vanilla', 'Leather'],
    body: 'Medium to full', acidity: 'Medium', tannin: 'Medium', oak: 'Usually (often American oak: vanilla and coconut)',
    places: 'Rioja and Ribera del Duero (Spain)',
    food: 'Roast lamb, chorizo, tapas, Manchego',
    oneLiner: 'Cherry, vanilla and leather. Look for "Rioja" on the label.',
    tryNext: [
      { name: 'Chianti (Sangiovese)', why: 'Another savoury, food-loving European red, with more zing.' },
      { name: 'Garnacha (Grenache)', why: 'Spain\'s other big red: riper, juicier and softer.' }
    ],
    map: { x: 62, y: 74 }, cellar: 'bonus'
  },
  {
    id: 'sangiovese', name: 'Sangiovese', colour: 'red', emoji: '🍅', bonus: true,
    nickname: 'The Italian Foodie',
    personality: 'Tangy, savoury and made for the dinner table. The grape behind Chianti.',
    flavours: ['Sour cherry', 'Tomato leaf', 'Dried herbs', 'Earth'],
    body: 'Medium', acidity: 'High', tannin: 'Medium to high', oak: 'Sometimes',
    places: 'Tuscany (Italy): Chianti, Brunello di Montalcino',
    food: 'Pizza, tomato pasta, lasagne',
    oneLiner: 'Tangy cherry and herbs. Pizza and pasta\'s best friend.',
    tryNext: [
      { name: 'Rioja Crianza (Tempranillo)', why: 'Similar savoury cherry, but softer, with vanilla from oak.' },
      { name: 'Pinot Noir', why: 'Lighter and silkier, with the same red-cherry charm.' }
    ],
    map: { x: 44, y: 70 }, cellar: 'bonus', labelLeft: true
  },
  {
    id: 'grenache', name: 'Grenache', colour: 'red', emoji: '🍓', bonus: true,
    nickname: 'The Sun-Lover',
    personality: 'Loves heat and ripens fully, so it is juicy, soft and often quite strong. The heart of Côtes du Rhône, and of many rosés. Called Garnacha in Spain.',
    flavours: ['Strawberry', 'Raspberry', 'White pepper', 'Dried herbs'],
    body: 'Medium to full', acidity: 'Low to medium', tannin: 'Low to medium', oak: 'Sometimes',
    places: 'Southern Rhône (France), Spain (Garnacha), Australia',
    food: 'Sausages, casseroles, roast veg, barbecue',
    oneLiner: 'Juicy strawberry and spice. Soft, warm and easy to love.',
    tryNext: [
      { name: 'Syrah / Shiraz', why: 'Its Rhône partner: darker and more peppery.' },
      { name: 'Merlot', why: 'Just as soft and juicy, with plum instead of strawberry.' }
    ],
    map: { x: 74, y: 34 }, cellar: 'bonus'
  },
  {
    id: 'albarino', name: 'Albariño', colour: 'white', emoji: '🐚', bonus: true,
    nickname: 'The Seaside One',
    personality: 'Grown by the Atlantic in north-west Spain, it tastes fresh and zingy, with a hint of the sea.',
    flavours: ['Lemon', 'Peach', 'Grapefruit', 'A salty tang'],
    body: 'Light to medium', acidity: 'High', tannin: null, oak: 'Unoaked',
    places: 'Rías Baixas (Spain), Vinho Verde (Portugal, where it is called Alvarinho)',
    food: 'Seafood, grilled fish, tapas',
    oneLiner: 'Zesty, peachy and a little salty. Born for seafood.',
    tryNext: [
      { name: 'Sauvignon Blanc', why: 'Just as zingy, with grassy, green flavours.' },
      { name: 'Dry Riesling', why: 'Crisp and citrusy, with more floral perfume.' }
    ],
    map: { x: 24, y: 46 }, cellar: 'bonus', labelLeft: true
  },
  {
    id: 'gewurz', name: 'Gewürztraminer', colour: 'white', emoji: '🌹', bonus: true,
    nickname: 'The Perfumed One',
    personality: 'Impossible to miss: it smells like a bunch of roses and a bowl of lychees. Often off-dry, which makes it brilliant with spicy food.',
    flavours: ['Lychee', 'Rose', 'Ginger', 'Tropical fruit'],
    body: 'Medium to full', acidity: 'Low', tannin: null, oak: 'Unoaked',
    places: 'Alsace (France), Germany, New Zealand',
    food: 'Thai and Indian curries, Chinese takeaway, strong cheeses',
    oneLiner: 'Lychee and roses. The spicy-food lifesaver.',
    tryNext: [
      { name: 'Off-dry Riesling', why: 'Also great with spice, but zingier and less perfumed.' },
      { name: 'Pinot Gris from Alsace', why: 'Rich and gently spicy, but less flowery.' }
    ],
    map: { x: 52, y: 8 }, cellar: 'bonus'
  }
];

/* ---------- Questions ----------
   answer = index of the correct option.
   fixed: true keeps options in the written order (otherwise shuffled).
*/
const QUESTIONS = {
  /* --- The Basics --- */
  b1: { topic: 'basics', q: 'What turns grape juice into wine?',
        options: ['Yeast, which eats the sugar', 'Oak barrels', 'Adding sugar', 'Lots of sunshine'], answer: 0,
        why: 'Yeast eats the sugar in grape juice and turns it into alcohol and carbon dioxide. That is fermentation.' },
  b2: { topic: 'basics', q: "Where does a red wine's colour come from?",
        options: ['The grape skins', 'Red grape juice', 'Added colouring', 'The oak barrel'], answer: 0,
        why: "Nearly all grape juice is clear. Red wine gets its colour by fermenting with the dark skins." },
  b3: { topic: 'basics', q: 'A wine tastes of ripe fruit but has no sugar left in it. It is…',
        options: ['Dry', 'Sweet', 'Fortified', 'Sparkling'], answer: 0,
        why: "Fruity isn't the same as sweet! If the yeast has eaten all the sugar, the wine is dry, however fruity it tastes." },
  b4: { topic: 'basics', q: 'Which milk is most like a full-bodied wine?',
        options: ['Whole milk', 'Semi-skimmed', 'Skimmed'], answer: 0, fixed: true,
        why: 'Body is the weight of the wine in your mouth. Full-bodied wines feel rich and heavy, like whole milk.' },
  b5: { topic: 'basics', q: 'That drying, grippy feeling from some reds, like strong black tea, is called…',
        options: ['Tannin', 'Acidity', 'Alcohol', 'Sweetness'], answer: 0,
        why: 'Tannin comes from grape skins (and sometimes oak). It dries out your gums, just like stewed tea.' },
  b6: { topic: 'basics', q: 'How is most rosé made?',
        options: ['Red grapes with only a short time on their skins', 'Mixing red and white wine', 'Special pink grapes', 'Adding strawberry juice'], answer: 0,
        why: 'Most rosé is red grapes left on their skins for just a few hours, which is long enough to turn it pink.' },
  b7: { topic: 'basics', q: 'What makes a wine like Port "fortified"?',
        options: ['Extra alcohol (grape spirit) is added', 'It has bubbles', 'It is aged underground', 'It is made from dried grapes'], answer: 0,
        why: 'Fortified wines have grape spirit added. In Port, this stops fermentation early, so it stays sweet and strong.' },
  b8: { topic: 'basics', q: 'The mouth-watering, refreshing zing in a wine (like biting a lemon) is…',
        options: ['Acidity', 'Tannin', 'Body', 'Oak'], answer: 0,
        why: 'Acidity makes your mouth water. High-acid wines taste fresh and crisp.' },

  /* --- Dry or not? (fixed options) --- */
  d1: { topic: 'basics', q: 'A New Zealand Sauvignon Blanc bursting with passion fruit',
        options: ['Dry', 'Sweet', 'It depends'], answer: 0, fixed: true,
        why: 'Fruity flavours, not sugar! Nearly all Sauvignon Blanc is dry.' },
  d2: { topic: 'basics', q: 'A Sauternes from Bordeaux, served with pudding',
        options: ['Dry', 'Sweet', 'It depends'], answer: 1, fixed: true,
        why: 'Sauternes is a famous sweet wine. Its grapes are shrivelled by "noble rot", which concentrates their sugar.' },
  d3: { topic: 'basics', q: 'A big, jammy Australian Shiraz',
        options: ['Dry', 'Sweet', 'It depends'], answer: 0, fixed: true,
        why: 'Very ripe fruit can taste "sweet", but the sugar has been fermented away. It is dry.' },
  d4: { topic: 'basics', q: 'A glass of Port',
        options: ['Dry', 'Sweet', 'It depends'], answer: 1, fixed: true,
        why: 'Spirit is added before the yeast finishes, leaving natural grape sugar behind.' },
  d5: { topic: 'basics', q: 'A German Riesling',
        options: ['Dry', 'Sweet', 'It depends'], answer: 2, fixed: true,
        why: 'Riesling runs from bone dry to lusciously sweet. Look for "Trocken" (dry) on the label, or ask!' },
  d6: { topic: 'basics', q: 'An Argentinian Malbec',
        options: ['Dry', 'Sweet', 'It depends'], answer: 0, fixed: true,
        why: 'Like almost every red on a restaurant list, Malbec is dry.' },

  /* --- Meet the Whites --- */
  w1: { topic: 'whites', q: 'Which white is usually unoaked, zesty and grassy?',
        options: ['Sauvignon Blanc', 'Oaked Chardonnay', 'Pinot Grigio', 'Riesling'], answer: 0,
        why: 'Gooseberry, cut grass and lime. That is Sauvignon Blanc.' },
  w2: { topic: 'whites', q: 'A white smells of vanilla, toast and butter. It has probably been…',
        options: ['Aged in oak', 'Made from Riesling', 'Chilled too much', 'Made sparkling'], answer: 0,
        why: 'Oak barrels add vanilla, toast and creamy flavours. This is classic oaked Chardonnay.' },
  w3: { topic: 'whites', q: 'Chablis is made from which grape?',
        options: ['Chardonnay', 'Sauvignon Blanc', 'Pinot Grigio', 'Riesling'], answer: 0,
        why: 'Chablis is cool-climate Chardonnay from northern Burgundy. Crisp and appley, usually little or no new oak.' },
  w4: { topic: 'whites', q: 'Which grape can be anything from bone dry to very sweet?',
        options: ['Riesling', 'Sauvignon Blanc', 'Pinot Grigio', 'Chardonnay'], answer: 0,
        why: 'Riesling is made in every sweetness level, so it pays to check the label.' },
  w5: { topic: 'whites', q: 'You want something light, neutral and easy-going. Which white?',
        options: ['Pinot Grigio', 'Oaked Chardonnay', 'Barrel-aged white Burgundy', 'Sauternes'], answer: 0,
        why: 'Italian Pinot Grigio is light, lemony and gentle. A safe, refreshing pick.' },
  w6: { topic: 'whites', q: 'Pinot Grigio and Pinot Gris are…',
        options: ['The same grape', 'Rivals from different countries', 'A red and a white', 'Two types of oak'], answer: 0,
        why: 'Same grape, two names. Pinot Grigio (Italy) is usually lighter; Pinot Gris (Alsace) richer and spicier.' },
  w7: { topic: 'whites', q: 'Marlborough in New Zealand is world-famous for which grape?',
        options: ['Sauvignon Blanc', 'Riesling', 'Chardonnay', 'Pinot Grigio'], answer: 0,
        why: 'Marlborough Sauvignon Blanc, with its passion fruit and zing, made the grape a superstar.' },

  /* --- Meet the Reds --- */
  r1: { topic: 'reds', q: 'Which is the lightest-bodied red, with soft, silky tannins?',
        options: ['Pinot Noir', 'Cabernet Sauvignon', 'Syrah / Shiraz', 'Merlot'], answer: 0,
        why: 'Pinot Noir is pale, light and silky, with red cherry and strawberry.' },
  r2: { topic: 'reds', q: 'Blackcurrant, grippy tannins, often from Bordeaux or Napa. Which grape?',
        options: ['Cabernet Sauvignon', 'Pinot Noir', 'Merlot', 'Pinot Grigio'], answer: 0,
        why: "Blackcurrant is Cabernet Sauvignon's signature, and its thick skins give lots of tannin." },
  r3: { topic: 'reds', q: 'In Australia, the Syrah grape is usually called…',
        options: ['Shiraz', 'Malbec', 'Merlot', 'Grenache'], answer: 0,
        why: 'Same grape. Australian Shiraz tends to be riper and jammier than French Syrah.' },
  r4: { topic: 'reds', q: 'Soft, plummy, smooth, and the most planted grape in Bordeaux?',
        options: ['Merlot', 'Pinot Noir', 'Syrah', 'Cabernet Sauvignon'], answer: 0,
        why: 'Merlot is the soft, plummy heart of many Bordeaux blends, especially on the Right Bank.' },
  r5: { topic: 'reds', q: 'You fancy a red with black pepper and savoury, smoky notes. Pick…',
        options: ['Syrah from the Rhône', 'Pinot Noir from Burgundy', 'Chilean Merlot', 'Italian Pinot Grigio'], answer: 0,
        why: 'Cooler-climate Syrah, like the Northern Rhône, is famous for black pepper.' },

  /* --- Bonus grapes (Cellar 7) --- */
  x1: { topic: 'bonus', q: 'Pizza night with a tomato-rich margherita. Which red?',
        options: ['Chianti (Sangiovese)', 'Cabernet Sauvignon', 'Gewürztraminer', 'Sauternes'], answer: 0,
        why: 'Tomatoes are high in acid. Chianti\'s own zingy acidity keeps up, so the wine stays fresh and fruity.' },
  x2: { topic: 'bonus', q: 'Grilled prawns and squid by the sea. Which white?',
        options: ['Albariño', 'Oaked Chardonnay', 'Port', 'Malbec'], answer: 0,
        why: 'Albariño is zesty and a little salty: made for seafood.' },
  x3: { topic: 'bonus', q: 'A takeaway Thai red curry with plenty of heat. Which bottle?',
        options: ['Gewürztraminer', 'Cabernet Sauvignon', 'Rioja Gran Reserva', 'A 15% Barossa Shiraz'], answer: 0,
        why: 'Aromatic, often off-dry and not too strong, Gewürztraminer cools the chilli instead of fanning the flames.' },
  x4: { topic: 'bonus', q: 'You always order Malbec. Which is a similar but new choice?',
        options: ['Australian Shiraz', 'Pinot Grigio', 'Prosecco', 'Sauvignon Blanc'], answer: 0,
        why: 'Shiraz is just as dark, plush and generous, with extra spice.' },
  x5: { topic: 'bonus', q: 'On a Spanish wine list you see "Rioja Reserva". What does "Reserva" tell you?',
        options: ['It was aged for longer, including time in oak', 'It is sweet', 'It is a white wine', 'It comes from Argentina'], answer: 0,
        why: 'Crianza, Reserva and Gran Reserva mean more and more ageing, which brings vanilla, leather and softer tannins.' },
  x6: { topic: 'bonus', q: 'Malbec is most famous from which country?',
        options: ['Argentina', 'Italy', 'Germany', 'New Zealand'], answer: 0,
        why: 'Mendoza, high in the Andes, made Malbec a star.' },
  x7: { topic: 'bonus', q: 'Chianti is made mainly from which grape?',
        options: ['Sangiovese', 'Tempranillo', 'Grenache', 'Merlot'], answer: 0,
        why: 'Chianti is in Tuscany, and Tuscany\'s grape is Sangiovese.' },
  x8: { topic: 'bonus', q: 'Which grape smells strongly of lychee and roses?',
        options: ['Gewürztraminer', 'Albariño', 'Chardonnay', 'Sauvignon Blanc'], answer: 0,
        why: 'That unmistakable perfume is Gewürztraminer\'s calling card.' },
  x9: { topic: 'bonus', q: 'Rioja is made mainly from which grape?',
        options: ['Tempranillo', 'Malbec', 'Pinot Noir', 'Sangiovese'], answer: 0,
        why: 'Tempranillo is Spain\'s star red, and the backbone of Rioja.' },
  x10: { topic: 'bonus', q: 'Côtes du Rhône reds are usually based on which soft, juicy grape?',
        options: ['Grenache', 'Pinot Noir', 'Cabernet Sauvignon', 'Malbec'], answer: 0,
        why: 'Southern Rhône reds lean on sun-loving Grenache, often with some Syrah.' },
  x11: { topic: 'bonus', q: 'Albariño comes mainly from which country?',
        options: ['Spain', 'Australia', 'Germany', 'Chile'], answer: 0,
        why: 'Rías Baixas in north-west Spain, right on the Atlantic coast.' },

  /* --- Taste-alike (If you like… try…) --- */
  t1: { topic: 'reds', q: "You love Merlot's soft, plummy style. What should you try next?",
        options: ['Malbec', 'Pinot Grigio', 'Riesling', 'Sauvignon Blanc'], answer: 0,
        why: 'Malbec is also soft, plummy and generous, with a lovely violet twist.' },
  t2: { topic: 'reds', q: 'You like light, juicy Pinot Noir. Which is a similar red to explore?',
        options: ['Beaujolais (Gamay)', 'Barossa Shiraz', 'Cabernet Sauvignon', 'Port'], answer: 0,
        why: "Beaujolais is light, juicy and low in tannin. It's Pinot Noir's fun-loving neighbour." },
  t3: { topic: 'reds', q: 'You enjoy big, bold Cabernet Sauvignon. A similar step sideways?',
        options: ['Australian Shiraz', 'Beaujolais', 'Pinot Grigio', 'Prosecco'], answer: 0,
        why: 'Shiraz is just as full-bodied and dark, with added spice.' },
  t4: { topic: 'whites', q: 'Your friend only drinks Sauvignon Blanc. What might tempt them to try something new?',
        options: ['A dry Riesling', 'A glass of Port', 'A Barossa Shiraz', 'A sweet Sauternes'], answer: 0,
        why: 'Dry Riesling has the same mouth-watering zing, with lime and blossom instead of grass.' },

  /* --- Real-world scenarios (final test) --- */
  s1: { topic: 'scenario', q: "It's steak night. The list has Pinot Grigio, Prosecco, Cabernet Sauvignon and Riesling. You order…",
        options: ['Cabernet Sauvignon', 'Pinot Grigio', 'Prosecco', 'Riesling'], answer: 0,
        why: 'Big, tannic reds love red meat. The protein and fat soften the tannin.' },
  s2: { topic: 'scenario', q: "You're having a fairly spicy Thai green curry. Best bet?",
        options: ['An off-dry Riesling', 'A high-alcohol, oaky Shiraz', 'A tannic Cabernet Sauvignon', 'An oaky Chardonnay'], answer: 0,
        why: 'Chilli makes alcohol and tannin burn. A lower-alcohol wine with a touch of sweetness cools things down.' },
  s3: { topic: 'scenario', q: "Lunch is a goat's cheese salad. Which glass?",
        options: ['Sancerre (Sauvignon Blanc)', 'Barossa Shiraz', 'Port', 'Cabernet Sauvignon'], answer: 0,
        why: "A classic match. The wine's zingy acidity goes with tangy goat's cheese and fresh leaves." },
  s4: { topic: 'scenario', q: 'Your date says, "I don\'t like oaky wine." Which white is the safest bet?',
        options: ['Sauvignon Blanc', 'Barrel-fermented Chardonnay', 'Oaked Californian Chardonnay', 'Oak-aged white Rioja'], answer: 0,
        why: 'Sauvignon Blanc is usually made without oak, so it is fresh and fruity, with no vanilla.' },
  s5: { topic: 'scenario', q: 'You want a red to go with salmon or roast chicken without overpowering it.',
        options: ['Pinot Noir', 'Cabernet Sauvignon', 'Barossa Shiraz', 'Port'], answer: 0,
        why: 'Light-bodied, low-tannin Pinot Noir goes with lighter dishes, matching weight with weight.' },
  s6: { topic: 'scenario', q: 'You ask for "something dry and crisp, not too oaky." The waiter will probably bring…',
        options: ['Sauvignon Blanc', 'Barossa Shiraz', 'Port', 'Sauternes'], answer: 0,
        why: 'Dry + crisp + unoaked = Sauvignon Blanc (or Pinot Grigio). You just ordered like a pro.' },
  s7: { topic: 'scenario', q: 'In the supermarket: you loved a Chilean Merlot last week. Which is a similar but new choice?',
        options: ['Argentinian Malbec', 'German Riesling', 'Italian Pinot Grigio', 'Prosecco'], answer: 0,
        why: 'Malbec is soft, fruity and plummy like Merlot, so it is an easy step into something new.' },
  s8: { topic: 'scenario', q: 'The bottle says "Chablis". What should you expect?',
        options: ['Crisp, dry Chardonnay with green apple', 'A sweet dessert wine', 'A light red', 'Something sparkling'], answer: 0,
        why: 'Chablis is cool-climate Chardonnay: dry, crisp and appley.' },
  s9: { topic: 'scenario', q: 'You want a German Riesling that is NOT sweet. Which word should you look for on the label?',
        options: ['Trocken', 'Beerenauslese', 'Eiswein'], answer: 0, fixed: true,
        why: '"Trocken" means dry. Beerenauslese and Eiswein are luscious sweet wines.' },
  s10: { topic: 'scenario', q: 'Friends are coming for burgers and you need a crowd-pleasing red. Which?',
         options: ['Merlot', 'Sauternes', 'Port', 'Pinot Grigio'], answer: 0,
         why: 'Soft, fruity, medium-to-full Merlot goes with burgers and pleases almost everyone.' },
  s11: { topic: 'scenario', q: "You're served a full-bodied red. The tannin is very drying and grippy on its own. What would help?",
         options: ['Eating it with a juicy steak', 'Eating it with chocolate pudding', 'Adding ice', 'Drinking it faster'], answer: 0,
         why: 'Protein and fat in meat soften tannin, so the wine tastes smoother.' },
  s12: { topic: 'scenario', q: 'You want a white for a creamy chicken dish. Which style matches the richness?',
         options: ['An oaked Chardonnay', 'A light Pinot Grigio', 'A sweet Riesling', 'A light Pinot Noir'], answer: 0,
         why: 'Match weight with weight. A rich, creamy dish suits a fuller, oaked white.' },

  /* --- Hot vs Cold: climate, oak and bubbles --- */
  o1: { topic: 'climate', q: 'Smells of vanilla, toast and coconut',
        options: ['Oaked', 'Unoaked'], answer: 0, fixed: true,
        why: 'Vanilla, toast and coconut are classic oak flavours from the barrel.' },
  o2: { topic: 'climate', q: 'Pure, crisp lime and green apple, and nothing else',
        options: ['Oaked', 'Unoaked'], answer: 1, fixed: true,
        why: "Fresh fruit with no vanilla or toast means it probably hasn't seen oak." },
  o3: { topic: 'climate', q: 'Round and creamy, with toast and a hint of smoke',
        options: ['Oaked', 'Unoaked'], answer: 0, fixed: true,
        why: 'Oak adds toasty, smoky flavours and a rounder, creamier texture.' },
  o4: { topic: 'climate', q: 'A zingy Marlborough Sauvignon Blanc',
        options: ['Oaked', 'Unoaked'], answer: 1, fixed: true,
        why: 'Winemakers keep Sauvignon Blanc away from oak to protect its fresh, zesty fruit.' },
  o5: { topic: 'climate', q: 'A Rioja Reserva with vanilla and sweet spice',
        options: ['Oaked', 'Unoaked'], answer: 0, fixed: true,
        why: '"Reserva" means extra ageing. In Rioja that is traditionally in oak, which gives vanilla and spice.' },
  c1: { topic: 'climate', q: 'Grapes from a cool climate usually make wine that is…',
        options: ['Lighter, with higher acidity and less alcohol', 'Fuller and jammier', 'Always sweet', 'Always red'], answer: 0,
        why: 'Cool places ripen grapes slowly. You get less sugar (so less alcohol), more acidity and fresher, greener fruit.' },
  c2: { topic: 'climate', q: 'Grapes from a warm, sunny climate usually make wine that is…',
        options: ['Fuller-bodied and riper, with more alcohol', 'Lighter, with green fruit', 'Higher in acidity', 'Always sparkling'], answer: 0,
        why: 'Lots of sunshine means riper grapes with more sugar, which gives more alcohol, fuller body and tropical or jammy fruit.' },
  c3: { topic: 'climate', q: 'Which flavour is the big giveaway for oak?',
        options: ['Vanilla', 'Gooseberry', 'Lime', 'Strawberry'], answer: 0,
        why: 'Vanilla (and toast, smoke and coconut) comes from oak barrels, not from the grape.' },
  c4: { topic: 'climate', q: 'A Chardonnay tastes of ripe pineapple and peach. It is probably from…',
        options: ['A warm place like California', 'Chablis in cool northern France', 'A cold cellar', 'Germany'], answer: 0,
        why: 'Warmth turns Chardonnay\'s fruit from green apple and lemon (cool) to peach and pineapple (warm).' },
  c5: { topic: 'climate', q: 'Prosecco usually gets its bubbles from a second fermentation…',
        options: ['In a big sealed tank', 'In each individual bottle', 'In oak barrels', 'Out in the vineyard'], answer: 0,
        why: 'The tank method keeps Prosecco fresh, fruity and light, with pear and apple flavours.' },
  c6: { topic: 'climate', q: 'Where do Champagne\'s toasty, biscuity flavours come from?',
        options: ['Second fermentation and ageing in the bottle with the yeast', 'Burnt grapes', 'Added sugar', 'Plastic corks'], answer: 0,
        why: 'Champagne (and Cava) has its second fermentation in the bottle, then ages on the spent yeast. That gives bread and biscuit notes.' },
  c7: { topic: 'climate', q: 'Why is a German Riesling often lighter and lower in alcohol than an Australian Shiraz?',
        options: ['Germany is cooler, so the grapes have less sugar', 'Germans add water', 'Riesling is always sweet', 'Shiraz is fortified'], answer: 0,
        why: 'Cooler climate means less ripeness and sugar, which means less alcohol and a lighter body.' },

  /* --- Dinner Party: food and wine --- */
  p1: { topic: 'pairing', q: 'You eat something sweet, then sip a dry wine. The wine now tastes…',
        options: ['More sour and bitter', 'Sweeter', 'Exactly the same', 'Fruitier'], answer: 0,
        why: 'Sweetness in food makes wine taste more acidic and bitter, and less fruity. That is why puddings need sweet wines.' },
  p2: { topic: 'pairing', q: 'Salty food makes a wine taste…',
        options: ['Smoother and fruitier', 'More bitter', 'More acidic', 'More alcoholic'], answer: 0,
        why: 'Salt is wine\'s friend. It softens acidity and bitterness, so the wine feels smoother.' },
  p3: { topic: 'pairing', q: 'Chilli heat makes the alcohol in a wine…',
        options: ['Burn more', 'Disappear', 'Taste sweeter', 'Turn sparkling'], answer: 0,
        why: 'Chilli and high alcohol make each other hotter. Choose lower-alcohol, fruity or off-dry wines with spicy food.' },
  p4: { topic: 'pairing', q: 'Which food softens a big, grippy red?',
        options: ['A juicy steak', 'Chocolate cake', 'A hot chilli', 'Lemon sorbet'], answer: 0,
        why: 'Protein and fat soften tannin. Hello, steak and Cabernet!' },
  p5: { topic: 'pairing', q: 'The golden rule for puddings is that the wine should be…',
        options: ['At least as sweet as the pudding', 'Bone dry', 'A big red', 'Very cold, whatever it is'], answer: 0,
        why: 'If the pudding is sweeter than the wine, the wine tastes thin and sour.' },
  p6: { topic: 'pairing', q: 'Umami-rich food (mushrooms, soy, Parmesan) makes wine taste…',
        options: ['More bitter and drying', 'Sweeter', 'Fruitier', 'Lower in alcohol'], answer: 0,
        why: 'Umami works like sweetness. It makes tannin and acidity stand out, so pick softer, fruitier wines.' },
  p7: { topic: 'pairing', q: 'A dish with lots of lemon or vinegar needs a wine that is…',
        options: ['High in acidity', 'Low in acidity', 'Fortified', 'Very oaky'], answer: 0,
        why: 'Acidic food makes a low-acid wine taste flat and flabby. Match acid with acid.' },
  p8: { topic: 'pairing', q: 'A light summer salad is best with…',
        options: ['A light white like Pinot Grigio', 'A full-bodied Shiraz', 'Port', 'An oaky Cabernet'], answer: 0,
        why: 'Match weight with weight. Light food goes with light wine.' },

  /* --- Serve It Right --- */
  f1: { topic: 'serving', q: 'Your wine smells musty, like damp cardboard or a wet dog. What\'s going on?',
        options: ['It\'s "corked", a fault', 'It\'s meant to smell like that', 'It\'s too cold', 'It\'s been aged in oak'], answer: 0,
        why: 'That musty smell (and dull fruit) is cork taint. It is fine to politely send it back.' },
  f2: { topic: 'serving', q: 'There are little bits of cork floating in your glass. Is the wine "corked"?',
        options: ['No, just fish them out', 'Yes, send it back at once'], answer: 0, fixed: true,
        why: '"Corked" means a musty smell, not crumbs of cork. Bits of cork are harmless.' },
  f3: { topic: 'serving', q: 'The waiter pours you a little to taste. What are you checking?',
        options: ['That it isn\'t faulty, and it\'s at the right temperature', 'Whether you love it', 'How strong it is', 'The price'], answer: 0,
        why: 'The taste is a quick fault check. A sniff for mustiness is all you need, then a nod!' },
  f4: { topic: 'serving', q: 'What\'s the safest way to open a bottle of fizz?',
        options: ['Hold the cork, twist the bottle and ease it out', 'Pop it like a racing driver', 'Use a corkscrew', 'Give it a good shake first'], answer: 0,
        why: 'Keep a hand on the cork, point it away from people, and turn the bottle slowly. You want a gentle sigh, not a bang.' },
  f5: { topic: 'serving', q: 'How should you store unopened bottles with corks?',
        options: ['On their side, somewhere cool and dark', 'Upright next to the oven', 'On a sunny windowsill', 'In the freezer'], answer: 0,
        why: 'Lying down keeps the cork moist. Cool, dark and steady keeps the wine fresh.' },
  v1: { topic: 'serving', q: 'Which of these should be served the coldest?',
        options: ['A sweet wine like Sauternes', 'Cabernet Sauvignon', 'Pinot Noir', 'An oaked Chardonnay'], answer: 0,
        why: 'Sweet wines are served well chilled (6–8°C) to keep them fresh, not sickly.' },
  v2: { topic: 'serving', q: 'Full-bodied reds like Cabernet Sauvignon taste best at…',
        options: ['Room temperature, 15–18°C', 'Straight from the fridge', 'About 25°C, nice and warm', 'With ice'], answer: 0,
        why: 'Room temperature means a cool room, not next to the radiator. Too warm and the alcohol takes over.' },
  v3: { topic: 'serving', q: 'Serving a white wine far too cold will…',
        options: ['Hide its flavours', 'Make it sweeter', 'Make it fizzy', 'Increase the alcohol'], answer: 0,
        why: 'Cold mutes aroma and flavour. Great for cheap fizz, a shame for a good Chardonnay.' },
  v4: { topic: 'serving', q: 'An opened bottle of still wine keeps best…',
        options: ['Re-corked in the fridge, drunk within a few days', 'On the side for a month', 'In a warm cupboard', 'With the cork left out'], answer: 0,
        why: 'Air slowly spoils wine. Cork it, chill it (reds too) and finish it within 2–3 days.' },
  v5: { topic: 'serving', q: 'The UK low-risk guideline is no more than how many units a week?',
        options: ['14', '28', '21', 'There\'s no guideline'], answer: 0,
        why: 'No more than 14 units a week, spread over three or more days, with some drink-free days.' },
  v6: { topic: 'serving', q: 'Roughly how many units are in a 175ml glass of 13% wine?',
        options: ['About 2.3', 'About 1', 'About 5', 'About 0.5'], answer: 0,
        why: 'Units = strength (%) × volume (ml) ÷ 1000. So 13 × 175 ÷ 1000 ≈ 2.3. A whole bottle is nearly 10 units.' },
  v7: { topic: 'serving', q: 'A light red like Pinot Noir is lovely served…',
        options: ['Lightly chilled, about 13°C', 'Ice cold', 'Warm, about 25°C', 'Frozen into a slushie'], answer: 0,
        why: 'Twenty minutes in the fridge brings out the fresh red fruit of light reds.' }
};

/* ---------- The Cellars (levels) ---------- */
const CELLARS = [
  {
    id: 'basics', num: 1, title: 'The Basics', emoji: '🍷',
    blurb: 'Colour, sweetness, body and tannin. Learn the words on every wine list.',
    badge: { emoji: '🥂', name: 'First Sip' },
    steps: [
      { type: 'learn', title: 'The 60-second story', cards: [
        { emoji: '🍇', title: 'Wine is fermented grapes',
          text: 'Crush grapes, and yeast eats the natural sugar in the juice, turning it into <b>alcohol</b> and <b>carbon dioxide</b>. That\'s fermentation. Everything else is detail!' },
        { emoji: '🎨', title: 'Colour comes from the skins',
          text: 'Nearly all grape juice is clear. <b>White</b> wine is made from the juice. <b>Red</b> ferments with dark skins. <b>Rosé</b> gets just a few hours of skin contact, so it turns pink.' },
        { emoji: '🫧', title: 'Still, sparkling or fortified',
          text: '<b>Still</b>: no bubbles (most wine). <b>Sparkling</b>: bubbles trapped from a second fermentation (Champagne, Prosecco, Cava). <b>Fortified</b>: grape spirit added for extra strength (Port, Sherry).' },
        { emoji: '🍬', title: 'Sweetness: fruity ≠ sweet',
          text: 'Most wines are <b>dry</b>, meaning the yeast ate all the sugar. A wine can taste of ripe fruit and still be completely dry. Sweet wines have sugar left in them.' },
        { emoji: '🥛', title: 'Body is like milk',
          text: '<b>Light</b>-bodied = skimmed. <b>Medium</b> = semi-skimmed. <b>Full</b>-bodied = whole milk. It is how heavy the wine feels in your mouth. More alcohol and ripeness = fuller body.' },
        { emoji: '🍋', title: 'Acidity and tannin',
          text: '<b>Acidity</b> makes your mouth water, like biting a lemon. It makes wine taste fresh. <b>Tannin</b> is the drying, grippy feel from red grape skins, like strong black tea.' }
      ]},
      { type: 'sort', title: 'Sort the Shelf', intro: 'Pop each wine on the right shelf: light, medium or full-bodied?',
        categories: ['Light', 'Medium', 'Full'],
        items: [
          { label: 'Italian Pinot Grigio', answer: 'Light', why: 'Light, lemony and delicate. Skimmed milk.' },
          { label: 'Prosecco', answer: 'Light', why: 'Light, fresh and bubbly.' },
          { label: 'Burgundy Pinot Noir', answer: 'Light', why: 'Pale, silky and light for a red.' },
          { label: 'Chilean Merlot', answer: 'Medium', why: 'Soft and plummy, right in the middle (and sometimes fuller).' },
          { label: 'Oaked Californian Chardonnay', answer: 'Full', why: 'Warm sunshine plus oak = rich and full. Proof that whites can be full-bodied!' },
          { label: 'Napa Cabernet Sauvignon', answer: 'Full', why: 'Big, ripe, tannic and full.' },
          { label: 'Barossa Shiraz', answer: 'Full', why: 'Warm-climate Shiraz is ripe, rich and full.' }
        ]},
      { type: 'mcq', title: 'Dry or Not?', intro: 'Dry, sweet, or does it depend? Don\'t let fruity flavours fool you.',
        questions: ['d1', 'd3', 'd2', 'd6', 'd4', 'd5'] },
      { type: 'recall', title: 'Quick recall', intro: 'Five quick questions to lock it in.',
        questions: ['b1', 'b2', 'b3', 'b4', 'b5'] }
    ]
  },
  {
    id: 'whites', num: 2, title: 'Meet the Whites', emoji: '🥂',
    blurb: 'Four white grapes that cover a huge chunk of any wine list.',
    badge: { emoji: '🍋', name: 'Crisp Customer' },
    grapes: ['pinotgrigio', 'sauvignon', 'riesling', 'chardonnay'],
    steps: [
      { type: 'learn', title: 'Meet the characters', grapeCards: ['pinotgrigio', 'sauvignon', 'riesling', 'chardonnay'],
        cards: [
          { emoji: '🥂', title: 'Four whites to know',
            text: 'Learn these four personalities and you\'ll recognise most whites on a list. Watch for <b>acidity</b> (zing), <b>body</b> (weight) and <b>oak</b> (vanilla and toast).' }
        ]},
      { type: 'whoami', title: 'Who Am I?', intro: 'Guess the grape from the clues. The fewer clues you need, the more corks you win.',
        rounds: [
          { answer: 'sauvignon', clues: ['I\'m almost never put in oak.', 'People say I smell of cut grass and gooseberries.', 'I\'m famous in Sancerre, in France\'s Loire Valley.', 'Marlborough in New Zealand made me a superstar.'] },
          { answer: 'chardonnay', clues: ['I\'m a chameleon: lean and crisp, or rich and creamy.', 'Winemakers love to age me in oak, for vanilla and toast.', 'I\'m the white grape of Burgundy.', 'Chablis is made from me.'] },
          { answer: 'riesling', clues: ['I\'m super aromatic: think blossom and lime.', 'My acidity is so high I can age for decades.', 'I can be bone dry or dessert-sweet, so check my label.', 'Germany is my spiritual home.'] },
          { answer: 'pinotgrigio', clues: ['I\'m light and easy-going. I rarely shout.', 'Lemon, green apple and pear are my thing.', 'In Alsace I go by a different name and get richer.', 'I\'m Italy\'s best-known easy-drinking white.'] }
        ], choices: ['pinotgrigio', 'sauvignon', 'riesling', 'chardonnay'] },
      { type: 'sort', title: 'Which White?', intro: 'Match each tasting note to its grape.',
        categories: ['Pinot Grigio', 'Sauvignon Blanc', 'Riesling', 'Chardonnay'],
        items: [
          { label: 'Gooseberry & freshly cut grass', answer: 'Sauvignon Blanc', why: 'The classic Sauvignon Blanc smell.' },
          { label: 'Vanilla, toast & butter', answer: 'Chardonnay', why: 'Oaked Chardonnay. Oak adds the vanilla and toast.' },
          { label: 'Lime, blossom & laser-sharp acidity', answer: 'Riesling', why: 'Aromatic and zingy. Pure Riesling.' },
          { label: 'Light, lemony, a hint of pear', answer: 'Pinot Grigio', why: 'Gentle, neutral and refreshing.' },
          { label: 'Crisp green apple from Chablis', answer: 'Chardonnay', why: 'Unoaked, cool-climate Chardonnay. The chameleon again!' },
          { label: 'Passion fruit from Marlborough', answer: 'Sauvignon Blanc', why: 'New Zealand Sauvignon Blanc is famous for tropical zing.' }
        ]},
      { type: 'recall', title: 'Quick recall', intro: 'Five quick questions to lock it in.',
        questions: ['w1', 'w2', 'w3', 'w4', 'w5'] }
    ]
  },
  {
    id: 'reds', num: 3, title: 'Meet the Reds', emoji: '🍷',
    blurb: 'From silky Pinot Noir to bold Cabernet: four reds to know.',
    badge: { emoji: '🍒', name: 'Red Alert' },
    grapes: ['pinotnoir', 'merlot', 'cabernet', 'syrah'],
    steps: [
      { type: 'learn', title: 'Meet the characters', grapeCards: ['pinotnoir', 'merlot', 'cabernet', 'syrah'],
        cards: [
          { emoji: '🍷', title: 'Four reds to know',
            text: 'These four run from <b>light and silky</b> to <b>big and grippy</b>. Watch for <b>body</b> and <b>tannin</b>, the drying, black-tea feeling.' }
        ]},
      { type: 'order', title: 'Line Up', intro: 'Tap the reds in order, from lightest to fullest body.',
        items: ['Pinot Noir', 'Merlot', 'Cabernet Sauvignon'],
        why: 'Pinot Noir is light and silky. Merlot is soft and medium to full. Cabernet Sauvignon is full, with lots of tannin.' },
      { type: 'whoami', title: 'Who Am I?', intro: 'Guess the grape from the clues. The fewer clues you need, the more corks you win.',
        rounds: [
          { answer: 'pinotnoir', clues: ['I\'m thin-skinned and fussy to grow.', 'I\'m pale in the glass, with soft, silky tannins.', 'Red cherry and strawberry, turning earthy with age.', 'Red Burgundy is made from me.'] },
          { answer: 'cabernet', clues: ['My skins are thick, so I\'m full of tannin.', 'Blackcurrant is my signature, often with cedar or mint.', 'I love oak and can age for decades.', 'I star on Bordeaux\'s Left Bank and in Napa Valley.'] },
          { answer: 'syrah', clues: ['I\'m full-bodied and dark.', 'In cooler places I smell of black pepper.', 'In warm Australia I\'m rich and jammy.', 'Australians call me by a different name.'] },
          { answer: 'merlot', clues: ['I\'m smooth, soft and easy to love.', 'Plums, blackberries and a hint of chocolate.', 'I\'m the most planted grape in Bordeaux.', 'I\'m Chile\'s go-to crowd-pleaser.'] }
        ], choices: ['pinotnoir', 'merlot', 'cabernet', 'syrah'] },
      { type: 'mcq', title: 'Taste-Alikes', intro: 'If you like this… you might like that. Pick the best next bottle.',
        questions: ['t1', 't2', 't3', 't4'] },
      { type: 'recall', title: 'Quick recall', intro: 'Five quick questions to lock it in.',
        questions: ['r1', 'r2', 'r3', 'r4', 'r5'] }
    ]
  },
  {
    id: 'climate', num: 4, title: 'Hot vs Cold', emoji: '☀️',
    blurb: 'How sunshine, oak and bubbles change what is in your glass.',
    badge: { emoji: '🌍', name: 'Globetrotter' },
    steps: [
      { type: 'learn', title: 'The 60-second story', cards: [
        { emoji: '🌡️', title: 'Climate shapes the taste',
          text: '<b>Cool climate:</b> grapes ripen slowly, giving <b>lighter</b> body, <b>higher acidity</b>, less alcohol and fresh fruit (green apple, lemon, red cherry).<br><br><b>Warm climate:</b> riper grapes give <b>fuller</b> body, <b>more alcohol</b>, softer acidity and riper fruit (peach, pineapple, jammy blackberry).' },
        { emoji: '🗺️', title: 'Cool spots and sunny spots',
          text: '<b>Cooler:</b> Chablis, Champagne, the Loire, Germany, New Zealand.<br><b>Warmer:</b> the Barossa Valley in Australia, California, much of Chile, southern Italy and Spain.<br><br>Not sure? A higher % alcohol on the label is a good clue to sunshine.' },
        { emoji: '🦎', title: 'Same grape, two outfits',
          text: '<b>Chardonnay</b> from cool Chablis tastes of green apple and lemon. From sunny California it tastes of peach and pineapple.<br><br><b>Syrah</b> from the cooler Rhône is peppery. As Barossa <b>Shiraz</b> it is ripe and jammy.' },
        { emoji: '🛢️', title: 'Oak: the spice rack',
          text: 'Ageing or fermenting in oak barrels adds <b>vanilla, toast, smoke, coconut and sweet spice</b>, plus a rounder, creamier feel. New barrels add more flavour than old ones.<br><br>Smell vanilla? Think oak.' },
        { emoji: '🫧', title: 'How the bubbles get in',
          text: 'Sparkling wine has a <b>second fermentation</b> with the gas trapped inside.<br><b>In the bottle</b> (Champagne, Cava): toasty, biscuity and fine bubbles.<br><b>In a big tank</b> (Prosecco): fresh, fruity, with pear and apple.' }
      ]},
      { type: 'sort', title: 'Pick the Climate', intro: 'Cool or warm? Read the tasting note and pick where the grapes probably grew.',
        categories: ['Cool climate', 'Warm climate'],
        items: [
          { label: 'Zingy acidity, green apple & lemon', answer: 'Cool climate', why: 'High acid and green fruit mean slow, gentle ripening.' },
          { label: 'Ripe pineapple & peach', answer: 'Warm climate', why: 'Tropical fruit needs plenty of sunshine.' },
          { label: 'Jammy blackberry, 15% alcohol', answer: 'Warm climate', why: 'Very ripe grapes have more sugar, so more alcohol.' },
          { label: 'Light body, crisp, 11.5% alcohol', answer: 'Cool climate', why: 'Less sugar in the grapes means lower alcohol and a lighter wine.' },
          { label: 'Red cherry & black pepper, lighter body', answer: 'Cool climate', why: 'Fresh red fruit and pepper are signs of a cooler spot.' },
          { label: 'Rich, full-bodied, soft acidity', answer: 'Warm climate', why: 'Heat ripens grapes fully, so acidity drops and body builds.' }
        ]},
      { type: 'mcq', title: 'Oak or No Oak?', intro: 'Read the description. Has this wine spent time in oak?',
        questions: ['o1', 'o2', 'o4', 'o3', 'o5'] },
      { type: 'recall', title: 'Quick recall', intro: 'Five quick questions to lock it in.',
        questions: ['c1', 'c2', 'c3', 'c4', 'c5'] }
    ]
  },
  {
    id: 'dinner', num: 5, title: 'Dinner Party', emoji: '🍽️',
    blurb: 'Food and wine pairing, made simple. A few rules and you are sorted.',
    badge: { emoji: '🍽️', name: 'Perfect Host' },
    steps: [
      { type: 'learn', title: 'The 60-second story', cards: [
        { emoji: '🍽️', title: 'Food changes wine',
          text: 'A wine can taste completely different with food. You don\'t need hundreds of rules, just these few <b>reactions</b>. Learn them and you can pair anything.' },
        { emoji: '🍰', title: 'Sweet & umami make wine harsher',
          text: 'Sweet food and umami-rich food (mushrooms, soy, Parmesan) make wine taste <b>more bitter, more acidic and less fruity</b>.<br><br>So: pudding wine must be <b>at least as sweet</b> as the pudding, and umami dishes like softer, fruitier wines.' },
        { emoji: '🧂', title: 'Salt & acid are wine\'s friends',
          text: 'Salty and acidic food make wine taste <b>smoother and fruitier</b>.<br><br>Tip: tangy, lemony food needs a wine with plenty of acidity too, or the wine tastes flat.' },
        { emoji: '🌶️', title: 'Chilli turns up the heat',
          text: 'Chilli makes <b>alcohol burn</b> and <b>tannin taste harsh</b>. Pick a lower-alcohol, fruity wine with a touch of sweetness. Off-dry Riesling is a hero here.' },
        { emoji: '🥩', title: 'Fat & protein tame tannin',
          text: 'Red meat softens a big, grippy red. That is why <b>steak and Cabernet</b> are best mates. But tannic reds with delicate fish can taste metallic.' },
        { emoji: '⚖️', title: 'Match weight with weight',
          text: '<b>Light dish, light wine. Rich dish, fuller wine.</b> A summer salad would be flattened by Shiraz. A beef stew would drown a Pinot Grigio.' }
      ]},
      { type: 'pair', title: 'Perfect Match', intro: 'Pick a wine for each dish and watch the Taste-o-Meter react.',
        rounds: [
          { emoji: '🥩', dish: 'Rib-eye steak', options: [
            { wine: 'Cabernet Sauvignon', score: 95, reaction: 'The fat in the steak softens all that tannin. Heavenly.' },
            { wine: 'Pinot Grigio', score: 25, reaction: 'Lovely wine, but the steak completely flattens it.' },
            { wine: 'Sweet Riesling', score: 20, reaction: 'The sweetness clashes with savoury, meaty flavours.' } ] },
          { emoji: '🍛', dish: 'Spicy Thai green curry', options: [
            { wine: 'Off-dry Riesling', score: 95, reaction: 'A touch of sweetness and low alcohol cool the chilli right down.' },
            { wine: 'Barossa Shiraz (15%)', score: 20, reaction: 'The chilli makes all that alcohol burn. Ouch!' },
            { wine: 'Cabernet Sauvignon', score: 25, reaction: 'Chilli makes the tannins taste harsh and bitter.' } ] },
          { emoji: '🐟', dish: 'Grilled sea bass with lemon', options: [
            { wine: 'Sauvignon Blanc', score: 95, reaction: 'Zingy acidity matches the lemon, and the light body suits delicate fish.' },
            { wine: 'Oaked Chardonnay', score: 55, reaction: 'Not bad, but the oak can swamp delicate fish.' },
            { wine: 'Cabernet Sauvignon', score: 15, reaction: 'Far too heavy, and tannin with fish can taste metallic.' } ] },
          { emoji: '🍮', dish: 'Sticky toffee pudding', options: [
            { wine: 'A sweet dessert wine', score: 95, reaction: 'At least as sweet as the pudding, so both taste gorgeous.' },
            { wine: 'Dry sparkling wine', score: 20, reaction: 'The pudding makes a dry wine taste thin and sour.' },
            { wine: 'Pinot Noir', score: 25, reaction: 'The sweetness strips out the fruit and leaves it bitter.' } ] },
          { emoji: '🍄', dish: 'Mushroom risotto', options: [
            { wine: 'Pinot Noir', score: 90, reaction: 'Earthy wine meets earthy mushrooms, and the soft tannins stay smooth.' },
            { wine: 'Prosecco', score: 55, reaction: 'Fresh and pleasant, but a little lightweight for a creamy risotto.' },
            { wine: 'Cabernet Sauvignon', score: 30, reaction: 'Umami makes those big tannins taste even more bitter.' } ] },
          { emoji: '🍟', dish: 'Fish & chips', options: [
            { wine: 'Champagne or Cava', score: 95, reaction: 'Salt and high acidity are best friends, and the bubbles cut through the batter.' },
            { wine: 'Merlot', score: 40, reaction: 'It\'s okay, but salty, crispy batter wants something fresher.' },
            { wine: 'Port', score: 15, reaction: 'Far too sweet and strong for a chippy tea!' } ] }
        ]},
      { type: 'mcq', title: 'What Happens Next?', intro: 'Food meets wine. What does it do to the taste?',
        questions: ['p1', 'p2', 'p3', 'p4'] },
      { type: 'recall', title: 'Quick recall', intro: 'Four quick questions to lock it in.',
        questions: ['p5', 'p6', 'p7', 'p8'] }
    ]
  },
  {
    id: 'serve', num: 6, title: 'Serve It Right', emoji: '🧊',
    blurb: 'Temperatures, storing, opening fizz and spotting a corked wine.',
    badge: { emoji: '🍾', name: 'Smooth Server' },
    steps: [
      { type: 'learn', title: 'The 60-second story', cards: [
        { emoji: '🌡️', title: 'Temperature matters',
          text: '<b>Too cold</b> hides the flavours. <b>Too warm</b> and the alcohol takes over. Most whites are served too cold, and most reds too warm!' },
        { emoji: '❄️', title: 'Chill these',
          text: '<b>Well chilled (6–10°C):</b> sparkling, sweet wines, light whites and rosé.<br><b>Lightly chilled (10–13°C):</b> full-bodied oaked whites, and light reds like Pinot Noir.' },
        { emoji: '🍷', title: 'Reds at room temperature',
          text: 'Medium and full-bodied reds are best at <b>15–18°C</b>. That means a cool room, not next to the radiator. Too warm? Pop it in the fridge for 10 minutes.' },
        { emoji: '🍾', title: 'Opening fizz safely',
          text: 'Chill it well first. Keep a hand (or a tea towel) on the cork and point it away from people. <b>Hold the cork and twist the bottle</b>, easing it out so it sighs, not bangs.' },
        { emoji: '🗄️', title: 'Storing wine',
          text: '<b>Unopened:</b> on their side (keeps the cork moist), somewhere cool, dark and steady. Not on top of the fridge!<br><b>Opened:</b> re-cork, keep in the fridge (reds too), and finish within 2–3 days.' },
        { emoji: '👃', title: 'Is it corked?',
          text: 'A "corked" wine smells <b>musty: damp cardboard, wet dog or an old cellar</b>, and the fruit tastes dull. It isn\'t about bits of cork floating in the glass. When the waiter pours a taste, you are just checking for faults. It\'s fine to politely send a corked bottle back.' },
        { emoji: '💧', title: 'Enjoy it sensibly',
          text: 'The UK guideline is <b>no more than 14 units a week</b>, spread over three or more days. A 175ml glass of 13% wine is about <b>2.3 units</b>, and a bottle is nearly 10. Eat food, sip water, savour it.' }
      ]},
      { type: 'sort', title: 'Fridge or Shelf?', intro: 'How should each wine be served?',
        categories: ['Well chilled', 'Lightly chilled', 'Room temp'],
        items: [
          { label: 'Prosecco', answer: 'Well chilled', why: 'Fizz should be well chilled (6–10°C), which also keeps the cork calm.' },
          { label: 'Sauternes (sweet)', answer: 'Well chilled', why: 'Sweet wines are best well chilled, so they taste fresh rather than sickly.' },
          { label: 'Pinot Grigio', answer: 'Well chilled', why: 'Light whites are served chilled (7–10°C).' },
          { label: 'Oaked Chardonnay', answer: 'Lightly chilled', why: 'Full, oaked whites show more flavour a little warmer (10–13°C).' },
          { label: 'Pinot Noir', answer: 'Lightly chilled', why: 'Light reds are lovely lightly chilled, at about 13°C.' },
          { label: 'Cabernet Sauvignon', answer: 'Room temp', why: 'Full-bodied reds at 15–18°C. Cold makes tannin taste harsher.' },
          { label: 'Barossa Shiraz', answer: 'Room temp', why: 'Big reds at room temperature, but a cool room, not a hot one.' }
        ]},
      { type: 'mcq', title: 'Spot the Problem', intro: 'Restaurant moments and kitchen dilemmas. What\'s the right call?',
        questions: ['f1', 'f2', 'f3', 'f4', 'f5'] },
      { type: 'recall', title: 'Quick recall', intro: 'Five quick questions to lock it in.',
        questions: ['v1', 'v2', 'v3', 'v4', 'v5'] }
    ]
  },
  {
    id: 'bonus', num: 7, title: 'Bonus Grapes', emoji: '🌟',
    blurb: 'Malbec, Rioja, Chianti and friends: six popular wines from beyond the big eight.',
    badge: { emoji: '🧭', name: 'Wine Explorer' },
    grapes: ['malbec', 'tempranillo', 'sangiovese', 'grenache', 'albarino', 'gewurz'],
    steps: [
      { type: 'learn', title: 'Meet the characters', grapeCards: ['malbec', 'tempranillo', 'sangiovese', 'grenache', 'albarino', 'gewurz'],
        cards: [
          { emoji: '🧭', title: 'Six more to know',
            text: 'You know the big eight. These six turn up on almost every wine list and supermarket shelf, and they\'re great next steps from the wines you already like.' },
          { emoji: '🏷️', title: 'Place, not grape',
            text: 'In Europe, labels often name the <b>place</b>, not the grape:<br><b>Rioja</b> = mostly Tempranillo<br><b>Chianti</b> = Sangiovese<br><b>Côtes du Rhône</b> = mostly Grenache<br><br>Learn these three and half the wine list makes sense.' }
        ]},
      { type: 'sort', title: 'Read the Label', intro: 'The label names the place. Which grape is in the bottle?',
        categories: ['Tempranillo', 'Sangiovese', 'Grenache'],
        items: [
          { label: 'Rioja Reserva', answer: 'Tempranillo', why: 'Rioja is Tempranillo country.' },
          { label: 'Chianti Classico', answer: 'Sangiovese', why: 'Chianti is made from Sangiovese.' },
          { label: 'Côtes du Rhône', answer: 'Grenache', why: 'Southern Rhône reds are mostly Grenache.' },
          { label: 'Ribera del Duero', answer: 'Tempranillo', why: 'Spain\'s other famous Tempranillo region, usually bolder than Rioja.' },
          { label: 'Brunello di Montalcino', answer: 'Sangiovese', why: 'A grand, long-lived Tuscan Sangiovese.' },
          { label: 'Châteauneuf-du-Pape', answer: 'Grenache', why: 'The Rhône\'s most famous red, led by Grenache.' }
        ]},
      { type: 'whoami', title: 'Who Am I?', intro: 'Guess the grape from the clues. The fewer clues you need, the more corks you win.',
        rounds: [
          { answer: 'malbec', clues: ['I\'m dark, full-bodied and velvety.', 'Plums, blackberries and a hint of violets.', 'I was born in France but found fame elsewhere.', 'Mendoza in Argentina is my home.'] },
          { answer: 'tempranillo', clues: ['I\'m often aged in oak, so I can taste of vanilla.', 'Red cherry, with leather as I get older.', 'Words like Crianza and Reserva describe my ageing.', 'I\'m the grape behind Rioja.'] },
          { answer: 'sangiovese', clues: ['I\'m tangy, with high acidity.', 'Sour cherry, tomato leaf and dried herbs.', 'I\'m happiest with pizza and pasta.', 'Chianti is made from me.'] },
          { answer: 'grenache', clues: ['I love heat and ripen fully, so I\'m often quite strong.', 'Juicy strawberry and raspberry, with a little spice.', 'I\'m used in lots of rosé.', 'I lead in Côtes du Rhône, and Spain calls me Garnacha.'] },
          { answer: 'albarino', clues: ['I\'m a white with zingy acidity.', 'Lemon and peach, with a salty tang.', 'I grow by the Atlantic Ocean.', 'Rías Baixas in Spain is my home.'] },
          { answer: 'gewurz', clues: ['I\'m a white with low acidity and lots of perfume.', 'Lychee, roses and a hint of ginger.', 'I\'m often off-dry, so I\'m great with spicy food.', 'Alsace in France is my home, and my name is hard to spell.'] }
        ], choices: ['malbec', 'tempranillo', 'sangiovese', 'grenache', 'albarino', 'gewurz'] },
      { type: 'mcq', title: 'Order It Right', intro: 'Real menus, real moments. Which of the new six would you pick?',
        questions: ['x1', 'x2', 'x3', 'x4', 'x5'] },
      { type: 'recall', title: 'Quick recall', intro: 'Five quick questions to lock it in.',
        questions: ['x6', 'x7', 'x8', 'x9', 'x10', 'x11'] }
    ]
  }
];

/* ---------- Final test: The Sommelier Challenge ---------- */
const FINAL_TEST = {
  total: 20,
  passMark: 70,
  // How many to draw from each pool (must add up to `total`)
  pools: [
    { topic: 'basics', take: 2, ids: ['b1', 'b2', 'b3', 'b5', 'b6', 'b7', 'b8', 'd2', 'd5'] },
    { topic: 'whites', take: 3, ids: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 't4'] },
    { topic: 'reds', take: 3, ids: ['r1', 'r2', 'r3', 'r4', 'r5', 't1', 't2', 't3'] },
    { topic: 'climate', take: 2, ids: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'] },
    { topic: 'pairing', take: 2, ids: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] },
    { topic: 'serving', take: 2, ids: ['f1', 'f2', 'f3', 'f4', 'f5', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'] },
    { topic: 'scenario', take: 6, ids: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'] }
  ],
  // Questions that test the same idea. A test never includes more than one from a group.
  sameIdea: [
    ['s1', 's11', 'p4'],        // steak softens tannin
    ['s2', 'p3'],               // spicy food
    ['w3', 's8'],               // Chablis
    ['w2', 'c3'],               // oak = vanilla and toast
    ['w4', 's9'],               // Riesling: dry or sweet
    ['t1', 's7'],               // if you like Merlot…
    ['s3', 'p8'],               // salads
    ['s4', 's6', 'w1'],         // unoaked, crisp whites
    ['f1', 'f2'],               // corked wine
    ['c5', 'c6'],               // how bubbles are made
    ['c1', 'c7']                // cool climate = lighter
  ],
  topicNames: { basics: 'The Basics', whites: 'White grapes', reds: 'Red grapes', climate: 'Climate, oak & bubbles', pairing: 'Food & wine', serving: 'Serving & storing', scenario: 'Real-world ordering' },
  topicLinks: { basics: 'basics', whites: 'whites', reds: 'reds', climate: 'climate', pairing: 'dinner', serving: 'serve', scenario: 'cheat' },
  ranks: [
    { min: 95, title: 'Sommelier-ish', emoji: '🏆' },
    { min: 80, title: 'Wine List Whisperer', emoji: '🌟' },
    { min: 70, title: 'House Pour', emoji: '🍷' },
    { min: 0, title: 'Curious Sipper', emoji: '🍇' }
  ]
};

/* ---------- Cheat sheet extras ---------- */
// Popular wines that aren't one of the game's grapes, shown in the
// "If you like… try…" finder under "Popular favourites". Same shape as a grape's tryNext.
const FINDER_EXTRAS = [
  { id: 'prosecco', name: 'Prosecco', tryNext: [
    { name: 'Crémant', why: 'French fizz made the Champagne way, with finer bubbles, at a Prosecco-ish price.' },
    { name: 'Cava', why: 'Spain\'s fizz, also made the Champagne way: drier, crisper and a little toasty.' }
  ] },
  { id: 'rose', name: 'Provence rosé', tryNext: [
    { name: 'Spanish rosado (Garnacha)', why: 'A little deeper in colour and juicier, with ripe strawberry.' },
    { name: 'Albariño', why: 'If you love rosé for its crisp freshness, this zesty white is a lovely switch.' }
  ] }
];

const PAIRING_RULES = [
  { emoji: '⚖️', rule: 'Match weight with weight', detail: 'Light food → light wine. Rich food → fuller wine. Think Pinot Grigio with a salad, Shiraz with a beef stew.' },
  { emoji: '🥩', rule: 'Tannin loves protein and fat', detail: 'Steak softens a grippy red. Go for Cabernet Sauvignon or Malbec.' },
  { emoji: '🧂', rule: 'Salt and acid are wine\'s friends', detail: 'They make wine taste softer and fruitier.' },
  { emoji: '🌶️', rule: 'Spicy food? Go low alcohol, a touch sweet', detail: 'Chilli makes alcohol and tannin burn. Try off-dry Riesling.' },
  { emoji: '🍰', rule: 'Pudding needs a sweeter wine', detail: 'The wine should be at least as sweet as the dessert. Try Sauternes or a sweet Muscat.' },
  { emoji: '🍄', rule: 'Sweet or umami food makes wine harsher', detail: 'Choose fruitier, softer wines. Pinot Noir with a mushroom risotto is a classic.' }
];

const DISHES = [
  { emoji: '🐟', dish: 'Fish & seafood', wines: 'Sauvignon Blanc, Pinot Grigio, Chablis' },
  { emoji: '🍗', dish: 'Roast chicken', wines: 'Chardonnay, Pinot Noir, Merlot' },
  { emoji: '🥩', dish: 'Steak & lamb', wines: 'Cabernet Sauvignon, Syrah/Shiraz, Malbec' },
  { emoji: '🍔', dish: 'Burgers & BBQ', wines: 'Shiraz, Malbec, Merlot' },
  { emoji: '🍛', dish: 'Spicy food', wines: 'Off-dry Riesling, fruity rosé' },
  { emoji: '🧀', dish: "Goat's cheese & salads", wines: 'Sauvignon Blanc' },
  { emoji: '🍝', dish: 'Creamy pasta', wines: 'Oaked Chardonnay' },
  { emoji: '🍄', dish: 'Mushrooms & duck', wines: 'Pinot Noir' }
];

/* ---------- "What am I eating?" pairing tool ----------
   picks: up to 3 wines (best first). avoid: one to steer clear of. rule: the why. */
const DISH_FINDER = [
  { emoji: '🥩', name: 'Steak or roast beef', cat: 'Meat',
    picks: [{ wine: 'Malbec', why: 'Plush and dark: a steakhouse classic.' }, { wine: 'Cabernet Sauvignon', why: 'Its grippy tannin melts into the fat and protein.' }, { wine: 'Syrah / Shiraz', why: 'Bold, with a peppery kick.' }],
    avoid: { wine: 'Pinot Grigio', why: 'Lovely wine, but the beef flattens it.' }, rule: 'Tannin loves protein and fat.' },
  { emoji: '🐑', name: 'Roast lamb', cat: 'Meat',
    picks: [{ wine: 'Rioja (Tempranillo)', why: 'Savoury cherry and vanilla: a match made in Spain.' }, { wine: 'Cabernet Sauvignon', why: 'Bordeaux and lamb are old friends.' }, { wine: 'Syrah', why: 'Peppery and savoury, like rosemary in a glass.' }],
    avoid: { wine: 'Light, crisp whites', why: 'Too delicate for rich, fatty lamb.' }, rule: 'Match weight with weight.' },
  { emoji: '🍗', name: 'Roast chicken', cat: 'Meat',
    picks: [{ wine: 'Chardonnay', why: 'Round and rich enough for roast chicken and gravy.' }, { wine: 'Pinot Noir', why: 'Light, silky red that won\'t overpower it.' }, { wine: 'Merlot', why: 'Soft and fruity: everyone at the table will be happy.' }],
    rule: 'Medium dish, medium wine. Red or white both work.' },
  { emoji: '🍔', name: 'Burgers & BBQ', cat: 'Meat',
    picks: [{ wine: 'Malbec', why: 'Juicy, dark and smoky-friendly.' }, { wine: 'Australian Shiraz', why: 'Jammy and bold, ready for sticky sauce.' }, { wine: 'Grenache', why: 'Soft, ripe and easy-going.' }],
    avoid: { wine: 'Delicate whites', why: 'Smoke and char drown them out.' }, rule: 'Big flavours need big wines.' },
  { emoji: '🌭', name: 'Sausages & mash', cat: 'Meat',
    picks: [{ wine: 'Côtes du Rhône (Grenache)', why: 'Warm, spicy and comforting.' }, { wine: 'Merlot', why: 'Soft and plummy with onion gravy.' }],
    rule: 'Comfort food loves a soft, fruity red.' },
  { emoji: '🍟', name: 'Fish & chips', cat: 'Fish',
    picks: [{ wine: 'Champagne, Cava or Prosecco', why: 'Bubbles and acidity cut through the batter. A seaside treat.' }, { wine: 'Sauvignon Blanc', why: 'Zesty, like a squeeze of lemon.' }, { wine: 'Chablis', why: 'Crisp and clean.' }],
    avoid: { wine: 'Big, tannic reds', why: 'Tannin and fish can taste metallic.' }, rule: 'Salt and acid are wine\'s friends.' },
  { emoji: '🐟', name: 'White fish & seafood', cat: 'Fish',
    picks: [{ wine: 'Albariño', why: 'Zesty and a little salty: born for seafood.' }, { wine: 'Chablis', why: 'Crisp and pure.' }, { wine: 'Sauvignon Blanc', why: 'Zingy and fresh.' }],
    avoid: { wine: 'Big, tannic reds', why: 'They make fish taste metallic.' }, rule: 'Light dish, light wine.' },
  { emoji: '🍣', name: 'Salmon or sushi', cat: 'Fish',
    picks: [{ wine: 'Pinot Noir', why: 'Light, low-tannin red that loves salmon.' }, { wine: 'Dry Riesling', why: 'Crisp and citrusy, great with sushi.' }, { wine: 'Dry rosé', why: 'Fresh and easy with both.' }],
    rule: 'Oily fish can take a light red. Keep the tannin low.' },
  { emoji: '🍕', name: 'Pizza', cat: 'Pasta & veggie',
    picks: [{ wine: 'Chianti (Sangiovese)', why: 'Its zingy acidity matches the tomato.' }, { wine: 'Grenache', why: 'Juicy and easy-going for a pepperoni.' }, { wine: 'Merlot', why: 'A soft, safe all-rounder.' }],
    rule: 'Tomatoes are acidic, so pick a wine with zing.' },
  { emoji: '🍝', name: 'Tomato pasta or lasagne', cat: 'Pasta & veggie',
    picks: [{ wine: 'Chianti (Sangiovese)', why: 'Italy\'s answer to tomato sauce.' }, { wine: 'Rioja Crianza', why: 'Smooth and savoury with a meaty ragù.' }],
    rule: 'Acidic food needs an acidic wine.' },
  { emoji: '🧀', name: 'Creamy pasta (carbonara)', cat: 'Pasta & veggie',
    picks: [{ wine: 'Oaked Chardonnay', why: 'Creamy wine, creamy dish.' }, { wine: 'Pinot Grigio', why: 'A light, fresh contrast if you\'d rather.' }],
    rule: 'Match weight with weight.' },
  { emoji: '🍄', name: 'Mushroom risotto', cat: 'Pasta & veggie',
    picks: [{ wine: 'Pinot Noir', why: 'Earthy and silky: a classic.' }, { wine: 'Oaked Chardonnay', why: 'Rich and round, like the risotto.' }],
    avoid: { wine: 'Big, tannic reds', why: 'Umami makes tannin taste harsher.' }, rule: 'Umami food makes wine taste harsher, so go soft and fruity.' },
  { emoji: '🥗', name: 'Salads & goat\'s cheese', cat: 'Pasta & veggie',
    picks: [{ wine: 'Sauvignon Blanc', why: 'Sancerre and goat\'s cheese are a famous match.' }, { wine: 'Provence rosé', why: 'Light and summery.' }],
    avoid: { wine: 'Oaky, full-bodied wines', why: 'They\'ll swamp a light salad.' }, rule: 'Light food, light wine. Zingy dressing, zingy wine.' },
  { emoji: '🍛', name: 'Indian curry', cat: 'Spicy & takeaway',
    picks: [{ wine: 'Off-dry Riesling', why: 'A touch of sweetness cools the heat.' }, { wine: 'Gewürztraminer', why: 'Aromatic and spice-friendly.' }, { wine: 'Fruity rosé', why: 'Chilled and refreshing.' }],
    avoid: { wine: 'Strong, tannic reds', why: 'Chilli makes alcohol and tannin burn.' }, rule: 'Spicy food? Go low alcohol, a touch sweet.' },
  { emoji: '🌶️', name: 'Thai curry', cat: 'Spicy & takeaway',
    picks: [{ wine: 'Gewürztraminer', why: 'Lychee and ginger notes love lemongrass and chilli.' }, { wine: 'Off-dry Riesling', why: 'Zingy, a little sweet and lower in alcohol.' }],
    avoid: { wine: 'High-alcohol reds', why: 'Chilli and alcohol make each other hotter.' }, rule: 'Spicy food? Go low alcohol, a touch sweet.' },
  { emoji: '🥡', name: 'Chinese takeaway', cat: 'Spicy & takeaway',
    picks: [{ wine: 'Off-dry Riesling', why: 'Handles sweet-and-sour and a bit of heat.' }, { wine: 'Pinot Noir', why: 'Soft and fruity with crispy duck.' }],
    avoid: { wine: 'Bone-dry, tannic reds', why: 'Sweet sauces make them taste bitter and sour.' }, rule: 'Sweet food makes dry wine taste harsher.' },
  { emoji: '🧀', name: 'Cheeseboard', cat: 'Cheese, puds & nibbles',
    picks: [{ wine: 'Port', why: 'With Stilton: sweet and salty heaven.' }, { wine: 'Rioja or Cabernet', why: 'With mature Cheddar.' }, { wine: 'Sauvignon Blanc', why: 'With goat\'s cheese.' }],
    rule: 'Salty cheese loves a sweeter wine.' },
  { emoji: '🍫', name: 'Chocolate pudding', cat: 'Cheese, puds & nibbles',
    picks: [{ wine: 'Ruby Port', why: 'Sweet and rich enough to stand up to chocolate.' }],
    avoid: { wine: 'Dry red wine', why: 'Sweet pudding makes it taste sour and bitter.' }, rule: 'The wine should be at least as sweet as the pudding.' },
  { emoji: '🍮', name: 'Sticky toffee or fruit pudding', cat: 'Cheese, puds & nibbles',
    picks: [{ wine: 'Sauternes', why: 'Honey and apricot: glorious with toffee.' }, { wine: 'Sweet Muscat', why: 'Grapey and sweet, lovely with fruit.' }],
    avoid: { wine: 'Dry wines', why: 'They\'ll taste thin and sour next to pudding.' }, rule: 'The wine should be at least as sweet as the pudding.' },
  { emoji: '🫒', name: 'Nibbles & crisps', cat: 'Cheese, puds & nibbles',
    picks: [{ wine: 'Prosecco or Cava', why: 'Salty snacks and bubbles are a party staple.' }, { wine: 'Albariño', why: 'Zesty and a little salty, lovely with olives.' }],
    rule: 'Salt makes wine taste softer and fruitier.' }
];

/* ---------- My Palate quiz ----------
   Each answer gives points to palate types. Highest total wins (ties go to the first listed). */
const PALATE_QUIZ = [
  { q: 'How do you take your coffee?', options: [
    { label: 'Strong black espresso', pts: { bold: 2, classic: 1 } },
    { label: 'A smooth flat white', pts: { smooth: 2, velvet: 1 } },
    { label: 'Sweet: caramel latte, please', pts: { perfumed: 2, velvet: 1 } },
    { label: 'No coffee. Lemon & ginger tea', pts: { zesty: 2, classic: 1 } } ] },
  { q: 'Pick a chocolate.', options: [
    { label: '85% dark', pts: { bold: 2, classic: 1 } },
    { label: 'Creamy milk chocolate', pts: { smooth: 2, velvet: 1 } },
    { label: 'A salted caramel truffle', pts: { velvet: 2, perfumed: 1 } },
    { label: 'A lemon tart instead', pts: { zesty: 1, perfumed: 1 } } ] },
  { q: 'Which fruit bowl are you reaching for?', options: [
    { label: 'Green apples and limes', pts: { zesty: 2 } },
    { label: 'Ripe peaches and mango', pts: { velvet: 2, perfumed: 1 } },
    { label: 'Strawberries and cherries', pts: { classic: 2, smooth: 1 } },
    { label: 'Blackcurrants and plums', pts: { bold: 2, velvet: 1 } } ] },
  { q: 'Your dream dinner?', options: [
    { label: 'A seafood platter by the sea', pts: { zesty: 2, classic: 1 } },
    { label: 'A creamy chicken pie', pts: { velvet: 2, smooth: 1 } },
    { label: 'A rare steak', pts: { bold: 2 } },
    { label: 'A fragrant Thai curry', pts: { perfumed: 2 } } ] },
  { q: 'Pick a smell.', options: [
    { label: 'Freshly cut grass', pts: { zesty: 2 } },
    { label: 'A bunch of roses', pts: { perfumed: 2 } },
    { label: 'A forest walk after rain', pts: { classic: 2 } },
    { label: 'Vanilla and warm toast', pts: { velvet: 2 } } ] },
  { q: 'Your ideal Friday night?', options: [
    { label: 'Feet up, comfy and easy', pts: { smooth: 2 } },
    { label: 'A big night out', pts: { bold: 2 } },
    { label: 'A cosy dinner with old friends', pts: { classic: 2, velvet: 1 } },
    { label: 'Trying a new pop-up restaurant', pts: { zesty: 1, perfumed: 1 } } ] },
  { q: 'How do you feel about sweets?', options: [
    { label: 'Love them', pts: { perfumed: 2, smooth: 1 } },
    { label: 'Now and then', pts: { smooth: 1, velvet: 1 } },
    { label: 'I\'d rather have savoury snacks', pts: { classic: 2, bold: 1 } },
    { label: 'Sour sweets all the way', pts: { zesty: 1 } } ] }
];

// white / red / dare are grape ids. say = what to ask for in a restaurant.
const PALATE_TYPES = {
  zesty:    { emoji: '🍋', title: 'The Zesty Explorer', text: 'You love fresh, bright, mouth-watering flavours. Think crisp, unoaked wines with plenty of zing.',
              white: { id: 'sauvignon', why: 'Grassy, zingy and bright.' }, red: { id: 'pinotnoir', why: 'Light and fresh, best slightly chilled.' }, dare: { id: 'albarino', why: 'All the zing, plus peach and a salty tang.' },
              say: '"Something crisp and zesty, nothing oaky."' },
  smooth:   { emoji: '🍑', title: 'The Easy-Going Charmer', text: 'You like wines that are soft, fruity and easy to enjoy, without sharp edges or heavy oak.',
              white: { id: 'pinotgrigio', why: 'Light, easy and refreshing.' }, red: { id: 'merlot', why: 'Soft, plummy and smooth.' }, dare: { id: 'malbec', why: 'Just as smooth, with more depth.' },
              say: '"Something soft and fruity, nothing too heavy."' },
  velvet:   { emoji: '🍮', title: 'The Velvet Indulger', text: 'Rich, round and a little luxurious. You enjoy ripe fruit, creamy textures and a touch of oak.',
              white: { id: 'chardonnay', why: 'Ask for an oaked one: creamy, toasty and ripe.' }, red: { id: 'syrah', why: 'Australian Shiraz: jammy, plush and warm.' }, dare: { id: 'tempranillo', why: 'Rioja Reserva brings vanilla and soft, smooth fruit.' },
              say: '"Something rich and smooth, maybe with a bit of oak."' },
  bold:     { emoji: '🔥', title: 'The Bold Adventurer', text: 'Big flavours, dark fruit and a bit of grip. You like a wine that makes a statement.',
              white: { id: 'chardonnay', why: 'If you fancy a white, go for a full, oaked one.' }, red: { id: 'cabernet', why: 'Blackcurrant, cedar and plenty of tannin.' }, dare: { id: 'sangiovese', why: 'Just as grippy, but tangier and more savoury.' },
              say: '"Something big and bold, with a bit of grip."' },
  perfumed: { emoji: '🌸', title: 'The Fruit & Flowers Fan', text: 'You love aromatic, fruity wines, and a touch of sweetness doesn\'t scare you.',
              white: { id: 'gewurz', why: 'Lychee and roses in a glass.' }, red: { id: 'grenache', why: 'Juicy strawberry and soft tannins.' }, dare: { id: 'riesling', why: 'Try an off-dry one: fruity, floral and zingy.' },
              say: '"Something fruity and aromatic, maybe off-dry."' },
  classic:  { emoji: '🍄', title: 'The Earthy Classicist', text: 'You like subtle, savoury wines that taste even better with food. Elegance over power.',
              white: { id: 'chardonnay', why: 'Ask for Chablis: crisp, pure and mineral.' }, red: { id: 'pinotnoir', why: 'Silky red fruit that turns earthy with age.' }, dare: { id: 'tempranillo', why: 'Savoury cherry and leather, made for the table.' },
              say: '"Something elegant and savoury that goes with food."' }
};

const ORDERING_PHRASES = [
  '"Something dry and crisp, not too oaky."',
  '"A light, fruity red, maybe a Pinot Noir?"',
  '"Something big and bold to go with the steak."',
  '"I usually like Merlot. What would you suggest that\'s similar?"',
  '"Is the Riesling dry or sweet?"'
];

const SERVICE_TIPS = [
  { emoji: '👃', tip: 'Is it corked?', detail: 'Musty, damp-cardboard smell and dull fruit. Politely send it back. Bits of cork in the glass are harmless.' },
  { emoji: '🍷', tip: 'The taste the waiter pours', detail: "It's a quick fault check, not a test of whether you love it. Sniff, sip, nod." },
  { emoji: '🍾', tip: 'Opening fizz', detail: 'Chill it well. Hold the cork, twist the bottle, and ease it out with a sigh, not a bang.' },
  { emoji: '🗄️', tip: 'Leftovers', detail: 'Re-cork, put it in the fridge (reds too) and finish within 2–3 days.' },
  { emoji: '💧', tip: 'Sensible sipping', detail: 'UK guideline: up to 14 units a week. A 175ml glass of 13% wine ≈ 2.3 units.' }
];

const SERVING_TEMPS = [
  { style: 'Sweet wines', temp: 'Well chilled', c: '6–8°C' },
  { style: 'Sparkling', temp: 'Well chilled', c: '6–10°C' },
  { style: 'Light & medium whites, rosé', temp: 'Chilled', c: '7–10°C' },
  { style: 'Full-bodied, oaked whites', temp: 'Lightly chilled', c: '10–13°C' },
  { style: 'Light reds (e.g. Pinot Noir)', temp: 'Lightly chilled', c: 'About 13°C' },
  { style: 'Medium & full reds', temp: 'Room temperature', c: '15–18°C' }
];
