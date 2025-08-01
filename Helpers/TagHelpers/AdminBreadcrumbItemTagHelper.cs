﻿using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace BlogManager.Helpers.TagHelpers;

public class AdminBreadcrumbItemTagHelper : TagHelper
{
    private const string ActionAttributeName = "asp-action";
    private const string ControllerAttributeName = "asp-controller";
    private const string AreaAttributeName = "asp-area";
    private const string PageAttributeName = "asp-page";
    private const string PageHandlerAttributeName = "asp-page-handler";
    private const string FragmentAttributeName = "asp-fragment";
    private const string HostAttributeName = "asp-host";
    private const string ProtocolAttributeName = "asp-protocol";
    private const string RouteAttributeName = "asp-route";
    private const string RouteValuesDictionaryName = "asp-all-route-data";
    private const string RouteValuesPrefix = "asp-route-";
    private const string Href = "href";
    private const string LastActiveItem = "last-active-item";

    private IDictionary<string, string> _routeValues;

    /// <summary>
    /// Creates a new <see cref="AnchorTagHelper"/>.
    /// </summary>
    /// <param name="generator">The <see cref="IHtmlGenerator"/>.</param>
    public AdminBreadcrumbItemTagHelper(IHtmlGenerator generator)
    {
        Generator = generator;
    }

    /// <inheritdoc />
    public override int Order => -1000;

    /// <summary>
    /// Gets the <see cref="IHtmlGenerator"/> used to generate the <see cref="AnchorTagHelper"/>'s output.
    /// </summary>
    protected IHtmlGenerator Generator { get; }

    /// <summary>
    /// The name of the action method.
    /// </summary>
    /// <remarks>
    /// Must be <c>null</c> if <see cref="Route"/> or <see cref="Page"/> is non-<c>null</c>.
    /// </remarks>
    [HtmlAttributeName(ActionAttributeName)]
    public string Action { get; set; }

    /// <summary>
    /// The name of the controller.
    /// </summary>
    /// <remarks>
    /// Must be <c>null</c> if <see cref="Route"/> or <see cref="Page"/> is non-<c>null</c>.
    /// </remarks>
    [HtmlAttributeName(ControllerAttributeName)]
    public string Controller { get; set; }

    /// <summary>
    /// The name of the area.
    /// </summary>
    /// <remarks>
    /// Must be <c>null</c> if <see cref="Route"/> is non-<c>null</c>.
    /// </remarks>
    [HtmlAttributeName(AreaAttributeName)]
    public string Area { get; set; }

    /// <summary>
    /// The name of the page.
    /// </summary>
    /// <remarks>
    /// Must be <c>null</c> if <see cref="Route"/> or <see cref="Action"/>, <see cref="Controller"/>
    /// is non-<c>null</c>.
    /// </remarks>
    [HtmlAttributeName(PageAttributeName)]
    public string Page { get; set; }

    /// <summary>
    /// The name of the page handler.
    /// </summary>
    /// <remarks>
    /// Must be <c>null</c> if <see cref="Route"/> or <see cref="Action"/>, or <see cref="Controller"/>
    /// is non-<c>null</c>.
    /// </remarks>
    [HtmlAttributeName(PageHandlerAttributeName)]
    public string PageHandler { get; set; }

    /// <summary>
    /// The protocol for the URL, such as &quot;http&quot; or &quot;https&quot;.
    /// </summary>
    [HtmlAttributeName(ProtocolAttributeName)]
    public string Protocol { get; set; }

    /// <summary>
    /// The host name.
    /// </summary>
    [HtmlAttributeName(HostAttributeName)]
    public string Host { get; set; }

    /// <summary>
    /// The URL fragment name.
    /// </summary>
    [HtmlAttributeName(FragmentAttributeName)]
    public string Fragment { get; set; }

    /// <summary>
    /// Name of the route.
    /// </summary>
    /// <remarks>
    /// Must be <c>null</c> if one of <see cref="Action"/>, <see cref="Controller"/>, <see cref="Area"/>
    /// or <see cref="Page"/> is non-<c>null</c>.
    /// </remarks>
    [HtmlAttributeName(RouteAttributeName)]
    public string Route { get; set; }

    /// <summary>
    /// Additional parameters for the route.
    /// </summary>
    [HtmlAttributeName(RouteValuesDictionaryName, DictionaryAttributePrefix = RouteValuesPrefix)]
    public IDictionary<string, string> RouteValues
    {
        get
        {
            if (_routeValues == null)
            {
                _routeValues = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            }

            return _routeValues;
        }
        set { _routeValues = value; }
    }

