const vars1 = ['strength', 'fortitude', 'agility', 'intelligence', 'willpower', 'charisma', 'heavyweapons', 'mediumweapons', 'lightweapons', 'flamecharm', 'frostdraw', 'thundercall', 'galebreathe', 'shadowcast', 'ironsing', 'bloodrend', 'lifeweave'];

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
        if (window[vars1[i]] >= 1) {
            ordertotal += window[vars1[i]];
            ordernum++;
            orderlist.push(window[vars1[i]]);
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

order()