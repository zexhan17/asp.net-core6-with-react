using GrowHub.DatabaseContext;
using GrowHub.Models;
using GrowHub.Models.api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GrowHub.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private static AppDataBaseContext db;
        private static UserManager<User> userManager;

        public AdminController(AppDataBaseContext context, UserManager<User> manager)
        {
            db = context;
            userManager = manager;
        }

        [HttpGet]
        public async Task<List<Transaction>> GetAllTransactions()
        {
            try
            {
                return await db.Transactions.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<List<User>> GetAllCompaigners()
        {
            try
            {
                return await db.Users.Where(w => w.Role == "comp" && w.Verify == true).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<List<User>> GetAllDonors()
        {
            try
            {
                return await db.Users.Where(w => w.Role == "donor").ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        [HttpGet]
        public async Task<List<User>> GetRequests()
        {
            try
            {
                return await db.Users.Where(w => w.Role == "comp" && w.Verify == false).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<bool> VerifyCompaigner(string Id)
        {
            try
            {
                var user = await db.Users.FirstOrDefaultAsync(w => w.Id == Id);
                if (user == null) return false; 

                user.Verify = true;
                db.Update(user);
                db.SaveChanges();

                return true;
            }
            catch 
            {
                return false;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetCompaignById(Guid Id)
        {
            try
            {
                var res = await db.Compaigns.FirstOrDefaultAsync(f => f.Id == Id);
                if (res == null) return BadRequest("Doesn't exist");
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest("server error");
            }
        }

        [HttpPost]
        public async Task<bool> MakeManualTransaction(Transaction data)
        {
            try
            {
                db.Transactions.Add(data);
                if (await db.SaveChangesAsync() > 0) return true;
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateStats(Stat data)
        {
            try
            {
                if (data is null) return BadRequest("Data is required");
                var first = await db.Stats.FirstAsync();
                first.Donated = data.Donated;
                first.Needed = data.Needed;
                first.CompaignsCompleted = data.CompaignsCompleted;
                if (await db.SaveChangesAsync() > 0)
                    return Ok(first);
                return BadRequest("can't update");
            }
            catch
            {
                return BadRequest("Server Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AssignAdmin(Login req)
        {
            try
            {
                if (req.Email is null) return BadRequest("Fields are empty");
                
                var userExist = await userManager.FindByEmailAsync(req.Email);
                if (userExist is not null) return BadRequest("Email already registered!");
                
                User user = new()
                {
                    Name = "Admin",
                    Email = req.Email,
                    Role = "admin",
                    UserName = "@admin"
                };

                var result = await userManager.CreateAsync(user, req.Password);
                if (!result.Succeeded)
                    return BadRequest("User Creation Failed! Please check user details and try again.");

                return Ok("Succuss!");
            }
            catch
            {
                return BadRequest(false);
            }
        }

        [HttpGet]
        public async Task<List<Message>> GetMessages()
        {
            try
            {
                return await db.Messages.Include(i => i.User).ToListAsync();
            }
            catch
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<IActionResult> ChangeTransactionStatus(Guid Id)
        {
            try
            {
                var transaction = await db.Transactions.FirstOrDefaultAsync(f => f.Id == Id);
                if (transaction is null) return BadRequest("can't update");

                if(transaction.Status == "not verify")
                {
                    transaction.Status = "pending receivings";
                }
                else
                {
                    var compaign = await db.Compaigns.FirstOrDefaultAsync(f => f.Id == transaction.CompaignId);
                    if (compaign is null) return BadRequest("compaign not found");
                    
                    var newAmount  = transaction.Amount + Convert.ToDouble(compaign.DonatedMoney);
                    compaign.DonatedMoney = Convert.ToString(newAmount);
                    
                    var user = await db.Users.FirstOrDefaultAsync(f => f.Id == Convert.ToString(transaction.CompaignerId));
                    if (user is null) return BadRequest("user not found");
                    user.Receivings = user.Receivings + transaction.Amount;
                    
                    transaction.Status = "success";
                }

                if(await db.SaveChangesAsync() > 0)
                {
                    return Ok(transaction);
                }

                return BadRequest("can't update");
            }
            catch
            {
                return BadRequest("server error");
            }
        }
    }
}
