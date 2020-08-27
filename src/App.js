import React from 'react';
import './App.css';
import {CarMakes, inventory} from "./api/mockdata";
import styled from "styled-components";
import {colorConst} from "./constants/colors.constant";

let {primary, zwei, trois} = colorConst;

/*
 * styled components
 */
const Shadowed = styled.span`
    text-shadow: 2px 2px 5px${zwei["fraulein-blau"]}
`
const StyleRounded = styled.span`
    border-radius: 25px;
`

const MyStyledContainer = styled.div`
    width: 80vw;
    min-height: 70vh;
    margin: 0 auto;
    padding: 40px;
    box-shadow: -5px 5px 15px ${props => props.boxShadah};
    text-align: right;
    color: #000000;
    border-radius: 15px;
    background: ${primary.blanque}
`

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`
const Card = styled.div`
    width: 200px;
    height: 400px;
    padding: 5px;
    background: ${zwei["das-blau"]};
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: flex-start;
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

/*
 * stateless "dumb" components
 */
const HaiHello = () => (
    <React.Fragment>
    {/*obv unstyled h2*/}
      <h2>
        Wilkommen!
      </h2>
    {/*supa styled to death H2*/}
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

const JetsetAutoCard = (props) => {
    return(
        <React.Fragment>
            <Card>
                <StyleRounded>
                    <ThumbnailImg
                        src={props.imgSrc}
                        // src={CarMakes[0].img}
                    />
                    <h4>{props.make}</h4>
                    <h6>{props.model}</h6>

                </StyleRounded>

            </Card>
        </React.Fragment>
    );
}

// le view actuale

function App() {

  return (
      <div className="App">
          <MyStyledContainer>
            <HaiHello/>
            <FlexRow>
              {CarMakes.map((car) => {
                  return (
                      <JetsetAutoCard
                          key={car.id}
                          imgSrc={car.img}
                          make={car.make}
                          model={car.model}

                      />
                  )
                })
              }
          </FlexRow>

          </MyStyledContainer>
      </div>
  );
}

export default App;
