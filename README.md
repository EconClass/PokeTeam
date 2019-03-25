# Poke-Team API

**NOTE:** This is a companion to a React Based Web-App currently in development ([See here for site](https://econclass.github.io/poketeamreact/)).
This API is built using Node.js, Express and a Mongo Database.
Poke-Team API seeks to fufill the functional support of apps that require user authentication to access Pokemon Team creation functionalities.
The API also accesses information about pokemon, natures and held items from [pokeapi.co](https://pokeapi.co/).
Aditionally ***ALL*** endpoints of the API will use [https://poke-team-node.herokuapp.com/](https://poke-team-node.herokuapp.com/) as a base url.

To access an endpoint simply append an endpoint to the base url.
For instance to access the `/teams/all` endpoint the full url will look like this:

`https://poke-team-node.herokuapp.com/teams/all`

## User Functionalities

User access and authentication are provisioned through the use of json web tokens (a.k.a. jwt).
Although this api provisions users, a lot of endpoints do not require a user to be logged in.

### User Endpoints

**NOTE:** That ":id" refers to a user account's unique identifier in the database.

| HTTTP Verb | Endpoint | Function |
| ---| --- | --- |
| POST | /user | Creates a User account based on user input. Also provisions a jwt to user as cookie.|
| POST | /login | Validates User account then provisions a jwt to a valid, existing user as cookie. |
| GET | /logout | Logs User out of a session by clearing their cookie |
| GET | /user/:id | Allows user to see account info if logged in. |
| PUT | /user/:id | Allows user to update account info if logged in. |
| DELETE | /user/:id | Allows user to delete account if logged in. |

#### User Example

``` JSON
// All properties are REQUIRED inputs.
{
  "username": "Example",
  "email": "no-reply@example.com",
  "password": "Ecncrypted Password.",
}
```

## Team Functionalities

Teams are resources available to be seen to anyone, but can only be manipulated by the person who created it.

**NOTE:** That ":teamId" refers to a team's unique identifier in the database.

### Team Endpoints (No Account Required)

| HTTTP Verb | Endpoint | Function |
| --- | --- | --- |
| GET | /teams/all | Returns a paginated result of all teams in the database. |
| GET | /team/:teamId | Returns one team from the database according to its id. |

#### Example Team

``` JSON
// "pokemon" is an array of Pokemon objects
{
  "name": "Name of team.",
  "trainer": "Username of creator",
  "description": "Optional description.",
  "pokemon": [...],
}
```

***See [Pokemon](#pokemon) for more details***

### Team Endpoints (Requires User Login)

| HTTTP Verb | Endpoint | Function |
| --- | --- | --- |
| POST | /api/team | Creates a new Team but requires a team name. |
| PATCH | /api/team/:teamId/pokemon | Modifies what pokemon are inside the team. |
| PUT | /api/team/:teamId | Updates team info like name and description, but not pokemon inside the team. |
| DELETE |/api/team/:teamId | Deletes team from database. |

## PokeAPI Resources

These resources are pulled from an open source api that contains a great deal of information on anything related to Pokemon. The Poke-Team API will then allow users to add these resources such as natures, held items and abilities to keep a more detailed account of their teams.

### Available Endpoints

**NOTE:** That ":pokeName" and ":moveName" refer to the names of Pokemon such as `pikachu` and Moves such as `thunderbolt`. They are passed as parameters as part of the url.

| HTTTP Verb | Endpoint | Function |
| --- | --- | --- |
| GET | /pokemon/:pokeName | Returns the abilities, type(s), base stats, and in-game sprite of pokemon specified. |
| GET | /pokemon/:pokeName/moves | Returns with a list of moves that a certain pokemon can learn. |
| GET | /held-items | Returns a list of all items that can be held by a pokemon that have an affect in-battle. |
| GET | /natures | Returns a list of all Pokemon natures along with the affected stats of each nature. |
| GET | /move/:moveName | Returns information about a specified move. |

#### Example Responses

***DISCLAIMER: Poke-Team API reformats original data from pokeapi.co***

##### Pokemon

Full route: `https://poke-team-node.herokuapp.com/pokemon/charizard`

``` JSON
{
  "name": "charizard",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  "stats": {
    "speed": 100,
    "special-defense": 85,
    "special-attack": 109,
    "defense": 78,
    "attack": 84,
    "hp": 78
  },
  "abilities": [
    {
      "hidden": true,
      "ability": "solar-power"
    },
    {
      "hidden": false,
      "ability": "blaze"
    }
  ],
  "type": [
    "flying",
    "fire"
  ]
}
```

##### Moves Available to ONE pokemon

Full route: `https://poke-team-node.herokuapp.com/pokemon/charizard/moves`

``` JSON
[
  {
    "name": "mega-punch",
    "url": "https://pokeapi.co/api/v2/move/5/"
  },
  {
    "name": "fire-punch",
    "url": "https://pokeapi.co/api/v2/move/7/"
  },
  {
    "name": "thunder-punch",
    "url": "https://pokeapi.co/api/v2/move/9/"
  },
  {
    "name": "scratch",
    "url": "https://pokeapi.co/api/v2/move/10/"
  },
  {
    "name": "swords-dance",
    "url": "https://pokeapi.co/api/v2/move/14/"
  },
  ....
]
```

##### Items

Full route: `https://poke-team-node.herokuapp.com/held-items`

``` JSON
[
  "bright-powder",
  "white-herb",
  "quick-claw",
  "mental-herb",
  "kings-rock",
  "smoke-ball",
  "focus-band",
  "scope-lens",
  "leftovers",
  ....
]
```

##### Natures

Full route: `https://poke-team-node.herokuapp.com/natures`

``` JSON
{
  "name": "Name of nature such as Modest",
  "increasedStat": "special-attack",
  "decreasedStat": "attack",
}
```

##### Info of ONE move

Full route: `https://poke-team-node.herokuapp.com/move/flamethrower`

``` JSON
{
  "accuracy": 100,
  "power": 90,
  "pp": 15,
  "priority": 0,
  "name": "flamethrower",
  "class": "special",
  "type": "fire",
  "target": "selected-pokemon",
  "effect": "Has a $effect_chance% chance to burn the target."
}
```