    /// <summary>
    /// Gets or sets the <see cref="Microsoft.AspNetCore.Mvc.Rendering.ViewContext"/> for the current request.
    /// </summary>
    [HtmlAttributeNotBound]
    [ViewContext]
    public ViewContext ViewContext { get; set; }


    /// <summary>
    /// if its the last active item in the breadcrumb it gets the class active and no link attached to it  
    /// </summary>
    [HtmlAttributeName(LastActiveItem)]
    public bool LastActiveLink { get; set; }

    /// <inheritdoc />
    /// <remarks>Does nothing if user provides an <c>href</c> attribute.</remarks>
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        ArgumentNullException.ThrowIfNull(context);
        ArgumentNullException.ThrowIfNull(output);


        if (LastActiveLink)
        {
            var cc = await output.GetChildContentAsync();
            output.TagName = "li";
            output.Attributes.SetAttribute("class", "breadcrumb-item");
            output.Content.SetHtmlContent($"<span class=\"badge fw-medium fs-2 bg-success-subtle text-success\">{cc.GetContent()}</span>");
            return;
        }


        // If "href" is already set, it means the user is attempting to use a normal anchor.
        if (output.Attributes.ContainsName(Href))
        {
            if (Action != null ||
                Controller != null ||
                Area != null ||
                Page != null ||
                PageHandler != null ||
                Route != null ||
                Protocol != null ||
                Host != null ||
                Fragment != null ||
                (_routeValues != null && _routeValues.Count > 0))
            {
                // User specified an href and one of the bound attributes; can't determine the href attribute.
                throw new InvalidOperationException("Could not create the link because href is already set");
            }

            return;
        }

        var hasRouteValues = !string.IsNullOrEmpty(Action) ||
                             !string.IsNullOrEmpty(Controller) ||
                             !string.IsNullOrEmpty(Area) ||
                             !string.IsNullOrEmpty(Page) ||
                             !string.IsNullOrEmpty(PageHandler) ||
                             !string.IsNullOrEmpty(Route) ||
                             !string.IsNullOrEmpty(Protocol) ||
                             !string.IsNullOrEmpty(Host) ||
                             !string.IsNullOrEmpty(Fragment) ||
                             (_routeValues != null && _routeValues.Count > 0);

        if (!hasRouteValues)
        {
            var cc = await output.GetChildContentAsync();
            output.TagName = "li";
            output.Attributes.SetAttribute("class", "breadcrumb-item d-flex align-items-center");
            output.Content.SetHtmlContent($"<a class=\"text-muted text-decoration-none d-flex\" href=\"javascript:void(0);\">{cc.GetContent()}</a>");
            return;
        }


        var routeLink = Route != null;
        var actionLink = Controller != null || Action != null;
        var pageLink = Page != null || PageHandler != null;

        if ((routeLink && actionLink) || (routeLink && pageLink) || (actionLink && pageLink))
        {
            throw new InvalidOperationException("Could not create the link because of conflicting attributes.");
        }

        RouteValueDictionary routeValues = null;
        if (_routeValues != null && _routeValues.Count > 0)
        {
            routeValues = new RouteValueDictionary(_routeValues);
        }

        if (Area != null)
        {
            // Unconditionally replace any value from asp-route-area.
            if (routeValues == null)
            {
                routeValues = new RouteValueDictionary();
            }

            routeValues["area"] = Area;
        }

        TagBuilder tagBuilder;
        if (pageLink)
        {
            tagBuilder = Generator.GeneratePageLink(
                ViewContext,
                linkText: string.Empty,
                pageName: Page,
                pageHandler: PageHandler,
                protocol: Protocol,
                hostname: Host,
                fragment: Fragment,
                routeValues: routeValues,
                htmlAttributes: null);
        }
        else if (routeLink)
        {
            tagBuilder = Generator.GenerateRouteLink(
                ViewContext,
                linkText: string.Empty,
                routeName: Route,
                protocol: Protocol,
                hostName: Host,
                fragment: Fragment,
                routeValues: routeValues,
                htmlAttributes: null);
        }
        else
        {
            tagBuilder = Generator.GenerateActionLink(
                ViewContext,
                linkText: string.Empty,
                actionName: Action,
                controllerName: Controller,
                protocol: Protocol,
                hostname: Host,
                fragment: Fragment,
                routeValues: routeValues,
                htmlAttributes: null);
        }
        
        
        var url = tagBuilder.Attributes["href"];
        var childContent = await output.GetChildContentAsync();
        output.TagName = "li";
        output.Attributes.SetAttribute("class", "breadcrumb-item d-flex align-items-center");
        output.Content.SetHtmlContent($"<a class=\"text-muted text-decoration-none d-flex\" href=\"{url}\">{childContent.GetContent()}</a>");
    }
}