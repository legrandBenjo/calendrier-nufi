import React, { Component } from "react";

class RecherchePersonnes extends Component {
  render() {
    const { recherche, handleRechercheChange } = this.props;

    return (
      <input className="search-bar"
        type="text"
        placeholder="Cāk séè lè ..."
        value={recherche}
        onChange={handleRechercheChange}
      />
    );
  }
}

export default RecherchePersonnes;
