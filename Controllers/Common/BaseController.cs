using BlogManager.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace BlogManager.Controllers.Common;

public class BaseController : Controller
{
    protected static string SweetAlertSuccessMessage = MessageKey.SweetAlertSuccessMessage;
    protected static string SweetAlertErrorMessage = MessageKey.SweetAlertErrorMessage;
    protected static string SweetAlertInfoMessage = MessageKey.SweetAlertInfoMessage;
    protected static string SweetAlertWarningMessage = MessageKey.SweetAlertWarningMessage;

    protected static string ToasterSuccessMessage = MessageKey.ToasterSuccessMessage;
    protected static string ToasterErrorMessage = MessageKey.ToasterErrorMessage;
    protected static string ToasterInfoMessage = MessageKey.ToasterInfoMessage;
    protected static string ToasterWarningMessage = MessageKey.ToasterWarningMessage;

    
        #region Notifications

    #region Sweet Alert

    public void ShowSweetAlertSuccessMessage() =>
        TempData[SweetAlertSuccessMessage] = "عملیات با موفقیت انجام شد";

    public void ShowSweetAlertSuccessMessage(string message) =>
        TempData[SweetAlertSuccessMessage] = message;

    public void ShowSweetAlertErrorMessage() =>
        TempData[SweetAlertErrorMessage] = "عملیات با شکست مواجه شد";

    public void ShowSweetAlertErrorMessage(string errorMessage) =>
        TempData[SweetAlertErrorMessage] = errorMessage;

    public void ShowSweetAlertInfoMessage(string message) =>
        TempData[SweetAlertInfoMessage] = message;

    public void ShowWarningMessage(string message) =>
        TempData[SweetAlertWarningMessage] = message;

    #endregion

    #region Toaster

    public void ShowToasterSuccessMessage() =>
        TempData[ToasterSuccessMessage] = "عملیات با موفقیت انجام شد";

    public void ShowToasterSuccessMessage(string message) =>
        TempData[ToasterSuccessMessage] = message;

    public void ShowToasterErrorMessage() =>
        TempData[ToasterErrorMessage] = "عملیات با شکست مواجه شد";

    public void ShowToasterErrorMessage(string errorMessage) =>
        TempData[ToasterErrorMessage] = errorMessage;

    public void ShowToasterInfoMessage(string message) =>
        TempData[ToasterInfoMessage] = message;

    public void ShowToasterWarningMessage(string message) =>
        TempData[ToasterWarningMessage] = message;

    #endregion

    #endregion

    #region Actions
    
    // protected IActionResult AjaxSubstitutionResult<TFilter>(TFilter filter, Result<TFilter> result) where TFilter : IAjaxSubsituationViewResult
    // {
    //     if (filter.IsAjax)
    //     {
    //         filter.IsAjax = false;
    //         return PartialView(result.Value);
    //     }
    //
    //     filter.IsAjax = false;
    //     return View(result.Value);
    // }

    #endregion

    #region Tools

    public object? PeekTempData(string key) =>
        TempData.Peek(key);

    public void KeepTempData(string key, object value)
    {
        TempData[key] = value;
        TempData.Keep(key);
    }

    public void RemoveTempData(string key) =>
        TempData.Remove(key);

    #endregion
}