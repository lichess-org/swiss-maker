export const config = {
    server: 'https://lichess.org',
    team: 'lichess-swiss',
    daysInAdvance: 7,
    dryRun: false,
    dailyTournaments: [
        {
            time: '17:00',
            clock: [3, 0],
            name: (_conf: any) => `Daily SuperBlitz`,
            description: (_conf: any) => '',
            nbRounds: 15,
            variant: 'standard',
            rated: true,
            chatFor: 30,
            'conditions.nbRatedGame.nb': 12
        },
        {
            time: '19:00',
            clock: [5, 0],
            name: (_conf: any) => `Daily Blitz`,
            description: (_conf: any) => '',
            nbRounds: 11,
            variant: 'standard',
            rated: true,
            chatFor: 30,
            'conditions.nbRatedGame.nb': 12
        },
        {
            time: '21:00',
            clock: [10, 0],
            name: (_conf: any) => `Daily Rapid`,
            description: (_conf: any) => '',
            nbRounds: 7,
            variant: 'standard',
            rated: true,
            chatFor: 30,
            'conditions.nbRatedGame.nb': 8
        }
    ],
    oauthToken: process.env['OAUTH_TOKEN']
};
