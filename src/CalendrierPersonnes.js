import React, { Component } from "react";
import { mois } from './components/Mois'
import './CalendrierPersonnes.css';

class CalendrierPersonnes extends Component {

  // dans mon constructeur, je passe les états que je vais utiliser plus bas
  constructor(props) {
    super(props);
    const moisEnCours = new Date().getMonth();
    const dateActuelle = new Date();
    this.state = {
      moisActuel: moisEnCours, // ce state permet de se positionner sur le mois actuel 
      jourActuel: dateActuelle.getDate(), // celui-ci permet de savoir le jour (exemple: 14)
      recherche: '', // celui-ci est utilisé pour la recherche
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

  // sera utilisé pour récupérer la recherche de l'utilisateur dans la barre de recherche
  handleRechercheChange = (event) => {
    this.setState({ recherche: event.target.value });
  }

  render() {
    const { jourActuel } = this.state;

    // Option de recherche dans le calendrier
    const recherche = this.state.recherche.toLowerCase().trim();

    /* On va rechercher dans toute l'année:
      - les personnes: Benjamin
      - le jour (numero): exemple: 12
    */
    const personnesFiltrees = mois.reduce((acc, m) => {
      const personnesMois = m.personnes;
      const personnes = personnesMois.filter((personne) => {
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
      return [...acc, ...personnes];
    }, []);
    

  return (
      <div>
        <div className="bg-light-grey dib br3 pa3 ma3 bw2 showdow-5">
          <h2>{mois[this.state.moisActuel].nom}</h2>
          <input
            type="text"
            placeholder="Rechercher..."
            value={this.state.recherche}
            onChange={this.handleRechercheChange}
          />
          <table>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={i}>
                  {personnesFiltrees.slice(i * 8, (i + 1) * 8).map((personne, j) => (
                    //ici j'ajoute le style 'aujiurdhui' à la date du jour pour la mettre en évidence (en jaune)
                    <td key={j} className={personne.numero === jourActuel ? 'aujourdhui' : ''}>
                      {/* j'affiche le reste des éléments du tableau  */}
                      <div className="enteTableau">{personne.nufiJour}</div><br />
                      <div className="f4 dark-red">{personne.jour}</div> <br />
                      <div className="b">{personne.numero}</div> <br />
                      <div className="">{personne.nom}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* J'affiche les bouton suivant/précédnt à la fin du tableau */}
          <div className="ph3 mt4">
            <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib mid-green" onClick={this.moisPrecedent}>Mɑ̄ŋū Pēēsì</div>
            <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" onClick={this.moisSuivant}>Mɑ̄ŋū Ntāmbhì</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CalendrierPersonnes;
