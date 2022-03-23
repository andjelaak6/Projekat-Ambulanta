using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TerapijaCovidaa.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ambulante",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambulante", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lekovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Proizvodjac = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lekovi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kartoni",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LBO = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    AmbulantaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kartoni", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kartoni_Ambulante_AmbulantaId",
                        column: x => x.AmbulantaId,
                        principalTable: "Ambulante",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Terapije",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LekId = table.Column<int>(type: "int", nullable: true),
                    Uputstvo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DatumIzdavanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KartonPacijentaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terapije", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Terapije_Kartoni_KartonPacijentaId",
                        column: x => x.KartonPacijentaId,
                        principalTable: "Kartoni",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Terapije_Lekovi_LekId",
                        column: x => x.LekId,
                        principalTable: "Lekovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kartoni_AmbulantaId",
                table: "Kartoni",
                column: "AmbulantaId");

            migrationBuilder.CreateIndex(
                name: "IX_Terapije_KartonPacijentaId",
                table: "Terapije",
                column: "KartonPacijentaId");

            migrationBuilder.CreateIndex(
                name: "IX_Terapije_LekId",
                table: "Terapije",
                column: "LekId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Terapije");

            migrationBuilder.DropTable(
                name: "Kartoni");

            migrationBuilder.DropTable(
                name: "Lekovi");

            migrationBuilder.DropTable(
                name: "Ambulante");
        }
    }
}
