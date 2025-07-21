//
//
// $("input[type='checkbox']").on("change", function () {
//     if ($(this).is(":checked")) {
//         $(this).prop("value", true);
//     } else {
//         $(this).prop("value", false);
//     }
// })
//
// $.validator.addMethod(
//     "regex",
//     function (value, element, regexp) {
//         var re = new RegExp(regexp);
//         return this.optional(element) || re.test(value);
//     }
// );
//
// $(".validate-form").each(function (index) {
//     $(this).validate({
//         errorElement: "span",
//         errorClass: "validation-error",
//         highlight: function (element, errorClass, validClass) {
//             $(element).next(".bar").addClass("danger-bar");
//         },
//         unhighlight: function (element, errorClass, validClass) {
//             $(element).next(".bar").removeClass("danger-bar");
//         },
//         success: function (element, errorClass, validClass) {
//             $(element).next(".bar").removeClass("danger-bar");
//         }
//     });
// });
//
// const errorMessages = {
//     requiredError: "وارد کردن {0} الزامی می باشد",
//     emailAddressError: "{0} وارد شده الزامی می باشد",
//     minLengthError: "تعداد کاراکتر مجاز {0} عدد می باشد",
//     maxLengthError: "تعداد کاراکتر مجاز {0} عدد می باشد",
//     rangeError: "لطفا مقداری بین {0} و {1} وارد کنید",
//     numberError: "لطفا فقط عدد وارد کنید",
//
// }
//
// function initialValidators() {
//     $(".validate-required").each(function () {
//         const label = $(`label[for="${$(this).attr("id")}"]`).text();
//         const errorMessage = errorMessages.requiredError.replace("{0}", label);
//         $(this).rules("add", {
//             required: true,
//             messages: {
//                 required: errorMessage,
//             },
//         });
//     });
//
//     $(".validate-email").each(function () {
//         const label = $(`label[for="${$(this).attr("id")}"]`).text();
//         const requiredErrorMessage = errorMessages.requiredError.replace("{0}", label);
//         const emailAddressErrorMessage = errorMessages.emailAddressError.replace("{0}", label);
//         $(this).rules("add", {
//             required: true,
//             email: true,
//             messages: {
//                 required: requiredErrorMessage,
//                 email: emailAddressErrorMessage
//             },
//         });
//     });
//
//     $(".validate-min-length").each(function () {
//         const label = $(`label[for="${$(this).attr("id")}"]`).text();
//
//         const minLength = $(this).attr("minlength") || 0;
//         const minErrorMessage = errorMessages.minLengthError.replace("{0}", minLength);
//         $(this).rules("add", {
//
//             minlength: Number(minLength),
//             messages: {
//
//                 minlength: minErrorMessage
//             },
//         });
//     });
//
//     $(".validate-max-length").each(function () {
//         const label = $(`label[for="${$(this).attr("id")}"]`).text();
//
//         const maxLength = $(this).attr("maxlength") || 0;
//         const maxErrorMessage = errorMessages.maxLengthError.replace("{0}", maxLength);
//         $(this).rules("add", {
//
//             maxlength: Number(maxLength),
//             messages: {
//
//                 maxlength: maxErrorMessage
//             },
//         });
//     });
//
//     $(".validate-range").each(function () {
//         const label = $(`label[for="${$(this).attr("id")}"]`).text();
//         const requiredErrorMessage = errorMessages.requiredError.replace("{0}", label);
//         const min = $(this).attr("min") || 0;
//         const max = $(this).attr("max") || 0;
//
//         let rangeErrorMessage = errorMessages.rangeError.replace("{0}", min).replace("{1}", max);
//         let numberErrorMessage = errorMessages.numberError;
//
//         $(this).rules("add", {
//             required: true,
//             min: Number(min),
//             max: Number(max),
//             digits: true,
//             messages: {
//                 required: requiredErrorMessage,
//                 min: rangeErrorMessage,
//                 max: rangeErrorMessage,
//                 digits: numberErrorMessage
//             },
//         });
//     });
//
//     $(".validate-digit").each(function () {
//         let numberErrorMessage = errorMessages.numberError;
//
//         $(this).rules("add", {
//
//             digits: true,
//             messages: {
//
//                 digits: numberErrorMessage
//             },
//         });
//     });
//
//     $("[validate-regex]").each(function () {
//         let regex = $(this).data("regex-pattern");
//         let regexErrorMessage = $(this).data("regex-error");
//         $(this).rules("add", {
//             regex: regex,
//             messages: {
//                 regex: regexErrorMessage
//             },
//         });
//     });
//
// }
//
// function initialElementValidation(id) {
//     $(`#${id} .validate-element`).each(function () {
//         const label = $(`label[for="${$(this).attr("id")}"]`).text();
//         const errorMessage = errorMessages.requiredError.replace("{0}", label);
//         $(this).rules("add", {
//             required: true,
//             messages: {
//                 required: errorMessage,
//             },
//         });
//     });
// }
//
// initialValidators();
