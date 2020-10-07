import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledLabel = styled.label`
    position: absolute;

    padding: ${props => props.inputValue?'5px 5px 5px 17px':props.disable?'5px 5px 5px 17px':'17px'};

    font-size: ${props => props.inputValue?'12px':props.disable?'12px':'16px'};

    transition-property: font-size, padding;
	transition-duration: 0.3s;
	transition-timing-function: linear;
`;

const StyledInput = styled.input`
    display: block;
    box-sizing: border-box;

    padding: ${props=>props.disabled?'25px 15px 10px 17px':'25px 15px 10px'};

    width: 100%;

    font-family: inherit;
    font-size: 16px;

    text-decoration: none;

    border: ${props=>props.disabled?'none':'2px solid #d5d5d5'};

    background-color: ${props=>props.disabled?'transparent':'white'};

    border-radius: 5px;

    transition-property: background-color;
	transition-duration: 0s;
	transition-timing-function: linear;
`;

const Tooltip = styled.span`
    display: block;

    padding: 5px;

    width: 100%;
    height: 15px;

    font-size: 12px;
    font-weight: bold;
    color: red;

    opacity: 0;

    transition-property: opacity;
	transition-duration: 0s;
	transition-timing-function: linear;
`;

const StyledInputContainer = styled.div`
    position: relative;

    width: 100%;
`;

const AnimatedInput = (props) => {
    return (
        <StyledInputContainer>
            <StyledLabel inputValue={props.defaultValue} disable={props.disabled} for={props.id}>{props.label}</StyledLabel>

            <StyledInput
                id={props.id}
                type={props.type}
                name={props.name}
                disabled={props.disabled}
                maxLength={props.maxLength}
                required={props.required}
                max={props.max}
                defaultValue={props.defaultValue}
                onKeyDown={props.onKeyDown}
                onKeyUp={props.onKeyUp}
            />

            <Tooltip/>
        </StyledInputContainer>
    )
}

export const inputError = (id, message) => {
    let input = document.querySelector(`#${id}`);
    let tooltip = document.querySelector(`#${id} + span`);

    input.style.backgroundColor = '#ffdfdf';

    tooltip.textContent = message;
    tooltip.style.opacity = '1';

    setTimeout(()=>{
        input.style.transitionDuration = '2.5s';
        input.style.backgroundColor = 'white';

        tooltip.style.transitionDuration = '2.5s';
        tooltip.style.opacity = '0';
    }, 100)

    setTimeout(()=>{
        tooltip.textContent = '';
        input.style.transitionDuration = '0s';
        tooltip.style.transitionDuration = '0s';
    }, 2500)
}

export const labelAnimation = () => {
    document.querySelector('body').addEventListener('click', (ev)=>{
        document.querySelectorAll('input').forEach((el)=>{
            if (!el.value) {
                document.querySelector(`[for=${el.id}]`).style = 'font-size: 16px; padding: 17px;';
            }
        })

        if (ev.target.tagName == 'INPUT') {
            document.querySelector(`[for=${ev.target.attributes.id.value}]`).style = 'font-size: 12px; padding: 5px 5px 5px 17px;';
        }
        else if (ev.target.tagName == 'LABEL') {
            document.querySelector(`[for=${ev.target.attributes.for.value}]`).style = 'font-size: 12px; padding: 5px 5px 5px 17px;';
        }
    })
}

export default AnimatedInput;
