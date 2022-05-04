const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {

  let dinosaur_1
  let dinosaur_2
  let park
  let park_2

  beforeEach (function () {
    dinosaur_1 = new Dinosaur('t-rex', 'carnivore', 50)
    dinosaur_2 = new Dinosaur('brachiosaurus', 'herbivore', 45)
    park = new Park('Jurassic Park', 250, [dinosaur_1])
    park_2 = new Park('Jurassic Park', 250, [dinosaur_1, dinosaur_2])
  })

  it('should have a name', function() {
    const actual = park.name
    assert.strictEqual(actual,'Jurassic Park')
    })

  it('should have a ticket price', function() {
    const actual = park.ticket_price
    assert.strictEqual(actual, 250)
    })

  it('should have a collection of dinosaurs', function(){
    const actual = park.dinosaurs
    assert.notEqual(actual,null)
  });

  it('should be able to add a dinosaur to its collection', function(){
    park.addDinosaur(dinosaur_2)
    const actual = park.dinosaurs.length
    assert.strictEqual(actual,2)

  });

  it('should be able to remove a dinosaur from its collection',function(){
    park.removeDinosaur(dinosaur_2)
    const actual = park.dinosaurs.length
    assert.strictEqual(actual,1)
  });

  it('should be able to find the dinosaur that attracts the most visitors',function(){
    const actual = park.favouriteDinosaur()
    assert.strictEqual(actual,dinosaur_1)

  });

  it('should be able to find all dinosaurs of a particular species', function(){
    const actual = park_2.findBySpecies('brachiosaurus')
    assert.deepEqual(actual,[dinosaur_2])
  });

  it('should be able to calculate the total number of visitors per day', function(){
    const actual = park_2.visitorsPerDay()
    assert.strictEqual(actual,95)
  });

  it('should be able to calculate the total number of visitors per year', function() {
    const actual = park_2.visitorsPerYear()
    assert.strictEqual(actual,34675)
  });

  it('should be able to calculate total revenue for one year', function(){
    const actual = park_2.totalRevenuePerYear()
    assert.strictEqual(actual,8668750)
  });

});
