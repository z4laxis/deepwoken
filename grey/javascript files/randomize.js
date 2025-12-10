// code i borrowed and modified: https://codepen.io/chiragbhansali/pen/EWppvy
// this covers all randomized elements on the website

var names, surname, luminant, serveradjective, servernoun, serverlocation;

    names = ["Cozen", "Walter", "Pebble", "Lance", "Grit", "Jackdaw", "Gale", "Crow", "Storm", "Valentine", "Wilson", "Wormwood", "Axon", "Banjo", "Izutsumi", "Hawk", "Jupiter", "Kronk", "Nova", "Padparadscha"];
    surnames = ["Ven", "Isket", "Leshi", "Raanad", "Olof", "Disali", "Zeshi", "Amarico", "Zeneke", "Hira", "Nemises", "Spellhardt", "Tulad", "Disii", "Corbet", "Sero", "Rethige", "Atamli", "Era", "Drakehardt"];
    luminant = ["Eastern Luminant", "Etrean Luminant", "The Depths"];
    serveradjective = ["Based", "Quick", "Prideful", "Impudent", "Gentle", "Spritely", "Prudent", "Warm", "Cunning", "Foolish", "Smiling", "Steadfast", "Conniving", "Angry", "Horrific", "Charming", "Snarky", "Elegant", "Crying", "Drowned"];
    servernoun = ["Lionfish", "Blindseer", "Visionshaper", "Vesperian", "Brick", "Sea", "Megalodaunt", "Mudskipper", "Thief", "Felinor", "Tiran", "Angel", "Island", "Galebreather", "Jellyfish", "Farmer", "Celestial", "Turtle", "Squire", "Magician"];
    serverlocation = ["New Jersey, USA", "Oregon, USA", "England, UK", "Tokyo, JP", "California, USA", "Florida, USA", "Unknown Region", "NSW, AU", "Illinois, USA", "Hesse, DE", "Instanced", "Texas, USA", "Virginia, USA", "São Paulo, BR", "Singapore, SG", "North Holland, NL", "Maharashtra, IN", "Mazovia, PL", "Paris, FR", "New York, USA"];

        // add the number of variables to the "* X" part

        function randomize() {
          var rand1 = Math.floor(Math.random() * 20);
          var rand2 = Math.floor(Math.random() * 20);
          var rand3 = Math.floor(Math.random() * 3 );
          var rand4 = Math.floor(Math.random() * 20);
          var rand5 = Math.floor(Math.random() * 20);
          var rand6 = Math.floor(Math.random() * 20);
          
          //there are six different variables because if theres just one it selects the same ones each time, making it not random

          var namesandsurnametext = names[rand1] + " " + surnames[rand2];
          document.getElementById('nameandsurname').innerHTML = namesandsurnametext;
          
          var luminanttext = luminant[rand3];
          document.getElementById('luminant').innerHTML = luminanttext;

          var servernametext = serveradjective[rand4] + " " + servernoun[rand5];
          document.getElementById('servername').innerHTML = servernametext;

          var serverlocationtext = serverlocation[rand6];
          document.getElementById('serverlocation').innerHTML = serverlocationtext;

        }
        randomize();