using BlogManager.Areas.Admin.Controllers.Common;
using BlogManager.Core.Services.Impelemntation;
using BlogManager.Core.Services.Interfaces;
using BlogManager.Domain.ViewModels.Blog.Admin;
using Microsoft.AspNetCore.Mvc;

namespace BlogManager.Areas.Admin.Controllers;

public class BlogMngController(IBlogService blogService) : AdminBaseController
{
    // GET
    [HttpGet("BlogListManagement")]
    public async Task<IActionResult> BlogListManagement(AdminBlogViewModel filter, CancellationToken cancellationToken)
    {
        var model = await blogService.FilterAsync(filter, cancellationToken);
        return View(model);
    }
}