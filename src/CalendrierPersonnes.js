import React, { Component } from "react";
import { mois } from './components/Mois'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import RecherchePersonnes from './components/RecherchePersonnes'
import './CalendrierPersonnes.css';

class CalendrierPersonnes extends Component {
  constructor(props) {
    super(props);
    const moisEnCours = new Date().getMonth();
    const dateActuelle = new Date();
    this.state = {
      moisActuel: moisEnCours, // ce state permet de se positionner sur le mois actuel 
      jourActuel: dateActuelle.getDate(), // celui-ci permet de savoir le jour (exemple: 14)
      recherche: '', // celui-ci est utilisé pour la recherche
      personnesFiltrees: mois[moisEnCours].personnes, // Ajouter le state pour les personnes filtrées
    };
  }

  //moisPrecedent va utiliser le state moisActuel pour afficher le mois précédent dans le bouton " mois précédent"
  moisPrecedent = () => {
    this.setState((prevState) => ({
      moisActuel: (prevState.moisActuel - 1 + mois.length) % mois.length,
    }));
  };

  //moisSuivant va utiliser le state moisActuel pour afficher le mois précédent dans le bouton "mois Suivant"
  moisSuivant = () => {
    this.setState((prevState) => ({
      moisActuel: (prevState.moisActuel + 1) % mois.length,
    }));
  };

  filtrePersonnes(personnesMois, recherche) {
    return personnesMois.filter((personne) => {
      const nomPersonne = personne.nom.toLowerCase();
      const jourPersonne = personne.jour.toString();
      const nufiJourPersonne = personne.nufiJour.toLowerCase();
      const numeroPersonne = personne.numero.toString();
      return (
        nomPersonne.includes(recherche) ||
        jourPersonne.includes(recherche) ||
        nufiJourPersonne.includes(recherche) ||
        numeroPersonne.includes(recherche)
      );
    });
  }

  /** Utilisé uniquement pour filtrer les résultats de la rechercehe */
  handleRechercheChange = (event) => {
    var personnesMois = mois.map(m => m.personnes).flat();
    const recherche = event.target.value.toLowerCase().trim();
    if (recherche === '') {
      personnesMois = mois[this.state.moisActuel].personnes;
    }
    var personnesFiltrees = this.filtrePersonnes(personnesMois, recherche);
    this.setState({ recherche, personnesFiltrees });
  };


  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  /** Ici on exécute l'évènement des touches du clavier pour passer de suivant à précédent */
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 37: // touche de gauche
        this.moisPrecedent();
        break;
      case 39: // touche de droite
        this.moisSuivant();
        break;
      default:
        break;
    }
  };


  /** Utilisé lorsque j'appuie sur les touches Précédent/Suivant */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.moisActuel !== this.state.moisActuel) {
      const personnesMois = mois[this.state.moisActuel].personnes;
      const recherche = this.state.recherche.toLowerCase().trim();
      const personnesFiltrees = this.filtrePersonnes(personnesMois, recherche);
      this.setState({ recherche, personnesFiltrees });
    }
  }

  render() {
    const { jourActuel, personnesFiltrees, recherche } = this.state;
    const currentMonth = this.state.moisActuel;
    return (
      <div className="container">
        <div className="bg-light-grey dib br3 pa3 ma3 bw2 shadow-5">
          <h2 className="text-center">{mois[currentMonth].nom}</h2>
          <RecherchePersonnes
            recherche={recherche}
            handleRechercheChange={this.handleRechercheChange}
          />
          <div className="row">
            {personnesFiltrees.map((personne, index) => (
              <div key={index} className="col-sm-6 col-md-3">
                <div
                  className={`personne ${personne.numero === jourActuel ? "aujourdhui" : ""}`}
                >
                  <div className="enteTableau">{personne.nufiJour}</div>
                  <div className="black">{personne.month}</div>
                  <div className="f4 dark-red">{personne.jour}</div>
                  <div>{personne.numero}</div>
                  <div className="b">{personne.nom}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div
              className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib mid-green"
              onClick={this.moisPrecedent}>
              Mɑ̄ŋū Pēēsì
            </div>
            <div
              className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-blue"
              onClick={this.moisSuivant}>
              Mɑ̄ŋū Ntāmbhì
            </div>
          </div>
          <div className="pa3 text-center">© Resulam 2023</div>
        </div>
      </div>
    );
  }
}

export default CalendrierPersonnes;
