var tab = "---------";
var player = "X";
var pvp = false;
var nb_coup = 0;
var partie_finie = false;
var init = "X";
var encours = false;
var boncoup = 0;
var difficile = false;

function mise_a_jour() {
    for (var i = 0; i < 9; i++) {
        if (tab[i] == "O") {
            $("#" + i).html('O');
        } else if (tab[i] == "X") {
            $("#" + i).html('X');
        } else {
            $("#" + i).html('');
        }
    }
    if (player == "X") {
        player = "O";
    } else {
        player = "X";
    }
}

function playing(n) {
    if (encours == false) {
        if (n == 2) {
            pvp = true;
        } else {
            pvp = false;
        }
    } else {
        alert("Tu ne peux changer le nombre de joueurs en cours de partie !!")
    }
}

function difficulte(diff) {
    if (encours == false) {
        difficile = diff;
    } else {
        alert("Tu ne peux changer la difficulté en cours de partie !!")
    }
}

function change_player(play) {
    if (encours == false) {
        player = play;
        init = play;
    } else {
        alert("Tu ne peux changé de côté en cours de partie !!")
    }
}

function choix(n) {
    encours = true;
    partie_finie = false;
    nb_coup++;
    utilisateur(n);
    if (pvp == false && partie_finie == false) {
        nb_coup++;
        setTimeout(ordi(), 1000);
    }
}

function utilisateur(n) {
    tab = tab.substr(0, n) + player + tab.substr(n + 1);
    mise_a_jour();
    statut();
}

/*
012
345
678
*/

function statut() {
    if (tab[0] == tab[1] && tab[1] == tab[2] && tab[0] != "-") {
        gagne();
    } else if (tab[3] == tab[4] && tab[4] == tab[5] && tab[3] != "-") {
        gagne();
    } else if (tab[6] == tab[7] && tab[7] == tab[8] && tab[6] != "-") {
        gagne();
    } else if (tab[0] == tab[3] && tab[3] == tab[6] && tab[0] != "-") {
        gagne();
    } else if (tab[1] == tab[4] && tab[4] == tab[7] && tab[1] != "-") {
        gagne();
    } else if (tab[2] == tab[5] && tab[5] == tab[8] && tab[2] != "-") {
        gagne();
    } else if (tab[0] == tab[4] && tab[4] == tab[8] && tab[0] != "-") {
        gagne();
    } else if (tab[2] == tab[4] && tab[4] == tab[6] && tab[2] != "-") {
        gagne();
    } else if (nb_coup == 9) {
        egalite();
    } else {
        return;
    }
}

function ordi() {
    $.getJSON("https://tttapi.herokuapp.com/api/v1/" + tab + "/" + player, function(reponse) {
        var index = reponse.recommendation;
        if (boncoup > 1 && difficile == false) {
            index = Math.floor((Math.random() * 9));;
            while (tab[index] != "-") {
                index = Math.floor((Math.random() * 9));;
            }
            boncoup = 0;
        } else {
            boncoup++;
        }
        tab = tab.substr(0, index) + player + tab.substr(index + 1);
        mise_a_jour();
        statut();
    });
}

function egalite() {
    alert("Vous avez fait égalité ! Il manquait un petit quelque chose...");
    partie_finie = true;
    reset();
}

function gagne() {
    if (pvp) {
        if (player == "O") {
            var gagnant = "X";
        } else {
            var gagnant = "O";
        }
        alert("Les " + gagnant + " ont gagnés !!")
    } else {
        if (player == init) {
            alert("Vous avez perdu ! C'est dommage...");
        } else {
            alert("Vous avez gagner ! Bravo !");
        }
    }
    partie_finie = true;
    reset();
}

function reset() {
    tab = "---------";
    pvp = false;
    nb_coup = 0;
    encours = false;
    mise_a_jour();
    player = init;
}
