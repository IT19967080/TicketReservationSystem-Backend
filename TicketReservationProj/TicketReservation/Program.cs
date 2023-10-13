/*
 * File: Program.cs
 * Description: Main entry point for the ASP.NET Core application.
 */

using Microsoft.Extensions.DependencyInjection;
using ticketreservation.Data;
using ticketreservation.Services;
using TicketReservation.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// Create a new instance of the WebApplicationBuilder.
var builder = WebApplication.CreateBuilder(args);

// Configure services and settings.
builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("ConnectionStrings"));

// Singleton services for dependency injection.
builder.Services.AddSingleton<TravellerServices>();
builder.Services.AddAuthentication().AddCookie("cookie");
builder.Services.AddAuthorization();
builder.Services.AddSingleton<TrainServices>();
builder.Services.AddSingleton<TrainDataServices>();
builder.Services.AddSingleton<TicketBookingServices>();
builder.Services.AddSingleton<AuthServices>();
builder.Services.AddSingleton<UserManagemntServices>();
builder.Services.AddControllersWithViews();

// Configure JWT Bearer authentication.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Build the application.
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseRouting();

// Configure controller routes.
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// Map fallback to an HTML file.
app.MapFallbackToFile("index.html");

// Start the application.
app.Run();
