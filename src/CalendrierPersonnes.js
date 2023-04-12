import React, { useState } from "react";
import { mois } from './components/Mois'
import './CalendrierPersonnes.css';

const CalendrierPersonnes = () => {
  const [moisActuel, setMoisActuel] = useState(0);

  const moisPrecedent = () => {
    setMoisActuel((moisActuel - 1 + mois.length) % mois.length);
  };

  const moisSuivant = () => {
    setMoisActuel((moisActuel + 1) % mois.length);
  };

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
                  <td key={j}>
                    <div className="enteTableau">{personne.nufiJour}</div><br/>
                    <div className="f4 dark-red">{personne.jour}</div> <br />
                    <div className="b">{personne.numero}</div> <br />
                    <div className="">{personne.nom}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ph3 mt4">
          <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib mid-green" onClick={moisPrecedent}>Mɑ̄ŋū Pēēsì</div>
          <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" onClick={moisSuivant}>Mɑ̄ŋū Ntāmbhì</div>
        </div>
      </div>
    </div>
  );
}

export default CalendrierPersonnes;