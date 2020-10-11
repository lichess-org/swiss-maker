# Lichess Swiss maker

Script that creates regular swiss tournaments for a team.

Uses [Lichess API](https://lichess.org/api) to
[fetch](https://lichess.org/api#operation/apiTeamSwiss) and
[create](https://lichess.org/api#operation/apiSwissNew) swiss tournaments.

Dates use your own local timezone.

The script can be run multiple times and will only create missing tournaments,
i.e. it won't create a tournament that already exists.

## Run

[Generate an OAuth token](https://lichess.org/account/oauth/token/create?scopes[]=tournament:write&description=Lichess+Swiss+maker)
and use it in place of `YourOauthToken` in the following commands.

Edit the configuration in `src/config.ts`.

### Dev

```
yarn install
OAUTH_TOKEN='YourOauthToken' yarn dev
```

### Prod

```
yarn build
OAUTH_TOKEN='YourOauthToken' yarn start
```
