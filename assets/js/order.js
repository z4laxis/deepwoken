const vars1 = ['str', 'fort', 'agil', 'int', 'will', 'char', 'hw', 'mw', 'lw', 'flm', 'ice', 'ltn', 'gale', 'shdw', 'mtl', 'bld'];

const stats = {
    str: 80, fort: 60, agil: 45, int: 30, will: 20, char: 10,
    hw: 50, mw: 40, lw: 35,
    flm: 70, ice: 65, ltn: 55, gale: 48, shdw: 90, mtl: 25, bld: 15, lfe: 5
};

function order() {
    var orderlist = [];
    var orderlistfinal = [];
    var ordernumlist = [];
    var ismagic = [];
    var ordertotal = 0;
    var orderfinal = 0;
    var ordernum = 0;
    var ordernumfinal = 0;

    for (var i = 0; i < vars1.length; i++) {
        if (stats[vars1[i]] >= 1) {
            ordertotal += stats[vars1[i]];
            ordernum++;
            orderlist.push(stats[vars1[i]]);
            ordernumlist.push(i);
            ismagic.push(i < 9 ? 0 : 1);
        }
    }

    for (var i = 0; i < ordernumlist.length; i++) {
        orderlistfinal.push(ordertotal / ordernum);
        if ((orderlistfinal[i] <= orderlist[i] - 25) && (ismagic[i] == 0)) {
            orderlistfinal[i] = orderlist[i] - 25;
            orderfinal += 25;
        } else {
            orderfinal += orderlist[i];
            ordernumfinal++;
        }
    }

    for (var i = 0; i < ordernumlist.length; i++) {
        if (!((orderlistfinal[i] <= orderlist[i] - 25) && (ismagic[i] == 0))) {
            orderlistfinal[i] = (orderfinal / ordernumfinal);
        }
    }

    for (var i = 0; i < ordernumlist.length; i++) {
        if ((orderlistfinal[i] < orderlist[i] - 25) && (ismagic[i] == 0)) {
            orderlistfinal[i] = orderlist[i] - 25;
            ordernumfinal--;
            orderfinal -= 25;
        }
    }

    for (var i = 0; i < ordernumlist.length; i++) {
        if (!((orderlistfinal[i] <= orderlist[i] - 25) && (ismagic[i] == 0))) {
            orderlistfinal[i] = (orderfinal / ordernumfinal);
        }
    }

    for (var i = 0; i < ordernumlist.length; i++) {
        console.log(`stat [${vars1[ordernumlist[i]]}] -> value: ${Math.floor(orderlistfinal[i])}`);
    }

}

