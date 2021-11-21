import React, { Component } from 'react';
import '../global-css/rules-style.css';

class Rules extends Component {
    render() {
        return (
            <div className="box modal">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 class="modal-title" id="exampleModalLabel">Règles du jeu</h1>
                    <button onClick={this.props.onClick} type="button" className="btn btn-danger my-5 py-2">Fermer</button>
                </div>
                <br />
                <p>Choisissez une carte sur laquelle vous allez cliquer.</p>
                {/* <br /> */}
                <p>
                    Mémorisez le personnage de la carte et si la carte suivante choisie correspond au même personnage que la précédente
                    vous gagnez un point.</p>
                <p>Si vous ne trouvez pas le personnage en deux cartes, alors ce sera au tour de l'adversaire de jouer.</p>
                {/* <br /> */}
                <p>La partie sera terminée lorsque toutes les cartes auront été trouvées en doubles.</p>
                {/* <br /> */}
                <p>Le joueur ayant trouvé le plus de doublons sera le vainqueur de la partie.</p>
            </div>
        );
    }
}

export default Rules;


