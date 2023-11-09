import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './InfoMarcheJour.css';

const InfoMarcheJour = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nufiJour = searchParams.get('nufiJour');
  const marche = searchParams.get('marche');

  return (
    <div>
      <h2 className="info-title">Informations concernant les marchés du jour</h2>
      {nufiJour && marche ? (
        <div>
          Aujourd'hui / Líé' ntēē: <p className="jourNufi">{nufiJour}</p>
          Villes de marché / Zʉ̌' ntēē:<p className="marche">{marche}</p>
        </div>
      ) : (
        <p className="info-message">Aucune information sur le marché pour ce jour</p>
      )}
       <Link to="/calendrier-nufi" className="retour-button">Retour / Pǎtnjàm</Link>
    </div>
  );
};

export default InfoMarcheJour;
