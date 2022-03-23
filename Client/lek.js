export class Lek {
    constructor(naziv, proizvodjac, id) {
      this.naziv = naziv != null ? naziv : "N";
      this.proizvodjac = proizvodjac != null ? proizvodjac : "N";
      this.id = id;
    }
  }
  