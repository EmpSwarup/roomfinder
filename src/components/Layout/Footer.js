import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer pt-4 d-flex flex-column align-items-center justify-content-center bg-dark text-light p-4">
      <h3>
        Made By Team Fantastic 4
      </h3>
      <h6>Pratish Shrestha - Nishant Chaudhary - Swarup Sapkota - Ranjit Chaudhary</h6>
    </div>
  );
};

export default Footer;