
using Microsoft.AspNetCore.Mvc;

namespace BlogManager.Areas.Admin.ViewComponents;

public class AdminSiteLogoViewComponent() : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync(bool isMobile = false)
    {
 
        return View("AdminSiteLogo");
    }
}