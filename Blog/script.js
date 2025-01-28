let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Sushi",  serca: 259,  czySerce: false, image: "zestaw-sushi-na-stole_140725-6831.jpg",  description: "Klasyczne japońskie danie składające się z ryżu, wodorostów i dodatków, takich jak ryby, warzywa czy owoce morza.<br><br> SKŁADNIKI: <br> 1. Ryż - 100g <br> 2. Wodorosty - 4 liście <br> 3. Ryba - 100g<br><br> SPOSÓB PRZYGOTOWANIA: <br> Krok 1: Ugotuj ryż <br> Krok 2: Ugotuj rybę <br> Krok 3: Ugotuj wodorosty <br> Krok 4: Zawiń ryż i rybę w wodorosta <br> Krok 5: Pokruj sushi <br> Krok 6: Przygotuj na talerzu i jedz :) " },
    { name: "Łosoś z burakiem", serca: 253, czySerce: false, image: "solony-losos-z-burakami_72772-414.jpg", description: "Wykwintne połączenie pieczonego łososia z kremowym puree z buraka – idealne na elegancki obiad. <br><br> SKŁADNIKI: <br> 1.Łosoś <br> 2. Burak <br> 3. Przyprawy <br><br> SPOSÓB PRZYGOTOWANIA: <br> nie wiem wsumie" },
    { name: "Imbir i Wasabi", serca: -42, czySerce: false, image: "toczy-sie-wewnatrz-czarnej-plyty-z-imbirem-i-wasabi_114579-3179.jpg", description: "Dodatek, który podkręca smak sushi – pikantne wasabi i marynowany imbir, który oczyszcza podniebienie. <br><br> SKŁADNIKI: <br> 1. Wasabi - 100g <br> 2. Imbir - 100g" },
    { name: "Sushi z Łososiem", serca: 93, czySerce: false, image: "sushi-paczki-z-lososiem-ogorkiem-i-rzodkiewka-na-ciemnym-widoku-z-gory_154293-6015.jpg", description: "Klasyczne sushi z delikatnym łososiem, idealne na kolację z nutą Japonii. <br><br> SKŁADNIKI: <br>1. Sushi z łososiem <br><br> SPOSÓB PRZYGOTOWANIA: <br> Krok 1: Potrawa jest gotowa :) " },
    { name: "Krewetki mniam mniam", serca: 0, czySerce: false, image: "widok-z-boku-na-roladki-sushi-z-krewetkami-awokado-i-serem-smietankowym-podawane-z-imbirem-i-wasabi-na-talerzu-na-drewnie_141793-11180.jpg", description: "Chrupiące krewetki w lekkiej panierce z sosem na bazie majonezu i słodkiego chili.Na to nie potrzeba przepisu :)" },
];


let currentIndex2 = 0;

function pokazProdukt() {
    const productContainer = document.getElementById('gallery');
    productContainer.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const productDiv = document.createElement('div');
        productDiv.className = 'content';
        productDiv.innerHTML = `
          <img src="${product.image}" alt="" onclick="popup2(${i})" class="top">
          <a href="#" onclick="popup2(${i})"><h3>${product.name}</h3></a>
          <hr>
          <div class="icons">
              <div class="down">
                  <span class="heart" onclick="zwiekszSerca(${i})">
                      <img src="heart.png" width="20px" height="20px" id="serduszko-${i}">
                  </span>
                  <span id="hearts-${i}">${product.serca}</span>
              </div>
          </div>
          <div id="cardPop-${i}" class="cardPop">
              <div class="overlay" onclick="popup2(${i})"></div>
              <div class="kontenciwo">
                  <div class="lewica">
                      <img src="${product.image}" alt="" id="cardPic">
                  </div>
                  <div class="prawica">
                      <h1>${product.name}</h1>
                      <p>${product.description}</p>
                  </div>
              </div>
          </div>`;
        productContainer.appendChild(productDiv);
    }
}

function zwiekszSerca(index) {
    if (!products[index].czySerce) {
        products[index].serca++;
        products[index].czySerce = true;
        document.getElementById(`hearts-${index}`).innerText = products[index].serca;

        let serce12 = document.getElementById("serduszko-${i}");
        serce12.src = "heart (1).png";
    } else {
        alert("Możesz kliknąć serce tylko raz!");
    }
}
let dishpic = document.getElementById("dish-pic");
let inputFile = document.getElementById("fileInput");


inputFile.onchange = function () {
    dishpic.src = URL.createObjectURL(inputFile.files[0]);
}
function popup() {
    document.getElementById("okienko").classList.toggle("active");
}
function popup2(index) {
    const cardPop = document.getElementById(`cardPop-${index}`);
    cardPop.classList.toggle('active');
}

function ProductAdd() {
    let nazwaDania = document.getElementById("dishName").value;
    let desc = document.getElementById("dishDesc").value;
    let imgInput = document.getElementById("fileInput");

    if (imgInput.files && imgInput.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let myObject = {
                name: nazwaDania,
                czySerce: false,
                serca: 0,
                image: e.target.result,
                description: desc,
            };


            products.push(myObject);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
       
        };
        reader.readAsDataURL(imgInput.files[0]);
    } else {
        alert("Proszę wybrać plik!");
    }
    document.getElementById("okienko").classList.toggle("active");
}

pokazProdukt();

