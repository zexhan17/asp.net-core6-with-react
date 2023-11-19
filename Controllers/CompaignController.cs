using GrowHub.DatabaseContext;
using GrowHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;

namespace GrowHub.Controllers  
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CompaignController : ControllerBase
    {
        private static AppDataBaseContext db;
        private static UserManager<User> userManager;

        public CompaignController(AppDataBaseContext context, UserManager<User> manager)
        {
            db = context;
            userManager = manager;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCompaign(Compaign comp)
        {
            try
            {
                var user = await userManager.FindByIdAsync(comp.AuthorId);
                if (user == null || user.Verify == false) return BadRequest("Not Allowed!");

                user.Compaigns++;
                await db.AddAsync(comp);
                if (await db.SaveChangesAsync() > 0) return Ok();
                return BadRequest("can't Make");
            }
            catch
            {
                return BadRequest("Server Error");
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<List<Compaign>> GetCompaignsById(string Id)
        {
            try
            {
                return await db.Compaigns.Where(w => w.AuthorId == Id).Include(i => i.User).ToListAsync();
            }
            catch
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<List<Compaign>> FundedCompaigns()
        {
            try
            {
                var res = await db.Compaigns.Where(w => w.Funded == true).Include(i => i.User).ToListAsync();
                return res;
            }
            catch
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<List<Compaign>> NonFundedCompaigns()
        {
            try
            {
                var data = await db.Compaigns.Where(w => w.Funded == false).Include(i => i.User).ToListAsync();
                return data;
            }
            catch
            {
                return null;
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> MarkCompaignCompleted(Guid Id)
        {
            try
            {
                var compaign = await db.Compaigns.FirstOrDefaultAsync(f => f.Id == Id);
                if (compaign is null) return BadRequest("Compaign Doesn't exist");
                
                compaign.Completed = true;
                if (await db.SaveChangesAsync() > 0) return Ok("success");
                
                return BadRequest("Can't Update");
            }
            catch
            {
                return BadRequest("Server Error!");
            }
        }
    }
}