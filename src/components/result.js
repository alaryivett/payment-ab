import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Link } from "react-router-dom";
import { Main, Header, StyledLink } from './common-styles';

import fetch from 'node-fetch';
global.fetch = fetch;

const Loader = styled.div`
    padding: 120px 0 50px;

    background-image: url('img/75.gif');
    background-repeat: no-repeat;
    background-position: center 20px;

    text-align: center;
`;

const Result = () => {
    const [res, setRes] = useState('load');

    fetch('response.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        setRes('Math.round(Math.random())');
    });

    if (res=='load') {
        return (
            <Main>
                <Loader>
                    Соединение
                </Loader>
            </Main>
        )
    }
    else if(eval(res)==1) {
        return (
            <Main>
                <Header>ОПЛАТА ПРОШЛА УСПЕШНО</Header>

                <p>
                    <b>ОПЕРАТОР:</b>
                    <br/>{localStorage.getItem('operator')}
                </p>

                <p>
                    <b>НОМЕР ТЕЛЕФОНА:</b>
                    <br/>{localStorage.getItem('tel')}
                </p>

                <p>
                    <b>СУММА:</b>
                    <br/>{localStorage.getItem('cash')} р
                </p>

                <StyledLink as={Link} to='/' onClick={()=>{localStorage.clear()}}>На главную</StyledLink>
            </Main>
        )
    }
    else if(eval(res)==0){
        return (
            <Main>
                <Header>НЕ УДАЛОСЬ ПРОВЕСТИ ОПЛАТУ</Header>

                <StyledLink as={Link} to='/' onClick={()=>{localStorage.clear()}}>Попробовать еще раз</StyledLink>
            </Main>
        )
    }

}

export default Result;
