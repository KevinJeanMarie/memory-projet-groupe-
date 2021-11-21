import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import onePiece from './one-piece.json'
import minions from './minions.json'
import lotr from './lotr.json'

import Card from './components/Card';
import Restart from './components/Restart';
import Counter from './components/Counter';
import Victory from './components/Victory';
import Theme from './components/Theme';
import Rules from './components/Rules';



class App extends Component {

  constructor () {
    super()

    // Initial State
    this.state = {
      // myTurn: false,
      showPopup: false,
      counterPlayer: 0,
      counterComputer: 0,
      firstCard: null,
      secondCard: null,
      cards: [...onePiece, ...onePiece].sort((a, b) => 0.5 - Math.random()),
      cardsClicked: [],
      theme: "onePiece",
      amIPlaying: true
    };

    // Binding des méthodes
    this.togglePopupRules = this.togglePopupRules.bind(this);
    this.handleCounterPlayer = this.handleCounterPlayer.bind(this);
    this.handleCounterComputer = this.handleCounterComputer.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.compare = this.compare.bind(this)
    this.iA = this.iA.bind(this)

  }
  
  //--- Définit un ordre des fonctions
  componentDidUpdate (prevProps, prevState) {
    if (!prevState.secondCard && this.state.secondCard){
      this.compare()
    }

    if (prevState.amIPlaying && !this.state.amIPlaying) {
      if(this.state.cardsClicked.length !== this.state.cards.length) {
        this.iA()
      }
    }
  
  }

  //--- Fonctions Rules Pop Up
  togglePopupRules() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  //--- Fonction qui compte les points du Joueur
  handleCounterPlayer () {
    this.setState ({ counterPlayer : this.state.counterPlayer + 1})
  }

  //--- Fonction qui compte les points de l'ordinateur
  handleCounterComputer () {
    // if computer win
    this.setState({ counterComputer: this.state.counterComputer + 1 })
  }

  //--- Fonction qui retourne deux cartes à l'aide d'un click
  handleCardClick(index) {
    const {firstCard, secondCard, cards} = this.state

    if (!firstCard) {
      this.setState({ firstCard: { ...cards[index], index: index }, isDisable: true })
    } else if (!secondCard) {
      this.setState({ secondCard: { ...cards[index], index: index }, isDisable: true })
    }
    this.setState({
      disabled: true,
    });
  }

  //--- Fonction qui compare les deux cartes retournées
  compare () {
    const { amIPlaying, cardsClicked, firstCard, secondCard } = this.state

    if (firstCard.name === secondCard.name){
      let newArray = [...cardsClicked]
      if (!newArray.some((e) => e.name === firstCard.name)) {
        newArray = [...newArray, firstCard, secondCard]
      }
      setTimeout(() => {
        this.setState({
          firstCard: null,
          secondCard: null,
          cardsClicked: newArray
        })

        if (amIPlaying){
          this.handleCounterPlayer()
        } else {
          this.handleCounterComputer()
        }

      },2000)

    } else {
      setTimeout (()=> {
        this.setState ({
          firstCard : null,
          secondCard : null,
          amIPlaying: !amIPlaying
        })
      }, 2000)
    }
  }

