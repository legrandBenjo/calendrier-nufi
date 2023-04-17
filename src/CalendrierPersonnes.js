import React, { Component } from "react";
import { mois } from './components/Mois'
import RecherchePersonnes from './components/RecherchePersonnes'
import './CalendrierPersonnes.css';

class CalendrierPersonnes extends Component {
  constructor(props) {
    super(props);
    const moisEnCours = new Date().getMonth();
    const dateActuelle = new Date();
    const personnesMois = mois.map(m => m.personnes).flat();
    this.state = {
      moisActuel: moisEnCours, // ce state permet de se positionner sur le mois actuel 
      jourActuel: dateActuelle.getDate(), // celui-ci permet de savoir le jour (exemple: 14)
      recherche: '', // celui-ci est utilisé pour la recherche
      personnesFiltrees: personnesMois, // Ajouter le state pour les personnes filtrées
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

  /** Utilisé uniquement pour filtrer les résultats de la rechercehe */
  handleRechercheChange = (event) => {
    const personnesMois = mois.map(m => m.personnes).flat();
    const recherche = event.target.value.toLowerCase().trim();
    const personnesFiltrees = personnesMois.filter((personne) => {
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
    this.setState({ recherche, personnesFiltrees });
    console.log('ici dans handleRechercheChange', personnesFiltrees  );
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
      //const personnesMois = mois.map(m => m.personnes).flat();
      const personnesMois = mois[this.state.moisActuel].personnes;
      const recherche = this.state.recherche.toLowerCase().trim();
      const personnesFiltrees = personnesMois.filter((personne) => {
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
      this.setState({ personnesFiltrees });
      console.log('dans componentDidUpdate: ',personnesFiltrees);
    }
  }
  

  render() {
    const { jourActuel, personnesFiltrees, recherche } = this.state;

    return (
      <div>
        <div className="bg-light-grey dib br3 pa3 ma3 bw2 showdow-5">
          <h2>{mois[this.state.moisActuel].nom}</h2>
          <RecherchePersonnes recherche={recherche} handleRechercheChange={this.handleRechercheChange} />
          <table>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={i}>
                  {personnesFiltrees.slice(i * 8, (i + 1) * 8).map((personne, j) => (
                    <td key={j} className={personne.numero === jourActuel ? "aujourdhui" : ""}>
                      <div className="enteTableau">{personne.nufiJour}</div>
                      <br />
                      <div className="f4 dark-red">{personne.jour}</div>
                      <br />
                      <div className="b">{personne.numero}</div>
                      <br />
                      <div className="">{personne.nom}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ph3 mt4">
            <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib mid-green" onClick={this.moisPrecedent} >Mɑ̄ŋū Pēēsì</div>
            <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" onClick={this.moisSuivant}>Mɑ̄ŋū Ntāmbhì</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CalendrierPersonnes;
