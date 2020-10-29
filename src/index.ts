import fetch from 'node-fetch';
import { URLSearchParams } from 'url'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import dateAdd from 'date-fns/add'
import dateSet from 'date-fns/set'
import dateIsAfter from 'date-fns/isAfter'
import dateIsEqual from 'date-fns/isEqual'
import { config } from './config';

const candidates = eachDayOfInterval({
    start: new Date(),
    end: dateAdd(new Date(), { days: config.daysInAdvance })
}).flatMap(day =>
    config.dailyTournaments.map(blueprint => ({
        ...blueprint,
        startsAt: dateSet(day, {
            hours: parseInt(blueprint.time.split(':')[0]),
            minutes: parseInt(blueprint.time.split(':')[1])
        })
    }))).filter(c => dateIsAfter(c.startsAt, new Date()));

const looksLike = (existing: any, candidate: any) =>
    dateIsEqual(new Date(existing.startsAt), candidate.startsAt) &&
    existing.clock.limit / 60 == candidate.clock[0] &&
    existing.clock.increment == candidate.clock[1];

async function getLatestTournaments() {
    const response = await fetch(`${config.server}/api/team/${config.team}/swiss?max=100`);
    const body = await response.text();
    return body.split('\n').filter(line => line).map(line => JSON.parse(line));
}

async function createTournament(tour: any): Promise<any> {
    const body = new URLSearchParams();
    for (const k of Object.keys(tour)) body.append(k, tour[k]);
    const response = await fetch(`${config.server}/api/swiss/new/${config.team}`, {
        method: 'POST',
        body,
        headers: { Authorization: `Bearer ${config.oauthToken}` }
    });
    if (response.status != 200) {
        const error = await response.text();
        console.error(response.status, error);
    }
    await new Promise(r => setTimeout(r, 500));
}

async function main() {
    const existing = await getLatestTournaments();
    const missing = candidates.filter(c => !existing.some(e => looksLike(e, c)));
    const posts = missing.map(m => ({
        ...m,
        name: m.name(m),
        description: m.description(m),
        'clock.limit': m.clock[0] * 60,
        'clock.increment': m.clock[1],
        startsAt: m.startsAt.getTime()
    }));
    console.log(`Creating ${posts.length} tournaments`);
    posts.forEach(p => console.log(p));
    if (!config.dryRun) await posts.reduce((seq, n) =>
        seq.then(() => {
            console.log(`${n.startsAt} ${n.name}`);
            return createTournament(n);
        }), Promise.resolve());
}

main();
