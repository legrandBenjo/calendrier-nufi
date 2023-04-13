import React, { Component } from "react";
import { mois } from './components/Mois';
import './CalendrierPersonnes.css';

class CalendrierPersonnes extends Component {
  constructor(props) {
    super(props);
    const dateActuelle = new Date();
    const moisActuel = dateActuelle.getMonth();
    this.state = {
      moisActuel,
      jourActuel: dateActuelle.getDate()
    };
  }

  moisPrecedent = () => {
    this.setState((prevState) => ({
      moisActuel: (prevState.moisActuel - 1 + mois.length) % mois.length
    }));
  };

  moisSuivant = () => {
    this.setState((prevState) => ({
      moisActuel: (prevState.moisActuel + 1) % mois.length
    }));
  };

  render() {
    const { moisActuel, jourActuel } = this.state;
    const personnesMois = mois[moisActuel].personnes;
   
    return (
      <div>
        <div className="bg-light-grey dib br3 pa3 ma3 bw2 showdow-5">
          <h2>{mois[moisActuel].nom}</h2>
          <table>
            <tbody>
              {[0, 1, 2, 3].map((i) => (
                <tr key={i}>
                  {personnesMois.slice(i * 8, (i + 1) * 8).map((personne, j) => (
                    <td key={j} className={personne.numero === jourActuel ? 'aujourdhui' : ''}>
                      <div className="enteTableau">{personne.nufiJour}</div><br />
                      <div className="f5 dark-red ">{personne.jour}</div> <br />
                      <div className="">{personne.numero}</div> <br />
                      <div className="f5 b">{personne.nom}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
