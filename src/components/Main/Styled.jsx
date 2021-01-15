import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90vw;
    margin: 5vh auto 0;
    background: #f4f3f6;
    border-radius: 10px;
    padding: 0 5%;
    box-sizing: border-box;
`;

export const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    @media (min-device-width: 320px) and (max-device-width: 767px) {
        flex-wrap: wrap;
    }
`;
