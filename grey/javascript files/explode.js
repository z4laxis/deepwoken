function explode(victim){
    document.getElementById(victim).style.display = 'none';
}

function appear(explosion){
    document.getElementById(explosion).style.display = 'block';

    setTimeout(function(){ document.getElementById(explosion).style.display = 'none' }, 780)
}