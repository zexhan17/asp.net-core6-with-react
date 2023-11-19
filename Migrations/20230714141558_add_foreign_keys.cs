using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GrowHub.Migrations
{
    /// <inheritdoc />
    public partial class add_foreign_keys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SenderEmail",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Author",
                table: "Compaigns");

            migrationBuilder.DropColumn(
                name: "AuthorEmail",
                table: "Compaigns");

            migrationBuilder.AlterColumn<string>(
                name: "Sender",
                table: "Messages",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Compaigns",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Sender",
                table: "Messages",
                column: "Sender");

            migrationBuilder.CreateIndex(
                name: "IX_Compaigns_AuthorId",
                table: "Compaigns",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Compaigns_AspNetUsers_AuthorId",
                table: "Compaigns",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_Sender",
                table: "Messages",
                column: "Sender",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Compaigns_AspNetUsers_AuthorId",
                table: "Compaigns");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_Sender",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_Sender",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Compaigns_AuthorId",
                table: "Compaigns");

            migrationBuilder.AlterColumn<string>(
                name: "Sender",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "SenderEmail",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AuthorId",
                table: "Compaigns",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Compaigns",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AuthorEmail",
                table: "Compaigns",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
