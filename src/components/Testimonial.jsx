import React from "react";
import "../styles/Testimonial.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Testimonial() {
    return (
        <section id="testimonial">
            <h1>Testimoniales</h1>
            <div className="review-container">
                <div className="card-test">
                    <i className="fa fa-quote-left icon" aria-hidden="true"></i>
                    <div className="card-body">
                        <p className="card-text">
                            {'"Excelente experiencia. La pizza es deliciosa, con ingredientes frescos y masa perfecta. El ambiente acogedor y el personal amable hacen que quieras regresar. ¡Muy recomendada!"'}
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">Francisco Mendoza</cite>
                        </footer>
                    </div>
                </div>
                <div className="card-test">
                    <i className="fa fa-quote-left icon" aria-hidden="true"></i>
                    <div className="card-body">
                        <p className="card-text">
                            {'"Las pizzas son deliciosas y tienen una gran variedad de sabores. Me encantó la de cuatro quesos. Además, el servicio es rápido y el lugar es muy agradable."'}
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">Margarita Gomez</cite>
                        </footer>
                    </div>
                </div>
                <div className="card-test">
                    <i className="fa fa-quote-left icon" aria-hidden="true"></i>
                    <div className="card-body">
                        <p className="card-text">
                            {'"Excelente opción para una buena pizza. Las porciones son generosas y la relación calidad-precio es ideal. ¡Definitivamente volveré!"'}
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">Juan Perez</cite>
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
