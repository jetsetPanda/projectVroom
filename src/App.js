import React from 'react';
import './App.css';
import {CarMakes, inventory} from "./api/mockdata";
import styled from "styled-components";
import {colorConst} from "./constants/colors.constant";

/*
 * data operation
 */

function reconcileInventory(cars, inv) {
    let results = [];
    const MapById = new Map(); //hashmap thru common id

    const reconcileInv = (id, {make, model, img, theme}) => {
        return {
            deliveries: [],
            id: id,
            make: make,
            model: model,
            imgSrc: img,
            theme: theme
        }
    }

    for(const {id, ...car} of cars){
        const invData = reconcileInv(id, {...car})
        MapById.set(id, invData);
    }

    for(const {carId, quantity, dateReceived} of inv){
        const invData = MapById.get(carId);
        const deliveries = invData.deliveries;
        deliveries.push({
            deliveryDate: dateReceived,
            carsDelivered: quantity
        });
    }

    MapById.forEach(value => {
        results.push(value);
    })

    return results;
}



/*
 * styled components
 */

let {primary, zwei, trois} = colorConst;

// layout styles
const FlexRow = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirect || "row"};
    flex-wrap: ${props => props.wrap || "wrap"};
    justify-content: ${props => props.justifyContent || "space-evenly"};
`

const MyStyledContainer = styled.div`
    max-width: 1250px;
    min-height: 60vh;
    margin: 10vh auto;
    padding: 40px;
    box-shadow: -3px 5px 10px ${gimme => gimme.boxShadah || trois.poopy};
    text-align: right;
    color: #000000;
    border-radius: 15px;
    background: ${primary.blanque}
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
// font styles

const JetsetTypographyH3 = styled.h3`
    font-family: 'Audiowide', sans-serif;
    font-weight: 600;
    font-size: 2em;
    // letter-spacing: 0.1em;
    padding: 5px 0;
    margin: 0;
    text-transform: ${props => props.textTransform || "none"};
    color: ${gimme => gimme.textColor|| primary.rojo}
`
const JetsetTypographyH4 = styled.h4`
    font-family: 'Bebas Neue', cursive;
    color: ${zwei["rias-baixas"]};
`
const JetsetTypographyH5 = styled.h5`
    font-family: 'Oxanium', cursive;
    color: ${zwei["gruner-veltliner"]};
`

const JetsetTypographyP = styled.p`
    font-size: 0.5em;
    font-weight: 600;
    color: ${props => props.color || primary.nadir};
    margin: ${props => props.margin || "0.3em"};
    
    &:hover {
        color: ${props => props.hoverColor || primary.rojo};
    }
`
// random shites

const Shadowed = styled.span`
    text-shadow: 2px 2px 5px ${zwei["fraulein-blau"]}
`
const ThumbnailImg = styled.img`
    width: 180px;
    height: auto;
`

/*
 * helper
 *
 */

const gimmeDate = (stamp) => {
    let millisec = (parseInt(stamp)) * 1000;
    let dateObj = new Date(millisec);
    return dateObj.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    })
}


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

const CarDeliveryInfo = (props) => (
    <FlexRow
        justifyContent="space-between"
    >
        <JetsetTypographyP
            color={trois.poopy}
        >
            {gimmeDate(props.deliveryDate)}
        </JetsetTypographyP>

        <JetsetTypographyP
            color={trois.gnarly}
        >
            {" "}{props.carsDelivered}
        </JetsetTypographyP>
    </FlexRow>
)
const JetsetAutoCard = (props) => {
    console.log("stuff: ", props.carStuffs);
    let { make,
          model,
          imgSrc,
          theme,
          deliveries
    } = props.carStuffs;

    let runningTotal = 0;

    return(
        <React.Fragment>
                <Card
                    theme={theme}
                >
                    <ThumbnailImg
                        src={imgSrc}
                    />
                    <JetsetTypographyH4>
                        {make}
                    </JetsetTypographyH4>
                    <JetsetTypographyH5>
                        {model}
                    </JetsetTypographyH5>
                    <FlexRow>
                        {(deliveries.length > 0) ? deliveries.map((delivery) => {
                            runningTotal += delivery.carsDelivered;
                            return (
                                    <CarDeliveryInfo
                                        deliveryDate={delivery.deliveryDate}
                                        carsDelivered={delivery.carsDelivered}
                                    />
                                )

                        }) : (
                            <JetsetTypographyP
                                color={trois.merp}
                            >
                                No Deliveries for the {model}.
                            </JetsetTypographyP>)
                        }
                    </FlexRow>
                        {(runningTotal>0) &&
                            <JetsetTypographyP
                                color={trois.merp}
                            >
                                Delivered {model}s: {runningTotal}
                            </JetsetTypographyP>
                        }
                </Card>

        </React.Fragment>
    );
}

let carInventory = reconcileInventory(CarMakes, inventory);
console.log("reconciled inventory is: ", carInventory);

// below: Le View Actualite

function App() {
    // const cars = reconciledInventory;

    return (
      <div className="App">
          <MyStyledContainer>
            <HaiHello/>
            <FlexRow>
              {carInventory.map((car) => {
                  console.log("car: ", car);
                  return (
                      <JetsetAutoCard
                          key={car.id}
                          carStuffs={{...car}}
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
