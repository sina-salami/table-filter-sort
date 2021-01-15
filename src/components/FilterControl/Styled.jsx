import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 25%;

    p {
        align-self: center;
        font-size: 14px;
        color: #252422;
    }

    input {
        background: #fff;
        border: 1px solid #000;
        border-radius: 10px;
        width: 80%;
        height: 40px;
        padding: 0 5px;

        &:focus {
            border-color: #ffd447;
            outline: none;
        }
    }

    @media (min-device-width: 320px) and (max-device-width: 767px) {
        width: 50%;
        p {
            font-size: 10px;
        }
    }
`;
