import styled from 'styled-components';

export const TableContainer = styled.div`
    display: block;
    overflow-y: scroll;
    height: 70vh;
    border-bottom: 1px solid #808080;
`;

export const BaseTable = styled.table`
    border-spacing: 0;
    width: 100%;
    margin: 0 auto;
    display: table;
    border-collapse: separate;

    td {
        border: 1px solid #808080;
        border-bottom: 0;
        text-align: center;
        padding: 10px 5px;
        color: #252422;
        :not(:last-of-type) {
            border-left: 0;
        }

        span {
            color: #ff101f;
        }
    }

    tr.row {
        cursor: pointer;

        :hover {
            background: #afadac;
        }
    }

    tr:nth-of-type(1) {
        td {
            border-top: 0;
        }
    }

    tr:nth-of-type(2n) {
        background: #e9e9ed;
    }

    p {
        width: 100%;
        text-align: center;
    }
`;

export const TableHead = styled.th`
    position: sticky;
    top: 0;
    background: #ffd447;
    border: 1px solid #000;
    color: #320d6d;
    padding: 10px 5px;
    margin: 0;
    width: ${(props) => props.width}%;
    cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
    :not(:last-of-type) {
        border-left: 0;
    }
`;

export const Pagination = styled.div`
    margin-top: 20px;
    text-align: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;

    p {
        margin: 0 5px;
    }

    input {
        margin: 0 10px;
        border: 1px solid #000;
        border-radius: 5px;
        width: 50px;
        height: 20px;
        text-align: center;
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &:focus {
            border-color: #ffd447;
            outline: none;
        }
    }

    input[type='number'] {
        -moz-appearance: textfield; /* Firefox */
    }

    span {
        cursor: pointer;
    }
`;

export const Arrow = styled.span`
    width: 1rem;
    height: 1rem;
    display: ${(props) => (props.order ? 'inline-block' : 'none')};
    position: relative;
    margin: 0 0px;
    &:after,
    &:before {
        content: '';
        top: 0.5rem;
        position: absolute;
        width: 0.65rem;
        height: 0.1rem;
        background-color: #000;
        display: inline-block;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }
    &:after {
        left: 0;
        transform: rotate(45deg);
    }
    &:before {
        right: 0;
        transform: rotate(-45deg);
    }
    ${(props) =>
        props.order === 2
            ? ' &:after { ' +
              ' -webkit-transform: rotate(-45deg); ' +
              ' transform: rotate(-45deg) ' +
              ' } ' +
              ' &:before { ' +
              ' -webkit-transform: rotate(45deg); ' +
              ' transform: rotate(45deg) ' +
              ' } '
            : ''};
`;

export const Error = styled.p`
    text-align: center;
    font-size: 20px;
    color: #ff101f;
`;
