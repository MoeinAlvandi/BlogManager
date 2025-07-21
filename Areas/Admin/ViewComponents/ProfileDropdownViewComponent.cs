using Microsoft.AspNetCore.Mvc;

namespace ArabicKeywordchi.Areas.Admin.ViewComponents;

public class ProfileDropdownViewComponent() : ViewComponent
{
    public async Task<IViewComponentResult> InvokeAsync()
    {
       
        return View("~/Areas/Admin/Views/Shared/Components/ProfileDropdown/ProfileDropdown.cshtml");
    }
}