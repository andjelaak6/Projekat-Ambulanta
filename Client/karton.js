export class Karton {
    constructor(lbo, ime, prezime, id, datumIzdavanja) {
        this.ime = ime != null ? ime : "N";
        this.prezime = prezime != null ? prezime : "N";
        this.lbo = lbo != null ? lbo : "NN";
        this.id = id;
        this.datumIzdavanja = datumIzdavanja != null ? datumIzdavanja : new Date();
        this.terapije = [];
        this.container = null;

    }

    dodajTerapiju(terapija) {
        this.terapije.push(terapija);
    }

    crtajTerapije(roditeljskiDiv) {
        this.terapije.forEach((terapija) => {
            terapija.crtaj(roditeljskiDiv);
        })
    }

}