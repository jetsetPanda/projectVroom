import React from 'react';
import './App.css';
import {CarMakes, inventory} from "./api/mockdata";
import styled from "styled-components";
import {colorConst} from "./constants/colors.constant";

/*
 * data operation
 */


function reconcileInventory(cars, inv) {
    const IdMap = new Map();

    const reconcileInv = ({make, model, img}) => {
        return {
            deliveries: [],
            make: make,
            model: model,
            imgSrc: img
        }
    }

    for(const {id, ...car} of cars){
        const invData = reconcileInv({...car})
        IdMap.set(id, invData);
    }

    for(const {carId, quantity, dateReceived} of inv){
        const invData = IdMap.get(carId);
        const deliveries = invData.deliveries;
        deliveries.push({
            deliveryDate: dateReceived,
            carsDelivered: quantity
        });
    }

    return IdMap;
}



/*
 * styled components
 */

let {primary, zwei, trois} = colorConst;

const MyStyledContainer = styled.div`
    width: 75vw;
    min-height: 70vh;
    margin: 10vh auto;
    padding: 40px;
    box-shadow: -3px 5px 10px ${props => props.boxShadah || trois.poopy};
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
    transition: all ease-in 0.2s;
    
    &:hover {
        background: ${zwei["fraulein-blau"]};
        color: ${primary.nadir};
        border: 2px solid ${primary.azool}
    }
`

const JetsetTypographyH3 = styled.h3`
    font-family: 'Audiowide', sans-serif;
    font-weight: 600;
    font-size: 2em;
    // letter-spacing: 0.1em;
    padding: 5px 0;
    margin: 0;
    text-transform: ${props => props.textTransform || "none"};
    color: ${props => props.textColor|| primary.rojo}
`
const Shadowed = styled.span`
    text-shadow: 2px 2px 5px ${zwei["fraulein-blau"]}
`
const ThumbnailImg = styled.img`
    width: 180px;
    height: auto;
`

/*
 * stateless "dumb"/display components
 */
const HaiHello = () => (
    <React.Fragment>
    {/*obv unstyled h2*/}
      <h3>
        Wilkommen! I'm a boring h3, below is a styled AF H3-Component
      </h3>
    {/*supa styled to death H3*/}
      <Shadowed>
        <JetsetTypographyH3
            textColor={trois.slushy}
            textTransform="uppercase"
        >
          jetSEtAut0s
        </JetsetTypographyH3>
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


    let reconciledInventory = reconcileInventory(CarMakes, inventory);
    console.log("reconciled inventory is: ", reconciledInventory);

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
