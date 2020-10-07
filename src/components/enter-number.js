import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import Result from './result';
import AnimatedInput, {inputError, labelAnimation} from './animated-input';

import { Main, Header, StyledLink } from './common-styles';

const SelectedOperator = styled.div`
    display: flex;

    margin-bottom: 15px;
`;

const ConfirmBtn = styled.button`
    margin: 15px 0;

    height: 53px;
    width: 100%;

    font-size: inherit;
    font-family: inherit;

    border: none;
    border-radius: 25px;

    background-color: #ffcbcb;

    box-shadow: 0 0 10px 0 grey;
`;

const EnterNumber = (props) => {
    const [tel, setTel] = useState('');
    const [cash, setCash] = useState('');

    if (tel && cash) {
        document.querySelector('.block').classList.add('block-transition');
        return <Redirect to='/result'/>
    }

    labelAnimation();

    return (
        <Main>
            <Header>ВВЕДИТЕ НОМЕР<br/>И СУММУ</Header>

            <form>
                <AnimatedInput
                    id='selectedOperator'
                    label='Выбранный оператор'
                    type='text'
                    name='operator'
                    disabled='true'
                    defaultValue={localStorage.getItem('operator')}
                />

                <AnimatedInput
                    id='inputTel'
                    label='Номер телефона'
                    type='tel'
                    name='tel'
                    maxLength='18'
                    required='true'
                    defaultValue={localStorage.getItem('tel')}
                    onKeyDown={el=>{
                        let telInput = el.target;

                    	if (!/\D/.test(el.key)) {
                    		if ((telInput.value.length == 0 && el.key !=='8') && (telInput.value.length == 0 && el.key !=='7')) {
                    			telInput.value = "+7 (";
                			}
                            else if ((telInput.value.length == 0 && el.key =='8') || (telInput.value.length == 0 && el.key =='7')) {
                                el.preventDefault();
                    			telInput.value = "+7 (";
                			}
                            else if ((telInput.value.length == 4 && el.key =='8') || (telInput.value.length == 4 && el.key =='7')) {
                                el.preventDefault();
                            }
                			else if (telInput.value.length == 7) {
                				telInput.value += ') ';
                			}
                			else if (telInput.value.length == 12) {
                				telInput.value += '-';
                			}
                		    else if (telInput.value.length == 15) {
                				telInput.value += '-';
                			}
                    	}
                    	else if (el.keyCode !== 8 && el.keyCode !== 13){
                            el.preventDefault();
                            inputError('inputTel', 'Можно вводить только цифры');
                    	}
                        else if (el.keyCode == 8 && telInput.value.length <5) {
                            el.preventDefault();
                        }

                    }} onKeyUp={()=>{
                        localStorage.setItem('tel', document.getElementById('inputTel').value);
                    }}
                />

                <AnimatedInput
                    id='inputCash'
                    label='Сумма в рублях (от 1 до 1000)'
                    type='number'
                    name='cash'
                    maxLength='4'
                    max='1000'
                    required='true'
                    defaultValue={localStorage.getItem('cash')}
                    onKeyDown={el=>{
                        let cashInput = el.target;

            			if (!/\D/.test(el.key)) {
                            if (cashInput.value.length == 0 && el.key == 0) {
                                el.preventDefault();
                                inputError('inputCash', 'Введите число от 1 до 1000');
                            }
            				if (cashInput.value + el.key > 1000) {
            					el.preventDefault();
            				}
            			}
            			else if (el.keyCode !== 8 && el.keyCode !== 13){
            				el.preventDefault();
                            inputError('inputCash', 'Можно вводить только цифры');
            			}
                    }} onKeyUp={()=>{
                        localStorage.setItem('cash', document.getElementById('inputCash').value);
                    }}
                />

                <ConfirmBtn type='submit' onClick={ev=>{
                    ev.preventDefault();
                    let telVal = document.getElementById('inputTel').value;
                    let cashVal = document.getElementById('inputCash').value;

                    if (document.getElementById('inputTel').value.length==18 && document.getElementById('inputCash').value) {
                        setCash(cashVal);
                        setTel(telVal);
                    }

                    if (document.getElementById('inputTel').value.length<18)  {
                        inputError('inputTel', 'Номер телефона должен состоять из 11 цифр');
                    }
                    if (!document.getElementById('inputCash').value) {
                        inputError('inputCash', 'Введите число от 1 до 1000');
                    }
                }}>Ок</ConfirmBtn>
            </form>
        </Main>
    );
}

export default EnterNumber;
