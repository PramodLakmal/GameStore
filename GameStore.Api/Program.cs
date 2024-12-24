using GameStore.Api.Dtos;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<GameDto> games = [
    new (
        1,
        "The Last of Us Part II",
        "Action-adventure",
        59.99m,
        new DateOnly(2020, 6, 19)
    ),
    new (
        2,
        "Cyberpunk 2077",
        "Action role-playing",
        59.99m,
        new DateOnly(2020, 12, 10)
    ),
    new (
        3,
        "Death Stranding",
        "Action",
        59.99m,
        new DateOnly(2019, 11, 8)
    ),
    new (
        4,
        "The Witcher 3: Wild Hunt",
        "Action role-playing",
        39.99m,
        new DateOnly(2015, 5, 19)
    )

];

app.MapGet("/", () => "Hello World!");

app.Run();
