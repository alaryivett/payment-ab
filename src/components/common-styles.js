import styled from 'styled-components';
import {Link} from "react-router-dom";

export const Main = styled.div`
    margin: 0 auto;
    padding: 30px 30px 15px;

    width: 300px;

    background-color: #f6f6ef;

    box-shadow: 0 0 30px 10px #3b3d31;
`;

export const Header = styled.h1`
    margin-top: 0;

    font-weight: normal;
    text-align: center;
`;

export const StyledLink = styled.a`
    padding: 25px 15px 10px;
    margin-bottom: 20px;

    width: auto;

    font-size: 13px;
    text-decoration: underline;
    color: #4bb268;

    border: none;

    background-color: transparent;
`;
