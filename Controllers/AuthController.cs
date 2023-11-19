using GrowHub.DatabaseContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GrowHub.Models;
using System.IO;
using Microsoft.EntityFrameworkCore;
using GrowHub.Models.api;

namespace GrowHub.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static AppDataBaseContext db;
        private static UserManager<User> userManager;
        private static IConfiguration Configuration;
        private static IWebHostEnvironment host;
        
        public AuthController(IConfiguration configuration, AppDataBaseContext context, UserManager<User> manager, IWebHostEnvironment environment)
        {
            db = context;
            userManager = manager;
            Configuration = configuration;
            host = environment;
        }

        [HttpPost]
        public async Task<IActionResult> Login(Login req)
        {
            try 
            {
                var user = await userManager.FindByEmailAsync(req.Email);
                if (User != null && await userManager.CheckPasswordAsync(user, req.Password))
                {
                    return Ok(new
                    {
                        Token = GenerateJWTToken(user),
                        id = user.Id,
                        name = user.Name,
                        username = user.UserName,
                        email = user.Email,
                        role = user.Role,
                    });
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm] User req) {
            try
            {
                if (req.Role == "" || req.Name == "" || req.Email == "" || req.PhoneNumber == "")
                {
                    return BadRequest("Fields are empty");
                }
                if(req.Role == "comp")
                {
                    if (req.Clg_Roll_No == "" || req.Gc_Roll_No == "" )
                    {
                        return BadRequest("Fields are empty");
                    }
                }

                if (req.Role != "comp" && req.Role != "donor") return BadRequest();

                var userExist = await userManager.FindByEmailAsync(req.Email);
                if (userExist is not null)
                {
                    return BadRequest("Email already registered!");
                }

                if(req.Role == "comp")
                {
                    var clg = await db.Users.FirstOrDefaultAsync(f => f.Clg_Roll_No == req.Clg_Roll_No);
                    var gc = await db.Users.FirstOrDefaultAsync(f => f.Gc_Roll_No == req.Gc_Roll_No);

                    if (clg is not null && gc is not null)
                    {
                        return BadRequest("Roll number already registered!");
                    }
                }

                //string imagePath = "";
                //if (req.Role == "comp")
                //{
                //    var file = req.file;
                //    var filename = Path.GetFileName(file.FileName);
                //    imagePath = Path.Combine(host.WebRootPath, req.Clg_Roll_No, filename);

                //    // Create the directory if it doesn't exist
                //    var directory = Path.GetDirectoryName(imagePath);
                //    if (!Directory.Exists(directory))
                //    {
                //        Directory.CreateDirectory(directory);
                //    }

                //    if (file.Length > 0)
                //    {
                //        using (var fileStream = new FileStream(imagePath, FileMode.Create))
                //        {
                //            await file.CopyToAsync(fileStream);
                //        }
                //    }
                //}

                var username = req.Email.Split('@')[0];
                if (await db.Users.FirstOrDefaultAsync(f => f.UserName == username) != null)
                {
                    var tempUsername = username;
                    Random rand = new();
                    var attempts = 0;
                    while (true)
                    {
                        tempUsername = username + rand.Next(1, 99999);
                        if (await db.Users.FirstOrDefaultAsync(f => f.UserName == tempUsername) == null)
                        {
                            username = tempUsername;
                            break;
                        }

                        if (attempts > 20)
                            break;

                        attempts++;
                    }
                }

                User user = new()
                {
                    Name = req.Name,
                    Email = req.Email,
                    Role = req.Role,
                    PhoneNumber = req.PhoneNumber,
                    Gc_Roll_No = req.Gc_Roll_No,
                    Clg_Roll_No = req.Clg_Roll_No,
                    Account = req.Account,
                    Verify = false,
                    //ClgCard = imagePath,
                    UserName = username,
                };

                var result = await userManager.CreateAsync(user, req.PasswordHash);
                if (!result.Succeeded)
                    return BadRequest("User Creation Failed! Please check user details and try again.");

                return Ok("Succuss!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpGet]
        public bool VerifyToken()
        {
            return true;
        }

        private string GenerateJWTToken(User user)
        {
            DateTime expiryDate = DateTime.UtcNow.AddDays(1);
            var authClaims = new List<Claim>
                            {
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                new Claim(ClaimTypes.Email, user.Email),
                                new Claim(ClaimTypes.NameIdentifier, user.Id),
                                new Claim(ClaimTypes.Name, user.UserName),
                                new Claim(ClaimTypes.Role, user.Role),
                                new Claim(ClaimTypes.Expiration, expiryDate.ToString()),
                            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                expires: expiryDate,
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //[HttpGet]
        //public string JWTToken()
        //{
        //    DateTime expiryDate = DateTime.UtcNow.AddDays(1);
        //    var authClaims = new List<Claim>
        //                    {
        //                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //                        new Claim(ClaimTypes.Email, "email@email.com"),
        //                        new Claim(ClaimTypes.NameIdentifier, "1324151512"),
        //                        new Claim(ClaimTypes.Expiration, expiryDate.ToString()),
        //                    };

        //    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]));

        //    var token = new JwtSecurityToken(
        //        expires: expiryDate,
        //        claims: authClaims,
        //        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}
    }
}
