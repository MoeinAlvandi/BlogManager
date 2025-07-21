using Microsoft.AspNetCore.Razor.TagHelpers;

namespace BlogManager.Helpers.TagHelpers;

public class AdminBreadcrumbTagHelper : TagHelper
{
    private const string PageTitleAttributeName = "page-title";

    /// <summary>
    /// title of the page
    /// </summary>
    [HtmlAttributeName(PageTitleAttributeName)]
    public string PageTitle { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var cc = await output.GetChildContentAsync();
        output.TagName = "div";
        output.Content.SetHtmlContent($"<div class=\"card card-body py-3 mb-0\">\n<div class=\"row align-items-center\">\n<div class=\"col-12\">\n<div class=\"d-flex flex-column flex-md-row align-items-end align-items-md-center justify-content-between\">\n<h4 class=\"mb-md-0 card-title\">{PageTitle}</h4>\n<nav aria-label=\"breadcrumb\" class=\"mt-2\">\n<ol class=\"breadcrumb\">\n<li class=\"breadcrumb-item d-flex align-items-center\">\n<a class=\"text-muted text-decoration-none d-flex\" href=\"/Admin/\">\n<iconify-icon icon=\"solar:home-2-line-duotone\" class=\"fs-6\"></iconify-icon>\n</a>\n</li>\n{cc.GetContent()}</ol>\n</nav>\n</div>\n</div>\n</div>\n</div>");
    }
}