using BlogManager.Areas.Admin.Controllers.Common;
using Microsoft.AspNetCore.Mvc;

namespace BlogManager.Areas.Admin.Controllers;

public class HomeController : AdminBaseController
{
    // GET
    [HttpGet("Administrator")]
    public IActionResult Index()
    {
        return View();
    }
}