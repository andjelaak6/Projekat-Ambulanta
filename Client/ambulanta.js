import { Karton } from "./karton.js";
import { Terapija } from "./terapija.js";
import { Lek } from "./lek.js";

export class Ambulanta {
  constructor(naziv, id) {
    this.naziv = naziv != null ? naziv : "NN";
    this.id = id;
    this.kartoni = [];
    this.container = null;
  }

  dodajKartonuListu(karton) {
    this.kartoni.push(karton);
  }

  crtaj(rod) {
    this.container = document.createElement("div");
    this.container.className = "ambulanta";
    rod.appendChild(this.container);

    const ime = document.createElement("h1");
    ime.innerHTML = this.naziv;
    ime.className = "naziv";
    this.container.appendChild(ime);

    const sadrzaj = document.createElement("div");
    sadrzaj.className = "sadrzaj";
    this.container.appendChild(sadrzaj);

    this.crtajTabelu(sadrzaj);
    this.crtajFormu(sadrzaj);
  }

  crtajFormu(roditelj) {
    let desniDeo = document.createElement("div");
    desniDeo.className = "desniDeo";
    roditelj.appendChild(desniDeo);

    let forma = document.createElement("div");
    forma.className = "forma";

    let dugme = document.createElement("button");
    dugme.className = "dugme";
    dugme.innerHTML = "Dodaj karton";
    dugme.onclick = (event) => this.kreirajKarton();
    desniDeo.appendChild(dugme);

    desniDeo.appendChild(forma);
  }

  kreirajKarton() {
    const forma = this.resetujDesniDeo();
    forma.classList.add("okvir");

    let naslov = document.createElement("h3");
    naslov.innerHTML = "Kreiraj karton";
    forma.appendChild(naslov);

    let grupa = document.createElement("div");
    grupa.className = "input-grupa";
    forma.appendChild(grupa);

    let labela = document.createElement("label");
    labela.innerHTML = "LBO: ";
    grupa.appendChild(labela);

    let input = document.createElement("input");
    input.className = "input-lbo";
    input.maxLength = 12;
    grupa.appendChild(input);

    grupa = document.createElement("div");
    grupa.className = "input-grupa";
    forma.appendChild(grupa);

    labela = document.createElement("label");
    labela.innerHTML = "Ime: ";
    grupa.appendChild(labela);

    input = document.createElement("input");
    input.className = "input-ime";
    input.maxLength = 60;
    grupa.appendChild(input);

    grupa = document.createElement("div");
    grupa.className = "input-grupa";
    forma.appendChild(grupa);

    labela = document.createElement("label");
    labela.innerHTML = "Prezime: ";
    grupa.appendChild(labela);

    input = document.createElement("input");
    input.className = "input-prezime";
    input.maxLength = 60;
    grupa.appendChild(input);

    let dugme = document.createElement("button");
    dugme.className = "dugme";
    dugme.innerHTML = "Kreiraj karton";
    dugme.onclick = (event) => this.posaljiNoviKarton();
    forma.appendChild(dugme);
  }

