import PersonnesJanvier from './PersonnesJanvier';
import PersonnesFevrier from './PersonnesFevrier';
import PersonnesMars from "./PersonnesMars";
import PersonnesAvril from "./PersonnesAvril";
import PersonnesMai from "./PersonnesMai.js";
import PersonnesJuin from "./PersonnesJuin.js";
import PersonnesJuillet from "./PersonnesJuillet";
import PersonnesAout from "./PersonnesAout";
import PersonnesSeptembre from "./PersonnesSeptembre";
import PersonnesOctobre from "./PersonnesOctobre";
import PersonnesNovembre from "./PersonnesNovembre";
import PersonnesDecembre from "./PersonnesDecembre";

/* Pour chaque mois de l'année, j'ajoute des personnes définies
* Ce composant pourra être amélioré
*/
export const mois = [
  { nom: "Ngù'fī / Janvier", personnes: PersonnesJanvier },
  { nom: "Nkùɑ̀nʉ̀ɑ̀ / Février", personnes: PersonnesFevrier },
  { nom: "Mbàkngòfāt / Mars", personnes: PersonnesMars },
  { nom: "Sò'njɑ̀ɑ̀ / Avril", personnes: PersonnesAvril },
  { nom: "Njwēnɑ̌hntà' / Mai", personnes: PersonnesMai },
  { nom: "Mòmòshʉ̄ / Juin", personnes: PersonnesJuin },
  { nom: "Ntūmbhìngòfāt / Juillet", personnes: PersonnesJuillet },
  { nom: "Mɑ̄ngà'nshì / Août", personnes: PersonnesAout },
  { nom: "Kùkū' / Septembre", personnes: PersonnesSeptembre },
  { nom: "Ndǔ'nzɑ̄ / Octobre", personnes: PersonnesOctobre },
  { nom: "Nkhʉ̀ɑ̀nʉ̀ɑ̀ / Novembre", personnes: PersonnesNovembre },
  { nom: "Ncátmɑ̄ŋū / Décembre", personnes: PersonnesDecembre }
];
