'use strict';

const expect = require("chai").expect;
const app = require('../public/app');


const animalData = [
{
body_size: "large",
claws: "sharp",
color: "brown",
fur_type: "plain",
id: 1,
name: "Peanut butter",
number_of_legs: 4,
type: "dog"
},
{
body_size: "normal",
claws: "sharp",
color: "black",
fur_type: "striped",
id: 2,
name: "Teddy bear biscuit",
number_of_legs: 4,
type: "cat"
},
{
body_size: "large",
claws: "sharp",
color: "white",
fur_type: "striped",
id: 3,
name: "Albert Pamplemousse",
number_of_legs: 4,
type: "dog"
},
{
body_size: "small",
claws: "sharp",
color: "white",
fur_type: "striped",
id: 4,
name: "Apricot Strudel",
number_of_legs: 4,
type: "dog"
},
{
body_size: "normal",
claws: "sharp",
color: "white",
fur_type: "striped",
id: 5,
name: "Baron Von Thumper",
number_of_legs: 4,
type: "cat"
}
]

describe('Universe', function(){
  it('should be self-consistent', function (){
    (2).should.equal(2);
  })
})


describe('Create Table', function(){
  it('render all Characteristics', function (){

    expect(createTable(animalData, 0, 5)).to.include("white");
  })
})
