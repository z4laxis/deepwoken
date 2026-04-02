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
        var el = document.getElementById(vars1[i]);
        var val = el ? parseInt(el.value) : 0;
        if (val >= 1) {
            ordertotal += val;
            ordernum++;
            orderlist.push(val);
            ordernumlist.push(i);
            ismagic.push(i < 9 ? 0 : 1);
        }
    }

    if (ordertotal > 330) {
        alert(`Total stats = ${ordertotal}, exceeds 330 by ${ordertotal - 330}.`);
        return;
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
        var el = document.getElementById(vars1[ordernumlist[i]]);
        if (el) el.value = Math.floor(orderlistfinal[i]);
    }
}