  posaljiNoviKarton() {
    const lbo = this.container.querySelector(".input-lbo").value;
    const ime = this.container.querySelector(".input-ime").value;
    const prezime = this.container.querySelector(".input-prezime").value;
    if (!lbo) {
      alert("Unesite lbo.");
    } else if (lbo.length != 12) {
      alert("Duzina LBO mora biti 12 karaktera.");
    } else if (!ime) {
      alert("Unesite ime.");
    } else if (!prezime) {
      alert("Unesite prezime.");
    } else {
      const karton = new Karton();
      karton.lbo = lbo;
      karton.ime = ime;
      karton.prezime = prezime;
      karton.datumIzdavanja = new Date();
      fetch(
        "https://localhost:5001/Ambulanta/DodajKarton/AmbulantaId=" + this.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...karton, datumIzdavanja: karton.datumIzdavanja.toISOString() }),
        }
      ).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            karton.id = res.id;
          });
          this.dodajKartonuListu(karton);
          const tabela = this.container.querySelector(".tabela");
          this.crtajJedanKarton(karton, tabela);
          this.resetujDesniDeo();
        }
      });
    }
  }

  resetujDesniDeo() {
    let forma = this.container.querySelector(".forma");
    forma.innerHTML = "";
    forma.classList.remove("okvir");
    return forma;
  }

  crtajTabelu(roditelj) {
    const kolone = ["LBO", "Pacijent", "Datum testiranja", "Terapija", ""];

    let tabela = document.createElement("table");
    tabela.className = "tabela";
    roditelj.appendChild(tabela);

    let prvaVrsta = document.createElement("tr");
    tabela.appendChild(prvaVrsta);

    let celija;
    kolone.forEach((naslov) => {
      celija = document.createElement("th");
      celija.innerHTML = naslov;
      prvaVrsta.appendChild(celija);
    });

    this.crtajKartone(tabela);
  }

  crtajKartone(tabela) {
    this.kartoni.forEach((karton) => this.crtajJedanKarton(karton, tabela));
  }

  crtajJedanKarton(karton, tabela) {
    const vrsta = document.createElement("tr");
    vrsta.className = "vrsta";
    tabela.appendChild(vrsta);

    let celija = document.createElement("td");
    celija.innerHTML = karton.lbo;
    vrsta.appendChild(celija);

    celija = document.createElement("td");
    celija.innerHTML = `${karton.ime} ${karton.prezime}`;
    vrsta.appendChild(celija);

    celija = document.createElement("td");
    celija.innerHTML = `${this.formatirajdatum(karton.datumIzdavanja)}`;
    vrsta.appendChild(celija);


    celija = document.createElement("td");
    celija.className = "celija-dugmici";
    vrsta.appendChild(celija);

    let vidiDugme = document.createElement("button");
    vidiDugme.innerHTML = "Prikazi terapije";
    vidiDugme.className = "dugme";
    vidiDugme.onclick = (ev) => this.prikaziTerapije(karton);
    celija.appendChild(vidiDugme);

    let kreirajTerapijuDugme = document.createElement("button");
    kreirajTerapijuDugme.innerHTML = "Dodaj terapiju";
    kreirajTerapijuDugme.className = "dugme";
    kreirajTerapijuDugme.onclick = (ev) => this.kreirajTerapiju(karton);
    celija.appendChild(kreirajTerapijuDugme);

    celija = document.createElement("td");
    vrsta.appendChild(celija);

    let izbrisiKartonDugme = document.createElement("button");
    izbrisiKartonDugme.innerHTML = "Izbrisi Karton";
    izbrisiKartonDugme.onclick = (ev) => this.izbrisiKarton(karton);
    izbrisiKartonDugme.className = "dugme";
    celija.appendChild(izbrisiKartonDugme);
  }
  formatirajdatum(datumIzdavanja) {
    return ("00" + (datumIzdavanja.getMonth() + 1)).slice(-2) + "/" +
      ("00" + datumIzdavanja.getDate()).slice(-2) + "/" +
      datumIzdavanja.getFullYear() + " " +
      ("00" + datumIzdavanja.getHours()).slice(-2) + ":" +
      ("00" + datumIzdavanja.getMinutes()).slice(-2)
  }

  prikaziTerapije(karton) {
    const forma = this.resetujDesniDeo();
    forma.classList.add("okvir"); // ILI SKLONI

    fetch("https://localhost:5001/Karton/KartonId=" + karton.id + "/Terapije", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          karton.terapije = [];
          data.forEach((terapija) => {
            console.log(terapija)
            const ter = new Terapija(
              terapija["uputstvo"],
              terapija["id"],
               terapija["lek"]
              
            );
            karton.dodajTerapiju(ter);
          });
          karton.crtajTerapije(forma);
        });
      }
    });
  }

  kreirajTerapiju(karton) {
    let forma = this.resetujDesniDeo();
    forma.classList.add("okvir");

    let grupa = document.createElement("div");
    grupa.className = "input-grupa";
    forma.appendChild(grupa);

    let labela = document.createElement("label");
    labela.innerHTML = "Lek: ";
    grupa.appendChild(labela);

    const selektor = document.createElement("select");
    selektor.className = "lek-selektor";
    grupa.appendChild(selektor);

    this.iscrtajLekove(selektor);

    grupa = document.createElement("div");
    grupa.className = "input-grupa";
    forma.appendChild(grupa);

    labela = document.createElement("label");
    labela.innerHTML = "Uputstvo: ";
    grupa.appendChild(labela);

    const textArea = document.createElement("textarea");
    textArea.className = "input-uputstvo";
    textArea.maxLength = 255;
    grupa.appendChild(textArea);

    let dugme = document.createElement("button");
    dugme.className = "dugme";
    dugme.innerHTML = "Dodaj terapiju";
    dugme.onclick = (event) => this.dodajTerapiju(karton.id);
    forma.appendChild(dugme);
  }

  iscrtajLekove(selektor) {
    fetch("https://localhost:5001/Lek/Lekovi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          data.forEach((lek) => {
            const lekZaTerapiju = new Lek(lek["naziv"], lek["proizvodjac"], lek["id"]);
            const opcija = document.createElement("option");
            opcija.className = "lek";
            opcija.innerHTML = `${lekZaTerapiju.naziv}, ${lekZaTerapiju.proizvodjac}`;
            opcija.value = lekZaTerapiju.id;
            selektor.appendChild(opcija);
          });
        });
      }
    });
  }

  dodajTerapiju(kartonId) {
    const uputstvo = this.container.querySelector(".input-uputstvo").value;
    const selektor = this.container.querySelector(".lek-selektor");
    const opcije = this.container.querySelectorAll(".lek");
    const izabraniLekId = opcije[selektor.selectedIndex].value;
    if (!uputstvo) {
      alert("Unesite uputstvo.");
    } else {
      const terapija = this.vratiTerapiju(uputstvo);
      fetch(
        "https://localhost:5001/Terapija/DodajTerapiju/KartonId=" + kartonId + "/LekId=" + izabraniLekId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...terapija,
          }),
        }
      ).then((rezultat) => {
        if (rezultat.ok) {
          rezultat.json().then((rezultat) => {
            console.log(rezultat)
            terapija.id = rezultat.id;
            terapija.lek = rezultat.lek;
          });
          this.resetujDesniDeo();
        }
      });
    }
  }

  vratiTerapiju(uputstvo) {
    const terapija = new Terapija();
    terapija.uputstvo = uputstvo;
    return terapija;
  }


  izbrisiKarton(karton) {
    fetch(
      "https://localhost:5001/Ambulanta/IzbrisatiKarton/KartonId=" + karton.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        this.prikaziBezKartona(karton);
      }
    });
  }

  prikaziBezKartona(karton) {
    const index = this.kartoni.findIndex((el) => el.id === karton.id);
    this.kartoni.splice(index, 1);
    const tabela = this.container.querySelector(".tabela");
    tabela.deleteRow(index + 1);
  }
}
