import React from "react";
import "./styles.css";

export const GameScreen = () => {
    return (
        <div className="game-screen">
            <div className="div">
                <div className="overlap-group">
                    <div className="health-1"><div className="heart"></div></div>
                    <div className="health-2"><div className="heart"></div></div>
                    <div className="health-3"><div className="heart"></div></div>
                    <img className="clear-text" alt="" src="../../assets/clear.svg"/>
                    <div className="input-text" />
                </div>
                <div className="overlap">
                    <div className="overlap">
                        <div className="treetrunk-ol" />
                        <div className="treetrunk-il" />
                        <div className="overlap-2">
                            <img className="treetop-or" alt="" src="../../assets/treetop-or.svg" />
                            <img className="treetop-il" alt="" src="../../assets/treetop-il.svg" />
                            <img className="treetop-ir" alt="" src="../../assets/treetop-ir.svg" />
                            <img className="treetop-ol" alt="" src="../../assets/treetop-ol.svg" />
                        </div>
                    </div>
                    <div className="treetrunk-or" />
                    <div className="treetrunk-ir" />
                </div>
            </div>
        </div>
    );
};
