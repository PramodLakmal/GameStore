using GameStore.Api.Dtos;

namespace GameStore.Api.EndPoints;

public static class GamesEndPoints
{
    const string GetGameEndpointName = "GetGame";

    private static readonly List<GameDto> games = [
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

    public static RouteGroupBuilder MapGamesEndPoints(this WebApplication app)
    {

        var group = app.MapGroup("/games")
                        .WithParameterValidation();

        // GET /games
        group.MapGet("/", () => games);

        // GET /games/{id}
        group.MapGet("/{id}", (int id) =>
        {
            GameDto? game = games.Find(game => game.Id == id);

            return game is null ? Results.NotFound() : Results.Ok(game);
        })
            .WithName(GetGameEndpointName);

        // POST /games
        group.MapPost("/", (CreateGameDto newGame) =>
        {
            GameDto game = new(
                games.Count + 1,
                newGame.Name,
                newGame.Genre,
                newGame.Price,
                newGame.ReleaseDate
            );

            games.Add(game);

            return Results.CreatedAtRoute(GetGameEndpointName, new { id = game.Id }, game);

        });

        // PUT /games/{id}
        group.MapPut("/{id}", (int id, UpdateGameDto updatedGame) =>
        {
            var index = games.FindIndex(game => game.Id == id);

            if (index == -1)
            {
                return Results.NotFound();
            }

            games[index] = new GameDto(
                id,
                updatedGame.Name,
                updatedGame.Genre,
                updatedGame.Price,
                updatedGame.ReleaseDate
            );

            return Results.NoContent();
        });

        // DELETE /games/{id}
        group.MapDelete("/{id}", (int id) =>
        {
            games.RemoveAll(game => game.Id == id);
            return Results.NoContent();
        });

        return group;

    }


}
