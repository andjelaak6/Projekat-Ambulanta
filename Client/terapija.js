export class Terapija {
  constructor(uputstvo, lek, id) {
    this.uputstvo = uputstvo != null ? uputstvo : "";
    this.id = id;
    this.lek = lek;
    this.container = null;
  }

  crtaj(roditeljskiDiv) {
    this.container = null;
    
    this.container = document.createElement("div");
    this.container.className = "terapija";
    roditeljskiDiv.appendChild(this.container);

    let grupa = document.createElement("div");
    grupa.className = "terapija-info";
    this.container.appendChild(grupa);

    let labela = document.createElement("label");
    labela.innerHTML = "Lek: ";
    grupa.appendChild(labela);

    labela = document.createElement("label");
    labela.innerHTML = `${this.lek.naziv}, ${this.lek.proizvodjac}`;
    console.log(this);
    grupa.appendChild(labela);

    grupa = document.createElement("div");
    grupa.className = "terapija-info";
    this.container.appendChild(grupa);

    labela = document.createElement("label");
    labela.innerHTML = "Uputstvo: ";
    grupa.appendChild(labela);

    const textArea = document.createElement("textarea");
    textArea.className = "input-uputstvo";
    textArea.maxLength = 255;
    textArea.value = this.uputstvo;
    grupa.appendChild(textArea);

    const izmeniTerapijuDugme = document.createElement("button");
    izmeniTerapijuDugme.className = "dugme";
    izmeniTerapijuDugme.innerHTML = `Izmeni terapiju`;
    izmeniTerapijuDugme.onclick = (ev) => this.izmeniTerapiju();
    this.container.appendChild(izmeniTerapijuDugme);
  }

  izmeniTerapiju() {
    const uputstvo = this.container.querySelector(".input-uputstvo").value;
    if (!uputstvo) {
      alert("Mora se uneti uputstvo.");
    } else if (uputstvo == this.uputstvo) {
      alert("Uputstvo koje ste uneli je neizmenjeno.");
    } else {
      this.posaljiIzmenjenuTerapiju(uputstvo);
    }
  }

  posaljiIzmenjenuTerapiju(uputstvo) {
    fetch("https://localhost:5001/Terapija/IzmeniTerapiju/TerapijaId=" + this.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...this,
        uputstvo
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          this.uputstvo=data["uputstvo"]
          this.lek=data["lek"]
        });
      }
    });
  }
}
