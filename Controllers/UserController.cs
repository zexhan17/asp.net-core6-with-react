using GrowHub.DatabaseContext;
using GrowHub.Models;
using GrowHub.Models.api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace GrowHub.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private static AppDataBaseContext db;
        public UserController(AppDataBaseContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfileDetails()
        {
            try
            {
                var Id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await db.Users.FirstOrDefaultAsync(f => f.Id == Id);
                if(user == null)
                    return BadRequest("doesn't exist");
                return Ok(user);
            }
            catch
            {
                return BadRequest("System Error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> UpdateAccountNumber(string Id, string AccountNumber)
        {
            try
            {
                if (Id.IsNullOrEmpty() && AccountNumber.IsNullOrEmpty()) return BadRequest();
                var user = await db.Users.FirstOrDefaultAsync(f => f.Id == Id);
                if (user is null) return BadRequest("user doesn't exist");

                user.Account = AccountNumber;
                db.Update(user);
                return Ok(AccountNumber);
                //if (await db.SaveChangesAsync > 0) return Ok(AccountNumber);

                //return BadRequest();
            }
            catch
            {
                return BadRequest("Server Error!");
            }
        }

        [HttpPost]
        public async Task<bool> Contact(Message msg)
        {
            try
            {
                var email = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
                Message message = new()
                {
                    Sender = msg.Sender,
                    Text = msg.Text,
                };
                db.Messages.Add(message);
                if (await db.SaveChangesAsync() > 0)
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        [HttpGet]
        public async Task<Stat> GetStats()
        {
            try
            {
                return await db.Stats.FirstAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            try
            {
                var Id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var Tlist = await db.Transactions.Where(w => w.CompaignerId == Id && w.Status == "pending receivings" && w.ReqOnlineTransfer == false).ToListAsync();
                var compaigns = await db.Compaigns.Where(w => w.AuthorId == Id).Include(i => i.User).ToListAsync();
                
                List<NotificationResponse> res = new();
                
                Tlist.ForEach(e =>
                {
                    var comp = compaigns.FirstOrDefault(f => f.Id == e.CompaignId);
                    NotificationResponse notification = new()
                    {
                        Transaction = e,
                        Title = comp.Title
                    };
                    res.Add(notification);
                });
                
                return Ok(res);
            }
            catch
            {
                return BadRequest("server error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> CheckNotifications()
        {
            try
            {
                var Id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var Tlist = await db.Transactions.Where(w => w.CompaignerId == Id && w.Status == "pending receivings" && w.ReqOnlineTransfer == false).ToListAsync();
                return Ok(Tlist.Count);
            }
            catch
            {
                return BadRequest("server error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> EligibleForCompaign()
        {
            try
            {
                var Id = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await db.Users.FirstOrDefaultAsync(f => f.Id == Id);
                if (user != null)
                {
                    if (user.Verify == true) return Ok();
                } 
                return BadRequest();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
