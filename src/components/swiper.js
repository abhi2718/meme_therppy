import React, { useState } from 'react';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import {Dimensions} from 'react-native';
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: ${width}px;
`

const Header = styled.Text`
    color: #000;
    font-size: 30px;
    margin-bottom: 30px;
`

const CardContainer = styled.View`
    width: ${width-40}px;
    height: ${height-200}px;
    border-radius: 10px;
`

const Card = styled.View`
    position: absolute;
    background-color: #fff;
    width: ${width-40}px;
    height: ${height-200}px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    border-radius: 10px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`

const InfoText = styled.Text`
    height: 28px;
    justify-content: center;
    display: flex;
    z-index: -100;
`

const db = [
  {
    name: 'Richard Hendricks',
    img: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'Erlich Bachman',
    img: 'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'Monica Hall',
    img: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'Jared Dunn',
    img: 'https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    name: 'Dinesh Chugtai',
    img: 'https://images.pexels.com/photos/46505/swiss-shepherd-dog-dog-pet-portrait-46505.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];

function Simple () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <Container>
      <CardContainer>
        {characters.map((character) =>
          <TinderCard key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <Card>
              <CardImage source={{uri:character.img}}>
                <CardTitle>{character.name}</CardTitle>
              </CardImage>
            </Card>
          </TinderCard>
        )}
      </CardContainer>
    </Container>
  )
}

export default Simple