  //--- Fonction pour que l'ordinateur joue 
  iA() {
    // Je génère deux chiffres aléatoires qui vont correspondre aux index des cartes
    let min = 0;
    let max = this.state.cards.length - 1;

    let index1 = Math.floor(Math.random() * (max - min + 1) + min);
    let index2 = Math.floor(Math.random() * (max - min + 1) + min);
    
    console.log(this.state.cardsClicked)
    
    while(this.state.cardsClicked.map(e => e.index).includes(index1) || index1 === index2){
      console.log(this.state.cardsClicked.map(e => e.index))
      console.log(index1)
      index1 = Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    while(this.state.cardsClicked.map(e => e.index).includes(index2) || index1 === index2){
      console.log(this.state.cardsClicked.map(e => e.index))
      console.log(index2)
      index2 = Math.floor(Math.random() * (max - min + 1) + min);
    }

    console.log("1", this.state.cardsClicked.map(e => e.index).includes(index1))
    console.log("2", this.state.cardsClicked.map(e => e.index).includes(index2))

    console.log('message', index1);
    console.log('message', index2);
    
    // 2 J'UTILISE MES INDEX POUR RECUPERER LES Deux CARTES DANS LE TABLEAUU CARDS
    // créer deux variables chaque variables vont représenter un index de cards
    const card1 = this.state.cards[index1];
    const card2 = this.state.cards[index2];
  
    // 3 je les stoker dans mes state inutile pour cette action
    this.setState({ 
      firstCard: {
        ...card1, index: index1
      },
      secondCard: {
        ...card2, index: index2
      },
     })
    
     // 4 je compare mes deux cartes qui sont stoker dans le state 
      // if(card1.name === card2.name) {
      //   this.handleCounterComputer()
      //   // this.iA();
      // }

    // 4 je compare mes deux cartes qui sont stoker dans le state 
    if (card1.name === card2.name) {
      // Si les cartes sont identiques alors j'incrémente le compteur de points de l'ia 
      this.handleCounterComputer();
      // l'Ia puet continuer de jouer
      this.iA();
    }

    // je reniTialise les state a null // INUTILE POUR CETTE ACTION
    // l'ia continue a jouer
    // sinon c'est le tour de sevrain
    // je renitialise les states a null
  }

  // Fonction qui compare les deux cartes retournées
  // Si les cartes sont identiques alors je continue à jouer
  // sinon c'est le tour de l'Ia


  //--- Fonction pour changer de thème lorsque l'on joue
  handleSelectChange(e) {
    const value = e.target.value

    if (value === "onePiece") {
      this.setState({
        theme: value,
        cards: [...onePiece, ...onePiece].sort((a, b) => 0.5 - Math.random())
      })
    } else if (value === "lotr") {
      this.setState({
        theme: value,
        cards: [...lotr, ...lotr].sort((a, b) => 0.5 - Math.random())
      })
    } else if (value === "minions") {
      this.setState({
        theme: value,
        cards: [...minions, ...minions].sort((a, b) => 0.5 - Math.random())
      })
    }
  }
    

  render() {
    const { counterPlayer, counterComputer, cards, cardsClicked } = this.state
    const result = counterPlayer + counterComputer < 12
    return (
      <>
        { result ? (

            <>
              <header className="d-flex justify-content-between align-items-center">
                <Restart/>
                <h1 className={`
                  ${this.state.theme === "onePiece" && "font-op"}
                  ${this.state.theme === "lotr" && "font-lotr"}
                  ${this.state.theme === "minions" && "font-minions"}`
                }> MEMORY GAME</h1>
                <div className="d-flex align-items-center">
                  <Theme onClick={this.handleSelectChange}/>
                  <button
                    onClick={this.togglePopupRules}
                    type="button"
                    className="bouton-rules">
                      Rules
                  </button>
                  { this.state.showPopup && <Rules onClick={this.togglePopupRules} /> }
                  </div>
              </header>

              <Counter counterPlayer={counterPlayer} counterComputer={counterComputer}/>
              <div className="container">
                <div className="row">
                {cards.map((card, index) => {
                    if (cardsClicked.some((e) => e.name === card.name)) {
                      return <div key={index} className="container-op col-1">

                      </div>
                    }

                    return <Card 
                      key={index}
                      name= {card.name}
                      image= {card.imageRecto}
                      backCard= {card.back} 
                      randomRotate= {Math.floor(Math.random() * (20 - (-20) + 1) + (-20))}
                      onClick= {() => this.handleCardClick(index)}
                      isFlipped={(this.state.firstCard && index === this.state.firstCard.index) 
                        || (this.state.secondCard && index === this.state.secondCard.index)
                      }
                    />
                  })}
                </div>
              </div>
          </>
        ) : (
          <Victory counterPlayer={counterPlayer} counterComputer={counterComputer} />
        )
        }
      </>
    );
  }
}


export default App;