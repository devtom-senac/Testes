using Microsoft.EntityFrameworkCore;
using StatusWS.Data;
using StatusWS.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policyBuilder =>
        {
            policyBuilder.WithOrigins("https://localhost:7009",
                                      "http://localhost:5171", "http://localhost:5173")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod();
        });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddSingleton<Microsoft.AspNetCore.Identity.IPasswordHasher<Employee>, Microsoft.AspNetCore.Identity.PasswordHasher<Employee>>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// COMENTADO PARA EVITAR CONFLITO DE PROTOCOLO (HTTP/HTTPS) NO DESENVOLVIMENTO LOCAL
// app.UseHttpsRedirection(); 

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
