/*
README:

this implementation of a Markov Chain is heavily optimised for cheats in a specific game.
Use only as a rough reference, as your case may be different.
*/

function markovPredictNextHat(p) {
    const ph = p.pastHats;
    const tm = {};
    for (let i = 0; i < ph.length - 1; i++) {
        const cs = ph[i];
        const ns = ph[i + 1];

        const csKey = JSON.stringify({
            h: cs.skin,
            t: cs.tail,
            s: cs.shame,
            p: cs.pr,
            r: cs.sr,
            tr: cs.tr,
            it: cs.inTrap,
            spd: cs.speed
        });

        const nsKey = JSON.stringify({
            h: ns.skin,
            t: ns.tail,
            s: ns.shame,
            p: ns.pr,
            r: ns.sr,
            tr: ns.tr,
            it: ns.inTrap,
            spd: ns.speed
        });

        if (!tm[csKey]) {
            tm[csKey] = {};
        }

        if (!tm[csKey][nsKey]) {
            tm[csKey][nsKey] = 0;
        }

        tm[csKey][nsKey]++;
    }

    const rs = ph[ph.length - 1];

    const rsKey = JSON.stringify({
        h: rs.skin,
        t: rs.tail,
        s: rs.shame,
        p: rs.pr,
        r: rs.sr,
        tr: rs.tr,
        it: rs.inTrap,
        spd: rs.speed
    });

    if (!tm[rsKey]) {
        return -1;
    }

    let nsKey = -1;
    let maxC = 0;

    for (const sk in tm[rsKey]) {
        const count = tm[rsKey][sk];
        if (count > maxC) {
            nsKey = sk;
            maxC = count;
        }
    }

    if (nsKey !== -1) {
        const ns = JSON.parse(nsKey);
        return ns.h;
    }

    // return -1 if cannot predict
    return -1;
}