import React from 'react';
import './App.css';
import {CarMakes, inventory} from "./api/mockdata";
import styled from "styled-components";
import {colorConst} from "./constants/colors.constant";

/*
 * data operation
 */

const getInventory = (makes, inv) => {
    console.log('makes:',makes);
    console.log('inv', inv);


}

let reconciledInventory = getInventory(CarMakes, inventory);

let {primary, zwei, trois} = colorConst;

/*
 * styled components
 */

const MyStyledContainer = styled.div`
    width: 80vw;
    min-height: 70vh;
    margin: 10vh auto;
    padding: 40px;
    box-shadow: -5px 5px 10px ${props => props.boxShadah || trois.poopy};
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
    margin: 5px auto;
    border: 2px solid ${zwei["das-blau"]};
    border-radius: 20px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: flex-start;
    color: ${trois.slushy};
    transition: all ease-in 0.3s;
    
    &:hover {
        background: ${zwei["fraulein-blau"]};
        color: ${primary.nadir};
        border: 2px solid ${primary.azool}
        box-shaddow: 
    }
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
const Shadowed = styled.span`
    text-shadow: 2px 2px 5px${zwei["fraulein-blau"]}
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
        Wilkommen! I'm a boring h2, below is a styled AF h2
      </h2>
    {/*supa styled to death H2*/}
      <Shadowed>
        <JetsetTypographyH2
            textColor={trois.slushy}
            textTransform="uppercase"
        >
          jetset Autos
        </JetsetTypographyH2>
      </Shadowed>
    </React.Fragment>
);

const JetsetAutoCard = (props) => {
    return(
        <React.Fragment>
                <Card>
                        <ThumbnailImg
                            src={props.imgSrc}
                            // src={CarMakes[0].img}
                        />
                        <h4>{props.make}</h4>
                        <h6>{props.model}</h6>
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
