﻿using BlogManager.Data.Context;
using Microsoft.EntityFrameworkCore;
using BlogManager.Core.Statics;
using BlogManager.IOC;

namespace BlogManager.Extentions
{
    public static class HostingExtension
    {
        public static WebApplication ConfigServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllersWithViews();
            builder.Configuration.GetSection("FilePaths").Get<FilePaths>();

            #region DbConnection

            builder.Services.AddDbContext<BlogManagerContext>(option =>
            {
                option.UseSqlServer(builder.Configuration.GetConnectionString("BlogMangerConnection"));
            });

            #endregion
            builder.Services.RegisterServices();
            return builder.Build();
        }


        public static void ConfigPipLines(this WebApplication app)
        {
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthorization();

            app.MapStaticAssets();

            app.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}")
                .WithStaticAssets();


            app.Run();
        }
    }
}
