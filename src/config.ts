const defaults = {
    variant: 'standard',
    rated: true,
    chatFor: 30,
    description: (_conf: any) => ''
};

export const config = {
    server: 'https://lichess.org',
    /* server: 'http://l.org', */
    team: 'lichess-swiss',
    daysInAdvance: 14,
    dryRun: false,
    oauthToken: process.env['OAUTH_TOKEN'],
    dailyTournaments: [
        {
            ...defaults,
            time: '16:00',
            clock: [30, 0],
            name: (_conf: any) => `Daily Classical`,
            nbRounds: 5,
            'conditions.nbRatedGame.nb': 5,
            description: (_conf: any) => 'Games can take up to one hour, so you will have to wait for pairings. We also offer [faster-paced swissed tournaments](https://lichess.org/team/lichess-swiss/tournaments).'
        },
        {
            ...defaults,
            time: '17:00',
            clock: [3, 0],
            name: (_conf: any) => `Daily SuperBlitz`,
            nbRounds: 15,
            'conditions.nbRatedGame.nb': 12
        },
        {
            ...defaults,
            time: '19:00',
            clock: [5, 0],
            name: (_conf: any) => `Daily Blitz`,
            nbRounds: 11,
            'conditions.nbRatedGame.nb': 12
        },
        {
            ...defaults,
            time: '21:00',
            clock: [10, 0],
            name: (_conf: any) => `Daily Rapid`,
            nbRounds: 7,
            'conditions.nbRatedGame.nb': 8
        },
        {
            ...defaults,
            time: '21:00',
            clock: [1, 0],
            name: (_conf: any) => `Daily Bullet`,
            nbRounds: 25,
            'conditions.nbRatedGame.nb': 15
        },
    ]
};
