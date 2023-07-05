//CalendrierPersonnes .js
import React, { useState, useEffect } from 'react';
import { mois } from './components/Mois';
import { getSpecialCharacters } from './components/Utils';
import MarcheDuJour from './components/MarcheDuJour';
import { useNavigate } from 'react-router-dom';
import RecherchePersonnes from './components/RecherchePersonnes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import './CalendrierPersonnes.css';

const CalendrierPersonnes = () => {
  const [moisActuel, setMoisActuel] = useState(new Date().getMonth());
  const [jourActuel] = useState(new Date().getDate());
  const [recherche, setRecherche] = useState('');
  const [personnesFiltrees, setPersonnesFiltrees] = useState(mois[moisActuel].personnes);
  const navigate = useNavigate();

  const moisPrecedent = () => {
    setMoisActuel((prevState) => (prevState - 1 + mois.length) % mois.length);
  };

  const moisSuivant = () => {
    setMoisActuel((prevState) => (prevState + 1) % mois.length);
  };

  const normalizeWord = (word) => {
    // Utiliser la fonction getSpecialCharacters pour interpréter les mots du clavier
    // en langue FE'EFE et normaliser le mot pour la recherche
    // Exemple:
    if (!word) {
      return '';
    }
    const specialCharacters = getSpecialCharacters(word);
    let normalizedWord = word;

    specialCharacters.forEach((replacement) => {
      normalizedWord = normalizedWord.replace(replacement.original, replacement.replacement);
    });

    return normalizedWord.toLowerCase();
  };

  const filtrePersonnes = (personnesMois, recherche) => {
    return personnesMois.filter((personne) => {
      const nomPersonne = personne.nom.toLowerCase();
      const jourPersonne = personne.jour.toLowerCase();
      const nufiJourPersonne = personne.nufiJour.toLowerCase();
      const numeroPersonne = personne.numero.toString();
      return (
        nomPersonne.includes(recherche) ||
        jourPersonne.includes(recherche) ||
        nufiJourPersonne.includes(recherche) ||
        numeroPersonne.includes(recherche)
      );
    });
  };

  /** Utilisé uniquement pour filtrer les résultats de la rechercehe */
  //On recherche toutes les occurences du mot dans toute l'année.
  const handleRechercheChange = (event) => {
    const recherche = event.target.value.toLowerCase().trim();
    let personnesMois = mois.map((m) => m.personnes).flat();
    if (recherche === '') {
      personnesMois = mois[moisActuel].personnes;
    }
    const personnesFiltrees = filtrePersonnes(personnesMois, normalizeWord(recherche));
    setRecherche(recherche);
    setPersonnesFiltrees(personnesFiltrees);
  };


  /*
  * Utilisé pour naviguer et afficher le marché du jour losque l'on clique dans une case du calendrier
  */
  const handleClick = (personne) => {
    const marcheDuJour = MarcheDuJour.find((marche) => marche.nufiJour === personne.nufiJour);
    if (marcheDuJour) {
      navigate(`/info-marche-jour?nufiJour=${marcheDuJour.nufiJour}&marche=${marcheDuJour.marche}`);
    } else {
      console.log('Aucune information sur le marché pour ce jour');
    }
  };

  /** Ici on récupère les codes du clavier  pour appeler les métodes moisPrecedent et moisSuivant */
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 37:
        moisPrecedent();
        break;
      case 39:
        moisSuivant();
        break;
      default:
        break;
    }
  };

  /** Utilisé lorsque j'appuie sur les touches Précédent/Suivant */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (moisActuel !== new Date().getMonth() ){
      const personnesMois = mois[moisActuel].personnes;
      const personnesFiltrees = filtrePersonnes(personnesMois, normalizeWord(recherche));
      console.log(personnesFiltrees);
      console.log('personnesMois: ',personnesMois);
      setPersonnesFiltrees(personnesFiltrees);
    }
    
  }, [moisActuel, recherche]);

  return (
    <div className="container">
      <div className="bg-light-grey dib br3 pa3 ma3 bw2 shadow-5">
        <h2 className="text-center">{mois[moisActuel].nom}</h2>
        <RecherchePersonnes
          recherche={recherche}
          handleRechercheChange={handleRechercheChange}
        />
        <div className="row">
          {personnesFiltrees.map((personne, index) => (
            <div key={index} className="col-sm-6 col-md-3">
              <div
                className={`personne ${personne.numero === jourActuel ? 'aujourdhui' : ''}`}
                onClick={() => handleClick(personne)}>
                <div className="enteTableau">{personne.nufiJour}</div>
                <div className="nufiMonth">{personne.month}</div>
                <div className="f4 dark-red">{personne.jour}</div>
                <div>{personne.numero}</div>
                <div className="b">{personne.nom}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib mid-green" onClick={moisPrecedent}>
            Mɑ̄ŋū njàm
          </div>
          <div className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" onClick={moisSuivant}>
            Mɑ̄ŋū mbhì
          </div>
        </div>
        <div className="pa3 text-center">© Resulam 2023</div>
      </div>
    </div>
  );
};

export default CalendrierPersonnes;

