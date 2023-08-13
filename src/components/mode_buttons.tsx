import React, {MouseEvent} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {modes} from "../index";

export const ModeButtons = (setter: {setMode: any;}) => {
    const {setMode} = setter;
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        console.log((e.target as Element).id)
        setMode((e.target as Element).id);
    };
    return (
        <ButtonGroup onClick={handleClick}>
            {modes?.map((mode, i) => (
                <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                    <Tooltip id="tooltip" className="tooltip">
                        <strong>{mode.tooltip.title}</strong>
                        <br></br>
                        {mode.tooltip.msg}
                    </Tooltip>
                    }
                    delay={{ show: 250, hide: 0 }}
                    trigger={["hover"]}
                    >
                <Button
                    key={i}
                    id={mode.id}
                    variant="primary"
                    className="btn">
                    {mode.name}
                </Button></OverlayTrigger>
            ))}
        </ButtonGroup>
    );
}