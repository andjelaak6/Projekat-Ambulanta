import { Ambulanta } from "./ambulanta.js";
import { Karton } from "./karton.js";

function IzaberiAmbulantu() {
  const bodyDiv = document.createElement("div");
  bodyDiv.className = "body-div";
  document.body.appendChild(bodyDiv);

  const naslov = document.createElement("h1");
  naslov.innerHTML = "Izaberite ambulantu";
  bodyDiv.appendChild(naslov);

  const selektor = document.createElement("select");
  selektor.className = "ambulanta-selektor";
  selektor.onchange = (ev) => prikaziAmbulantu();
  bodyDiv.appendChild(selektor);

  const ambulantaKontejner = document.createElement("div");
  ambulantaKontejner.className = "ambulanta-kontejner";
  document.body.appendChild(ambulantaKontejner);

  PreuzmiAmbulante(selektor);
}

function PreuzmiAmbulante(selektor) {
  fetch("https://localhost:5001/Ambulanta/Ambulante", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        data.forEach((ambulanta) => {
          const opcija = document.createElement("option");
          opcija.innerHTML = `${ambulanta["naziv"]}`;
          opcija.value = ambulanta.id;
          selektor.appendChild(opcija);
        });
      });
    }
  });
}

function prikaziAmbulantu() {
  const selektor = document.body.querySelector(".ambulanta-selektor");
  const izabranaAmbulantaId = selektor.value;
  fetch("https://localhost:5001/Ambulanta/AmbulantaId=" + izabranaAmbulantaId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const amb = new Ambulanta(data["naziv"], data["id"]);
        data["kartoni"].forEach((karton) => {
          const k = new Karton(
            karton["lbo"],
            karton["ime"],
            karton["prezime"],
            karton["id"],
            new Date(Date.parse(karton["datumIzdavanja"]))
          );
          amb.dodajKartonuListu(k); 
        });
        const ambulantaKontejner = document.body.querySelector(".ambulanta-kontejner");
        ambulantaKontejner.innerHTML = "";
        amb.crtaj(ambulantaKontejner);
      });
    }
  });
}

IzaberiAmbulantu();