var mapStyle = {
	day:[{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#a1f199"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"color":"#e4dfd9"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#37bda2"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#84b09e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#fafeb8"},{"weight":"1.25"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#5ddad6"}]}],
	night:[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]}]};
var p_size = ["",[111,131],[188,158],[232,176],[87,120],[104,168],[246,199],[102,113],[116,150],[190,175],[52,67],[69,111],[179,148],[37,62],[63,119],[130,159],[65,87],[243,133],[250,169],[90,131],[125,138],[50,77],[249,107],[102,85],[143,171],[111,115],[107,171],[103,117],[133,145],[73,71],[107,127],[121,157],[103,110],[160,145],[178,170],[134,125],[196,161],[132,126],[163,168],[110,114],[152,162],[166,107],[249,88],[112,109],[161,140],[234,152],[119,81],[171,152],[108,141],[152,184],[101,82],[175,136],[93,120],[111,129],[136,151],[154,170],[131,153],[151,161],[107,139],[153,197],[135,119],[208,151],[184,169],[190,137],[155,162],[158,172],[80,131],[140,171],[150,170],[106,106],[191,141],[217,186],[86,149],[127,172],[219,70],[208,123],[190,163],[80,158],[132,196],[111,152],[230,176],[169,104],[145,115],[103,132],[97,187],[120,191],[151,107],[155,137],[217,165],[250,153],[127,96],[198,184],[199,172],[221,203],[178,183],[213,248],[127,139],[186,169],[182,133],[257,184],[111,111],[156,157],[187,78],[374,184],[81,102],[104,149],[105,170],[99,149],[154,157],[130,123],[216,151],[164,163],[202,199],[181,154],[158,146],[222,209],[67,96],[135,158],[128,62],[113,114],[134,135],[157,154],[156,155],[208,238],[179,171],[165,178],[180,186],[176,169],[196,205],[156,133],[172,176],[210,175],[125,103],[134,108],[189,143],[96,133],[104,183],[147,146],[99,112],[163,155],[120,84],[127,170],[250,116],[198,192],[245,233],[204,234],[233,98],[103,136],[117,171],[125,207],[173,200],[129,142]];
var pokedex =[{},{"name":"Bulbasaur","rarity":"Common","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"61"},{"name":"Ivysaur","rarity":"Special","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"421"},{"name":"Venusaur","rarity":"Epic","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"641"},{"name":"Charmander","rarity":"Common","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"119"},{"name":"Charmeleon","rarity":"Special","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"1025"},{"name":"Charizard","rarity":"Epic","types":[{"type":"Fire","color":"#f08030"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"879"},{"name":"Squirtle","rarity":"Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"65"},{"name":"Wartortle","rarity":"Special","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"484"},{"name":"Blastoise","rarity":"Epic","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"843"},{"name":"Caterpie","rarity":"Very Common","types":[{"type":"Bug","color":"#a8b820"}],"spawn_rate":"51"},{"name":"Metapod","rarity":"Common","types":[{"type":"Bug","color":"#a8b820"}],"spawn_rate":"433"},{"name":"Butterfree","rarity":"Uncommon","types":[{"type":"Bug","color":"#a8b820"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"843"},{"name":"Weedle","rarity":"Very Common","types":[{"type":"Bug","color":"#a8b820"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"21"},{"name":"Kakuna","rarity":"Common","types":[{"type":"Bug","color":"#a8b820"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"204"},{"name":"Beedrill","rarity":"Rare","types":[{"type":"Bug","color":"#a8b820"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"377"},{"name":"Pidgey","rarity":"Very Common","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"10"},{"name":"Pidgeotto","rarity":"Common","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"75"},{"name":"Pidgeot","rarity":"Rare","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"203"},{"name":"Rattata","rarity":"Very Common","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"13"},{"name":"Raticate","rarity":"Common","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"159"},{"name":"Spearow","rarity":"Common","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"31"},{"name":"Fearow","rarity":"Uncommon","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"221"},{"name":"Ekans","rarity":"Very Common","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"75"},{"name":"Arbok","rarity":"Common","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"544"},{"name":"Pikachu","rarity":"Common","types":[{"type":"Electric","color":"#f8d030"}],"spawn_rate":"92"},{"name":"Raichu","rarity":"Very Rare","types":[{"type":"Electric","color":"#f8d030"}],"spawn_rate":"2051"},{"name":"Sandshrew","rarity":"Very Common","types":[{"type":"Ground","color":"#e0c068"}],"spawn_rate":"163"},{"name":"Sandslash","rarity":"Uncommon","types":[{"type":"Ground","color":"#e0c068"}],"spawn_rate":"1619"},{"name":"Nidoran♀","rarity":"Very Common","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"77"},{"name":"Nidorina","rarity":"Uncommon","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"504"},{"name":"Nidoqueen","rarity":"Very Rare","types":[{"type":"Poison","color":"#a040a0"},{"type":"Ground","color":"#e0c068"}],"spawn_rate":"1398"},{"name":"Nidoran♂","rarity":"Very Common","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"77"},{"name":"Nidorino","rarity":"Uncommon","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"586"},{"name":"Nidoking","rarity":"Very Rare","types":[{"type":"Poison","color":"#a040a0"},{"type":"Ground","color":"#e0c068"}],"spawn_rate":"1025"},{"name":"Clefairy","rarity":"Common","types":[{"type":"Fairy","color":"#e898e8"}],"spawn_rate":"85"},{"name":"Clefable","rarity":"Epic","types":[{"type":"Fairy","color":"#e898e8"}],"spawn_rate":"1309"},{"name":"Vulpix","rarity":"Common","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"188"},{"name":"Ninetales","rarity":"Uncommon","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"1538"},{"name":"Jigglypuff","rarity":"Common","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Fairy","color":"#e898e8"}],"spawn_rate":"101"},{"name":"Wigglytuff","rarity":"Uncommon","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Fairy","color":"#e898e8"}],"spawn_rate":"2051"},{"name":"Zubat","rarity":"Very Common","types":[{"type":"Poison","color":"#a040a0"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"24"},{"name":"Golbat","rarity":"Common","types":[{"type":"Poison","color":"#a040a0"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"209"},{"name":"Oddish","rarity":"Very Common","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"91"},{"name":"Gloom","rarity":"Uncommon","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"592"},{"name":"Vileplume","rarity":"Very Rare","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"1864"},{"name":"Paras","rarity":"Very Common","types":[{"type":"Bug","color":"#a8b820"},{"type":"Grass","color":"#78c850"}],"spawn_rate":"44"},{"name":"Parasect","rarity":"Uncommon","types":[{"type":"Bug","color":"#a8b820"},{"type":"Grass","color":"#78c850"}],"spawn_rate":"397"},{"name":"Venonat","rarity":"Very Common","types":[{"type":"Bug","color":"#a8b820"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"38"},{"name":"Venomoth","rarity":"Very Rare","types":[{"type":"Bug","color":"#a8b820"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"300"},{"name":"Diglett","rarity":"Common","types":[{"type":"Ground","color":"#e0c068"}],"spawn_rate":"211"},{"name":"Dugtrio","rarity":"Uncommon","types":[{"type":"Ground","color":"#e0c068"}],"spawn_rate":"1663"},{"name":"Meowth","rarity":"Very Common","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"106"},{"name":"Persian","rarity":"Common","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"1282"},{"name":"Psyduck","rarity":"Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"108"},{"name":"Golduck","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"707"},{"name":"Mankey","rarity":"Very Common","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"114"},{"name":"Primeape","rarity":"Very Rare","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"1061"},{"name":"Growlithe","rarity":"Common","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"77"},{"name":"Arcanine","rarity":"Rare","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"932"},{"name":"Poliwag","rarity":"Very Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"95"},{"name":"Poliwhirl","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"481"},{"name":"Poliwrath","rarity":"Very Rare","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"1709"},{"name":"Abra","rarity":"Common","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"104"},{"name":"Kadabra","rarity":"Uncommon","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"779"},{"name":"Alakazam","rarity":"Very Rare","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"2461"},{"name":"Machop","rarity":"Very Common","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"217"},{"name":"Machoke","rarity":"Common","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"1465"},{"name":"Machamp","rarity":"Uncommon","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"3418"},{"name":"Bellsprout","rarity":"Very Common","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"86"},{"name":"Weepinbell","rarity":"Rare","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"496"},{"name":"Victreebel","rarity":"Very Rare","types":[{"type":"Grass","color":"#78c850"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"2051"},{"name":"Tentacool","rarity":"Common","types":[{"type":"Water","color":"#6890f0"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"275"},{"name":"Tentacruel","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"615"},{"name":"Geodude","rarity":"Very Common","types":[{"type":"Rock","color":"#b8a038"},{"type":"Ground","color":"#e0c068"}],"spawn_rate":"121"},{"name":"Graveler","rarity":"Common","types":[{"type":"Rock","color":"#b8a038"},{"type":"Ground","color":"#e0c068"}],"spawn_rate":"707"},{"name":"Golem","rarity":"Uncommon","types":[{"type":"Rock","color":"#b8a038"},{"type":"Ground","color":"#e0c068"}],"spawn_rate":"2797"},{"name":"Ponyta","rarity":"Common","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"121"},{"name":"Rapidash","rarity":"Rare","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"992"},{"name":"Slowpoke","rarity":"Very Common","types":[{"type":"Water","color":"#6890f0"},{"type":"Psychic","color":"#f85888"}],"spawn_rate":"175"},{"name":"Slowbro","rarity":"Rare","types":[{"type":"Water","color":"#6890f0"},{"type":"Psychic","color":"#f85888"}],"spawn_rate":"947"},{"name":"Magnemite","rarity":"Very Common","types":[{"type":"Electric","color":"#f8d030"},{"type":"Steel","color":"#b8b8d0"}],"spawn_rate":"200"},{"name":"Magneton","rarity":"Common","types":[{"type":"Electric","color":"#f8d030"},{"type":"Steel","color":"#b8b8d0"}],"spawn_rate":"2051"},{"name":"Farfetch'd","rarity":"Rare","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"61527"},{"name":"Doduo","rarity":"Common","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"77"},{"name":"Dodrio","rarity":"Uncommon","types":[{"type":"Normal","color":"#8a8a59"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"634"},{"name":"Seel","rarity":"Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"196"},{"name":"Dewgong","rarity":"Very Rare","types":[{"type":"Water","color":"#6890f0"},{"type":"Ice","color":"#98d8d8"}],"spawn_rate":"1578"},{"name":"Grimer","rarity":"Common","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"879"},{"name":"Muk","rarity":"Rare","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"7691"},{"name":"Shellder","rarity":"Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"177"},{"name":"Cloyster","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"},{"type":"Ice","color":"#98d8d8"}],"spawn_rate":"1578"},{"name":"Gastly","rarity":"Very Common","types":[{"type":"Ghost","color":"#705898"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"77"},{"name":"Haunter","rarity":"Common","types":[{"type":"Ghost","color":"#705898"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"419"},{"name":"Gengar","rarity":"Very Rare","types":[{"type":"Ghost","color":"#705898"},{"type":"Poison","color":"#a040a0"}],"spawn_rate":"1758"},{"name":"Onix","rarity":"Rare","types":[{"type":"Rock","color":"#b8a038"},{"type":"Ground","color":"#e0c068"}],"spawn_rate":"269"},{"name":"Drowzee","rarity":"Common","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"39"},{"name":"Hypno","rarity":"Uncommon","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"322"},{"name":"Krabby","rarity":"Very Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"73"},{"name":"Kingler","rarity":"Rare","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"530"},{"name":"Voltorb","rarity":"Very Common","types":[{"type":"Electric","color":"#f8d030"}],"spawn_rate":"276"},{"name":"Electrode","rarity":"Common","types":[{"type":"Electric","color":"#f8d030"}],"spawn_rate":"1985"},{"name":"Exeggcute","rarity":"Common","types":[{"type":"Grass","color":"#78c850"},{"type":"Psychic","color":"#f85888"}],"spawn_rate":"123"},{"name":"Exeggutor","rarity":"Rare","types":[{"type":"Grass","color":"#78c850"},{"type":"Psychic","color":"#f85888"}],"spawn_rate":"1231"},{"name":"Cubone","rarity":"Common","types":[{"type":"Ground","color":"#e0c068"}],"spawn_rate":"163"},{"name":"Marowak","rarity":"Very Rare","types":[{"type":"Ground","color":"#e0c068"}],"spawn_rate":"1431"},{"name":"Hitmonlee","rarity":"Common","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"504"},{"name":"Hitmonchan","rarity":"Uncommon","types":[{"type":"Fighting","color":"#c03028"}],"spawn_rate":"446"},{"name":"Lickitung","rarity":"Uncommon","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"443"},{"name":"Koffing","rarity":"Common","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"213"},{"name":"Weezing","rarity":"Uncommon","types":[{"type":"Poison","color":"#a040a0"}],"spawn_rate":"1398"},{"name":"Rhyhorn","rarity":"Common","types":[{"type":"Ground","color":"#e0c068"},{"type":"Rock","color":"#b8a038"}],"spawn_rate":"110"},{"name":"Rhydon","rarity":"Rare","types":[{"type":"Ground","color":"#e0c068"},{"type":"Rock","color":"#b8a038"}],"spawn_rate":"867"},{"name":"Chansey","rarity":"Uncommon","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"1256"},{"name":"Tangela","rarity":"Rare","types":[{"type":"Grass","color":"#78c850"}],"spawn_rate":"346"},{"name":"Kangaskhan","rarity":"Very Rare","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"2461"},{"name":"Horsea","rarity":"Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"104"},{"name":"Seadra","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"760"},{"name":"Goldeen","rarity":"Very Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"103"},{"name":"Seaking","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"684"},{"name":"Staryu","rarity":"Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"97"},{"name":"Starmie","rarity":"Uncommon","types":[{"type":"Water","color":"#6890f0"},{"type":"Psychic","color":"#f85888"}],"spawn_rate":"1206"},{"name":"Mr. Mime","rarity":"Rare","types":[{"type":"Psychic","color":"#f85888"},{"type":"Fairy","color":"#e898e8"}],"spawn_rate":"1431"},{"name":"Scyther","rarity":"Uncommon","types":[{"type":"Bug","color":"#a8b820"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"155"},{"name":"Jynx","rarity":"Common","types":[{"type":"Ice","color":"#98d8d8"},{"type":"Psychic","color":"#f85888"}],"spawn_rate":"152"},{"name":"Electabuzz","rarity":"Very Rare","types":[{"type":"Electric","color":"#f8d030"}],"spawn_rate":"261"},{"name":"Magmar","rarity":"Rare","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"213"},{"name":"Pinsir","rarity":"Rare","types":[{"type":"Bug","color":"#a8b820"}],"spawn_rate":"99"},{"name":"Tauros","rarity":"Epic","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"153"},{"name":"Magikarp","rarity":"Very Common","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"79"},{"name":"Gyarados","rarity":"Very Rare","types":[{"type":"Water","color":"#6890f0"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"2279"},{"name":"Lapras","rarity":"Very Rare","types":[{"type":"Water","color":"#6890f0"},{"type":"Ice","color":"#98d8d8"}],"spawn_rate":"1183"},{"name":"Ditto","rarity":"Legendary","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"30764"},{"name":"Eevee","rarity":"Very Common","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"24"},{"name":"Vaporeon","rarity":"Very Rare","types":[{"type":"Water","color":"#6890f0"}],"spawn_rate":"1465"},{"name":"Jolteon","rarity":"Rare","types":[{"type":"Electric","color":"#f8d030"}],"spawn_rate":"1309"},{"name":"Flareon","rarity":"Rare","types":[{"type":"Fire","color":"#f08030"}],"spawn_rate":"1568"},{"name":"Porygon","rarity":"Special","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"867"},{"name":"Omanyte","rarity":"Special","types":[{"type":"Rock","color":"#b8a038"},{"type":"Water","color":"#6890f0"}],"spawn_rate":"346"},{"name":"Omastar","rarity":"Epic","types":[{"type":"Rock","color":"#b8a038"},{"type":"Water","color":"#6890f0"}],"spawn_rate":"6153"},{"name":"Kabuto","rarity":"Uncommon","types":[{"type":"Rock","color":"#b8a038"},{"type":"Water","color":"#6890f0"}],"spawn_rate":"356"},{"name":"Kabutops","rarity":"Very Rare","types":[{"type":"Rock","color":"#b8a038"},{"type":"Water","color":"#6890f0"}],"spawn_rate":"2930"},{"name":"Aerodactyl","rarity":"Special","types":[{"type":"Rock","color":"#b8a038"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"879"},{"name":"Snorlax","rarity":"Epic","types":[{"type":"Normal","color":"#8a8a59"}],"spawn_rate":"284"},{"name":"Articuno","rarity":"Legendary","types":[{"type":"Ice","color":"#98d8d8"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"99999"},{"name":"Zapdos","rarity":"Legendary","types":[{"type":"Electric","color":"#f8d030"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"99999"},{"name":"Moltres","rarity":"Legendary","types":[{"type":"Fire","color":"#f08030"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"99999"},{"name":"Dratini","rarity":"Uncommon","types":[{"type":"Dragon","color":"#7038f8"}],"spawn_rate":"91"},{"name":"Dragonair","rarity":"Very Rare","types":[{"type":"Dragon","color":"#7038f8"}],"spawn_rate":"699"},{"name":"Dragonite","rarity":"Epic","types":[{"type":"Dragon","color":"#7038f8"},{"type":"Flying","color":"#a890f0"}],"spawn_rate":"580"},{"name":"Mewtwo","rarity":"Legendary","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"99999"},{"name":"Mew","rarity":"Legendary","types":[{"type":"Psychic","color":"#f85888"}],"spawn_rate":"99999"}]
var l18n = {
	name:["","妙蛙種子","妙蛙草","妙蛙花","小火龍","火恐龍","噴火龍","傑尼龜","卡咪龜","水箭龜","綠毛蟲","鐵甲蛹","巴大蝴","獨角蟲","鐵殼昆","大針蜂","波波","比比鳥","比雕","小拉達","拉達","烈雀","大嘴雀","阿柏蛇","阿柏怪","皮卡丘","雷丘","穿山鼠","穿山王","尼多蘭","尼多娜","尼多后","尼多朗","尼多力諾","尼多王","皮皮","皮可西","六尾","九尾","胖丁","胖可丁","超音蝠","大嘴蝠","走路草","臭臭花","霸王花","派拉斯","派拉斯特","毛球","末入蛾","地鼠","三地鼠","喵喵","貓老大","可達鴨","哥達鴨","猴怪","火爆猴","卡蒂狗","風速狗","蚊香蝌蚪","蚊香君","快泳蛙","凱西","勇吉拉","胡地","腕力","豪力","怪力","喇叭芽","口呆花","大食花","瑪瑙水母","毒刺水母","小拳石","隆隆石","隆隆岩","小火馬","烈焰馬","呆呆獸","呆河馬","小磁怪","三合一磁怪","大蔥鴨","嘟嘟","嘟嘟利","小海獅","白海獅","臭泥","臭臭泥","大舌貝","刺甲貝","鬼斯","鬼斯通","耿鬼","大岩蛇","催眠貘","引夢貘人","大鉗蟹","巨鉗蟹","雷電球","頑皮彈","蛋蛋","椰蛋樹","可拉可拉","嘎啦嘎啦","沙瓦郎","艾比郎","大舌頭","瓦斯彈","雙彈瓦斯","鐵甲犀牛","鑽角犀獸","吉利蛋","蔓藤怪","袋龍","墨海馬","海刺龍","角金魚","金魚王","海星星","寶石海星","魔牆人偶","飛天螳螂","迷唇姐","電擊獸","鴨嘴火龍","大甲","肯泰羅","鯉魚王","暴鯉龍","拉普拉斯","百變怪","伊布","水精靈","雷精靈","火精靈","3D龍","菊石獸","多刺菊石獸","化石盔","鐮刀盔","化石翼龍","卡比獸","急凍鳥","閃電鳥","火焰鳥","迷你龍","哈克龍","快龍","超夢","夢幻"],
	rarity:{
		"Very Common":"C",
		"Common":"C",
		"Uncommon":"B",
		"Rare":"B",
		"Very Rare":"A",
		"Special":"A",
		"Epic":"S",
		"Legendary":"S",
		index:{
			"C":1,
			"B":2,
			"A":3,
			"S":4
		}
	}
}
var settings = {
	rarity_show:{
		1:true,
		2:true,
		3:true,
		4:true
	}
}

var map;
$('.map').tinyMap({
	autoLocation: true,
    'center': ['25.0364555','121.4322167'],
    'zoom'  : 18,
    'event' : {
        created: function () {
	        // getPokemonsOnMap();
    	},
    	// @Unnecessary
    	//dragend: function () {
	    //    getPokemonsOnMap();
  		//},
  		//zoom_changed: function(){
		//	scale = 0.25 + ($('.map').tinyMap("get","map").zoom - 17)*0.10;
  		//	console.log(scale)
  		//}
    },
    'disableDefaultUI':true,
    'mapTypeControl':false,
    styles:((new Date()).getHours() < 6 || (new Date()).getHours() >= 18)?mapStyle.night:mapStyle.day
});

function getPokemonsOnMap( ){
    map = $('.map').tinyMap('get', 'map');
    lat = map.getCenter().lat()
    lng = map.getCenter().lng()
	$.ajax({
		url:"/map?lat="+lat+"&lng="+lng,
		success:function(data){
			scale = 0.25 + ($('.map').tinyMap("get","map").zoom - 17)*0.10;
			pokemons = [];
			$.each(data,function(i,d){
				id = d[0]+"_"+d[3];
				if( getMarker(id) )return; // if is already on map !
				time = timeLeft( d[3] ).min;
				// console.log(pokedex[d[0]].rarity, rarity.indexOf(pokedex[d[0]].rarity)) ;
				pokemons.push(
					{
						id  : id,
						category:"pokes",
						addr: [d[1],d[2]],
						// text: "<p class='center'>"+"</br>剩餘 "+timeLeft(d[3]).min+' 分 '+timeLeft(d[3]).sec+' 秒</p>',
						// 'newLabel': timeLeft( d[3] ).min+':'+timeLeft( d[3] ).sec,
    					// 'newLabelCSS': 'labels',
						icon: {
            			    url: '/static/images/poke('+d[0]+').png',
            			    scaledSize:[p_size[d[0]][0]*scale,p_size[d[0]][1]*scale]
			            },
			            name: pokedex[d[0]].name,
			            rarity:pokedex[d[0]].rarity,
			            l18n: {
			            	id:d[0],
			            	rarity: l18n.rarity.index[ l18n.rarity[pokedex[d[0]].rarity] ],
			            	name:l18n.name[d[0]],
			            },
			            expire:false,
			            time: d[4],
			            visible:settings.rarity_show[l18n.rarity.index[ l18n.rarity[pokedex[d[0]].rarity] ]]
					}
				);
			})
			$(".map").tinyMap('modify', {
                marker: pokemons
            });
		}
	})

}
function getLures(){
	$.ajax({
		url:"/lure",
		success:function(data){
			lures = []
			update = Date.now();
			curlures = getAllMarkersAsArray("lures");
			eachD = null;
			$.each(data,function(i,d){
				exist = false;
				$.each(curlures,function(ci,cd){
					if(d.id == cd.id){
						d.time = update;
						exist = true;
						return true;
					}
				});
				if( !exist ){				
					lures.push({
						category:"lures",
						id:d.id,
						addr:[d.lat,d.lng],
						icon:{
							url: '/static/images/lure.png',
						},
						visible:true,
						time: update
					})
				}
			})
			$.each(curlures,function(ci,cd){
				if(cd.time != update){
					cd.visible = false;
				}
			});
			$(".map").tinyMap('modify', {
                marker: lures
            });
		}
	})
}
function getBots(){
	bots = getAllMarkersAsArray("bots");
	$.each( bots, function(i,d){
		d.setVisible(false);
	});
	$.ajax({
		url:"/bot",
		success:function(data){
			bots = []
			$.each(data,function(i,d){
				bots.push({
					id:d[0],
					category:"bots",
					addr:[d[1],d[2]],
					icon:{
						url: '/static/images/bot.png',
					},
					visible:true
				})
			})
			$(".map").tinyMap('modify', {
                marker: bots
            });
		}
	})
}
function timeLeft( time ){
	if((time+"").length == 10) time*=1000;

	min = Math.floor(Date.now())+" "+time;
	min = (Math.floor((Math.floor(Date.now())- time)/60000)) +"";
	sec = (Math.floor((Math.floor(Date.now())-time)/1000)%60) + "";
	return {
		min:"00".substring(0, "00".length - min.length) + min,
		sec:"00".substring(0, "00".length - sec.length) + sec
	};
}
function getMarker(id){
	markers = getAllMarkers(); // refresh markers
	index = -1;
	$.each(markers, function(i,d){
		if(markers[i].id == id){
			index = i;
			return true;
		}
	});
	return index > -1?markers[index]:false;
}
function getAllMarkers(){
	return $(".map").tinyMap('get', {'marker':[]}).marker;
}
function getAllMarkersAsArray(category){
	m = $(".map").tinyMap('get', {'marker':[]}).marker;
	ml = [];
	$.each(m, function(i,d){
		if( typeof category !== 'undefined' ){
			if( d.category == category ){
				ml.push(d)
			}		
		} else {
			ml.push(d);			
		}
	});
	return ml;
}
function getPokeMarkersByRarity(rare){
	m = $(".map").tinyMap('get', {'marker':[]}).marker;
	ml = [];
	rare = (isNaN(parseInt(rare))?l18n.rarity.index[rare]:parseInt(rare));
	$.each(m, function(i,d){
		if( !d.expire && d.category == "pokes" && d.l18n.rarity === rare ){
			ml.push(d)
		}		
	});
	return ml;
}
function listRarity(){
	m = $(".map").tinyMap('get', {'marker':[]}).marker;
	$.each(m, function(i,d){
		if( d.category == "pokes" ){
			console.log( d.l18n.name, d.rarity );
		}		
	});
}
function triggerMarker(trigger,rare){
	rare2inx = (isNaN(parseInt(rare))?l18n.rarity.index[rare]:parseInt(rare));
	ml = getPokeMarkersByRarity(rare2inx);
	$.each(ml,function(i,d){
		if( !d.expire ) d.setVisible(trigger.checked)
	})
	settings.rarity_show[rare2inx] = trigger.checked;
	Materialize.toast("<span class=noto>"+(trigger.checked?"將顯示":"已隱藏")+rare+"級</span>", 3000, 'rounded') 
}

function requestLoop() {
	getLures();
	getPokemonsOnMap()
}


$(".overlay-markercontrol").hover(function(){
	$(this).removeClass("markercontrol-blur").addClass("markercontrol-hover");

},function(){
	$(this).removeClass("markercontrol-hover").addClass("markercontrol-blur");
})

$(".overlay-markercontrol").on('touchstart', function () {
	$(this).removeClass("markercontrol-blur").addClass("markercontrol-hover");
});
$(".overlay-markercontrol").on('touchend', function () {
	setTimeout(function(){
		$(".overlay-markercontrol").removeClass("markercontrol-hover").addClass("markercontrol-blur");
	},5000)
});
$(".menubtn").click(function(){
	$(".menubtn ul").css({"visibility":"visible"});
	$(".itembtn").removeClass("inactive").addClass("active");
	setTimeout(function(){
		$(".menubtn ul").css({"visibility":"hidden"});
		$(".itembtn").removeClass("active").addClass("inactive");
	},3000)
})
setTimeout(function(){
	$(".loading").fadeOut("slow");
	$(".overlay-markercontrol").removeClass("markercontrol-hover").addClass("markercontrol-blur");
    $("#rare_C").trigger("click");
	requestLoop();
},500)
setInterval(function(){requestLoop()},30000);
if( window.location.hash == "#bot" ){
	setInterval(function(){getBots()},10000);
}
setInterval(function(){
	markers = getAllMarkersAsArray("pokes"); // refresh markers
	markersUpdate = [];
	$.each(markers, function(i,d){
/*		if(true||d.expire || parseInt(timeLeft(d.time).min) > 15 ){//&& parseInt(timeLeft(d.time).min) < 0){
			d.setVisible(false);
			d.expire = true;
			d.infoWindow.close();
		} else {*/
			d.text = "<p class='center'>"+d.l18n.name+"</br>自發現已過 "+timeLeft(d.time).min+' 分 '+timeLeft(d.time).sec+' 秒</p>'
			d.addr = [d.position.lat,d.position.lng]
			markersUpdate.push(d);
			d.visible = settings.rarity_show[d.l18n.rarity]
		//}
	});
	$(".map").tinyMap('modify', {
        marker: markersUpdate
    });
    $("label[for=rare_C]").html("稀有度 C ("+getPokeMarkersByRarity("C").length+")");
    $("label[for=rare_B]").html("稀有度 B ("+getPokeMarkersByRarity("B").length+")");
    $("label[for=rare_A]").html("稀有度 A ("+getPokeMarkersByRarity("A").length+")");
    $("label[for=rare_S]").html("稀有度 S ("+getPokeMarkersByRarity("S").length+")");
},1000) 
