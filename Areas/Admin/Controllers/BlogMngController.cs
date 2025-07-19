using BlogManager.Areas.Admin.Controllers.Common;
using Microsoft.AspNetCore.Mvc;

namespace BlogManager.Areas.Admin.Controllers;

public class BlogMngController : AdminBaseController
{
    // GET
    [HttpGet("BlogList")]
    public IActionResult BlogList()
    {
        return View();
    }
}