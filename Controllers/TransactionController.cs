using GrowHub.DatabaseContext;
using GrowHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GrowHub.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    //[Authorize]
    public class TransactionController : ControllerBase
    {
        private static AppDataBaseContext db;

        public TransactionController(AppDataBaseContext context)
        {
            db = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveTransaction(Transaction data)
        {
            try
            {
                db.Transactions.Add(data);
                if (await db.SaveChangesAsync() > 0) return Ok(true);
                return BadRequest("can't make record, pls try again");
            }
            catch (Exception ex)
            {
                return BadRequest("server error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> TransferOnline(Guid Id)
        {
            try
            {
                var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var transaction = await db.Transactions.FirstOrDefaultAsync(f => f.Id == Id && f.CompaignerId == userId);
                if (transaction != null)
                {
                    transaction.ReqOnlineTransfer = true;
                    if(await db.SaveChangesAsync() > 0 ) return Ok();
                }
                return BadRequest("bad request");
            }
            catch
            {
                return BadRequest("server error");
            }
        }
    }
}
