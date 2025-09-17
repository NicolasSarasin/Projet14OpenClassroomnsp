import "../../css/app.css";
import "../../css/Error404.css";
import { Link } from "react-router-dom";
/*import React from "react";
import ReactDOM from "react-dom/client";*/

function Error() {
    return (
        <div className="html">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <h1 className="error404">404</h1>
            <p className="Perror404">
                Oups! La page que vous voulez n'existe pas.
            </p>
            <Link to="/" className="Perror4042">
                <p>Retourner à la page d'accueil.</p>
            </Link>
        </div>
    );
}

export default Error;