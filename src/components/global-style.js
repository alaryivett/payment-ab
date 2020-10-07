import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;

        background-image: url('img/bg.jpg');
        background-size: cover;
        background-attachment: fixed;

        height: 100vh;

        margin: 0;
        padding-top: 200px;

        box-sizing: border-box;

        @media (max-height: 700px) {
            padding-top: 100px;
        }

        @media (max-height: 530px) {
            padding-top: 0;
        }

        @media (min-width: 2000px) {
            zoom: 2;
        }
    }`;

export default GlobalStyle;
