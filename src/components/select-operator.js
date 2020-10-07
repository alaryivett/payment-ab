import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';

import { Link } from "react-router-dom";

import AnimatedInput, {inputError, labelAnimation} from './animated-input';
import { Main, Header} from './common-styles';

const Operators = styled.ul`
    padding: 0;
    margin: 0;

    list-style: none;
`;

const showOperator = keyframes`
    0% {height: 0px;}
    100% {min-height: 57px;}
`;

const Operator = styled.li`
    margin-bottom: 15px;

    animation: ${showOperator} 0.3s linear 1 forwards;
`;

const OperatorLink = styled.a`
    display: block;

    padding: 17px;

    width: 100%;

    text-decoration: none;
    color: black;
    word-break: break-all;

    border: 2px solid #d5d5d5;
    border-radius: 5px;

    box-sizing: border-box;

    background-color: white;
`;

const OpenFormBtn = styled.button`
    margin-bottom: 20px;

    border: none;

    background-color: transparent;

    color: #4bb268;
    text-decoration: underline;

    cursor: pointer;
`;

const OperatorAddForm = styled.form`
    flex-wrap: nowrap;
    display: none;
`;

const OperatorAddBtn = styled.button`
    width: 40px;

    border: none;
    border-radius: 5px;

    background-color: transparent;
    background-image: url('img/ok.jpg');
    background-size: contain;
    background-position: 5px 10px;
    background-repeat: no-repeat;
`;

const SelectOperator = () => {
    const [operators, addOperator] = useState(['МТС', 'Билайн', 'Мегафон']);

    labelAnimation();

    return (
        <Main>
            <Header>ВЫБЕРИТЕ ОПЕРАТОРА</Header>

            <Operators>
                {operators.map(el => {
                    return(
                        <Operator>
                            <OperatorLink as={Link} to='/enter-number' onClick={(ev) => {
                                document.querySelector('.block').classList.add('block-transition');
                                setTimeout(()=>{document.querySelector('.block').classList.remove('block-transition')}, 500);
                                localStorage.setItem('operator', el);
                            }}>
                                {el}
                            </OperatorLink>
                        </Operator>
                    )
                })}
            </Operators>

            <OpenFormBtn id='openFormBtn' type='button' onClick={(ev)=>{
                document.getElementById('operatorAddForm').style.display = 'flex';
                document.getElementById('openFormBtn').style.display = 'none';
            }}>Выбрать другого оператора</OpenFormBtn>

            <OperatorAddForm id='operatorAddForm'>
                <AnimatedInput
                    id='addOperatorInput'
                    type='text'
                    name='operator'
                    maxLength='2'
                    label='Введите другого оператора'/>

                <OperatorAddBtn type='submit'
                     onClick={ ev=>{
                    ev.preventDefault();

                    let newOperator = document.getElementById('addOperatorInput').value;

                    if (!/\S/g.test(newOperator)) {
                        inputError('addOperatorInput', 'Вы ничего ввели');
                    }
                    else {

                        addOperator([...operators, newOperator]);

                        document.getElementById('addOperatorInput').value = '';

                        document.getElementById('operatorAddForm').style.display = 'none';
                        document.getElementById('openFormBtn').style.display = 'block';
                    }
                }}
                ></OperatorAddBtn>
            </OperatorAddForm>
        </Main>
    );
}

export default SelectOperator;
