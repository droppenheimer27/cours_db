using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pawliner.Web.Controllers
{
    [Route("api")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet("ping")]
        public ActionResult<string> Ping()
        {
            return "pong";
        }
    }
}
