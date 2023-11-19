using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GrowHub.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sender",
                table: "Messages",
                newName: "Sender");

            migrationBuilder.RenameColumn(
                name: "message",
                table: "Messages",
                newName: "Text");

            migrationBuilder.AddColumn<string>(
                name: "Tid",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Sender",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "RequiredMoney",
                table: "Compaigns",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "DonatedMoney",
                table: "Compaigns",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tid",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Sender",
                table: "Messages",
                newName: "sender");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Messages",
                newName: "message");

            migrationBuilder.AlterColumn<Guid>(
                name: "sender",
                table: "Messages",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<double>(
                name: "RequiredMoney",
                table: "Compaigns",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "DonatedMoney",
                table: "Compaigns",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
