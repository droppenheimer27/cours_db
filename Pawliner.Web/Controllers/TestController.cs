using Microsoft.AspNetCore.Mvc;

namespace Pawliner.Web.Controllers
{
    [Route("api")]
    [ApiController]
    public class TestController : ControllerBase
    { 
        [HttpGet("ping")]
        public ActionResult<string> Ping()
        {
            return "pong";
        }
    }
}
