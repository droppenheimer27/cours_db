using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Pawliner.DataProvider.Context;
using Pawliner.DataProvider.Models;
using Pawliner.Web.Common;
using Pawliner.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Pawliner.Web.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationContext _database;

        public AccountController()
        {
            _database = new ApplicationContext();
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _database.AspNetUsers.FirstOrDefaultAsync(u => u.UserName == model.UserName);
                if (user != null)
                {
                    var identity = GetIdentity(model.UserName, model.Password);
                    if (identity == null)
                    {
                        return BadRequest();
                    }

                    var now = DateTime.UtcNow;
                    var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSUER,
                            audience: AuthOptions.AUDIENCE,
                            notBefore: now,
                            claims: identity.Claims,
                            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                    var response = new
                    {
                        token = encodedJwt,
                        userName = identity.Name,
                        userId = user.Id
                    };

                    return Ok(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                }
            }

            return BadRequest();
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> Register(AspNetUser model)
        {
            if (ModelState.IsValid)
            {
                var user = await _database.AspNetUsers.FirstOrDefaultAsync(u => u.UserName == model.UserName);
                if (user == null)
                {
                    _database.Database.ExecuteSqlCommand("dbo.REGISTER_USER @id, @userName, @passHash", 
                        new SqlParameter("@id", Guid.NewGuid().ToString()), 
                        new SqlParameter("@userName", model.UserName),
                        new SqlParameter("@passHash", model.PasswordHash));

                    var identity = GetIdentity(model.UserName, model.PasswordHash);
                    if (identity == null)
                    {
                        return BadRequest();
                    }

                    var now = DateTime.UtcNow;
                    var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSUER,
                            audience: AuthOptions.AUDIENCE,
                            notBefore: now,
                            claims: identity.Claims,
                            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                    var response = new
                    {
                        access_token = encodedJwt,
                        userName = identity.Name
                    };

                    return Ok(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                }
            }
            return BadRequest();
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            var user = _database.AspNetUsers.FirstOrDefault(x => x.UserName == username && x.PasswordHash == password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }
    }
}
