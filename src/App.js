import React from 'react';
import './App.css';
import {CarMakes, inventory} from "./api/mockdata";
import styled from "styled-components";
import {colorConst} from "./constants/colors.constant";

let {primary, zwei, trois} = colorConst;

// styled components
const Shadowed = styled.span`
    text-shadow: 2px 2px 5px${zwei["fraulein-blau"]}
`
const StyleRounded = styled.span`
    box-radius: 25px;
`

const MyStyledContainer = styled.div`
    width: 35em;
    height: 70vh;
    margin: 0 auto;
    padding: 40px;
    box-shadow: -5px 5px 15px ${props => props.boxShadah};
    text-align: right;
    color: #000000;
    background: ${primary.blanque}
`

const Card = styled.div`
    width: 200px;
    height: 150px;
    padding: 5px;
`

const JetsetTypographyH2 = styled.h2`
    font-weight: 600;
    font-size: 3.5em;
    letter-spacing: 0.2em;
    padding: 5px 0;
    margin: 0;
    text-transform: ${props => props.textTransform || "none"};
    color: ${props => props.textColor|| primary.rojo}
`
const ThumbnailImg = styled.img`
    width: 180px;
    height: auto;
`

// stateless "dumb" components
const HaiHello = () => (
    <React.Fragment>
      <h2>
        Welcome to:
      </h2>
      <Shadowed>
        <JetsetTypographyH2
            textColor={trois.slushy}
            textTransform="uppercase"
        >
          Das Autos
        </JetsetTypographyH2>
      </Shadowed>
    </React.Fragment>
);

const CarThumbnail = (props) => (
    <React.Fragment>
      <Card>
        <StyleRounded>
          <ThumbnailImg
              src={props.imgSrc}
          />
          <p>
              {props.make}
          </p>
        </StyleRounded>

      </Card>
    </React.Fragment>
);

// le view actuale

const CardList = CarMakes.map((car) => {
    <div>
        <CarThumbnail
            key={car.id}
            imgSrc={car.img}
            make={car.make}
            model={car.model}
        />
    </div>

});

function App() {

  return (
      <div className="App">
          <MyStyledContainer>
            <HaiHello/>
          <CardList/>
          </MyStyledContainer>
      </div>
  );
}

export default App;
