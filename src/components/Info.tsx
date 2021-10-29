import { FunctionComponent } from "react";
import styled from "styled-components";

export const Info: FunctionComponent = () => {
    return (
        <Container>
            <h2>Vardagsmaten</h2>
            <p>Något som inte faller i smaken? Tryck på ikonen i hörnet</p>

            <i>Skapat av Joakim Jäderberg</i>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-areas:
        "heading"
        "info"
        "creator";
    text-align: center;
    padding: 30px;

    h2 {
        grid-area: heading;
        align-self: end;
    }

    p {
        grid-area: info;
        align-self: flex-start;
    }

    i {
        grid-area: creator;
        font-size: 1vmax;
        text-align: right;
        align-self: end;
    }
`;
