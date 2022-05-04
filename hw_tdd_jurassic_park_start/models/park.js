const Dinosaur = require('../models/dinosaur.js');

const Park = function(name, ticket_price, dinosaurs) {
    this.name = name
    this.ticket_price = ticket_price
    this.dinosaurs = dinosaurs
}

Park.prototype.addDinosaur = function(dinosaur) {
    this.dinosaurs.push(dinosaur)
}


////////////////////////////////// How it works below////////////////////////////////////////
// 1. Adding the removeDinosaur method to Parks' prototype, passing in the dinosaur_to_remove
// 2. Using array.filter to get rid of the dinosaur
////  Syntax --> array.filter(function(variable to check against condition for filtering))
////  Note 1: function is a keyword here and can't be replaced by a custom name
////  Note 2: the variable passed represents any item from the list
////  Any item that passes the comdition check is added to the filtered list
////  Here the condition is for the included dinosaurs to not be the dinosaur_to_exclude
// 3. Once the filtered list is returned, we have to replace the actual dinosaur list by it!


Park.prototype.removeDinosaur = function(dinosaur_to_remove) {
    let filtered_dinosaurs = this.dinosaurs.filter(function(dinosaur){
        return dinosaur !== dinosaur_to_remove
    })
    this.dinosaurs = filtered_dinosaurs
}

Park.prototype.favouriteDinosaur = function() {
    let highest_number_of_visitors = 0
    let favouriteDino
    for (dino of this.dinosaurs) {
        if (dino.guestsAttractedPerDay > highest_number_of_visitors) {
            highest_number_of_visitors = dino.guestsAttractedPerDay
            favouriteDino = dino
        }        
    }
    return favouriteDino
}

Park.prototype.findBySpecies = function(species) {
    let filtered_dinosaurs = this.dinosaurs.filter(function(dinosaur){
        return dinosaur.species === species
    })
    return filtered_dinosaurs
}

Park.prototype.visitorsPerDay = function() {
    let total_visitors = 0
    for (dino of this.dinosaurs){
        total_visitors += dino.guestsAttractedPerDay
    }
    return total_visitors
}

Park.prototype.visitorsPerYear = function() {
    const visitors_per_year = this.visitorsPerDay()*365
    return visitors_per_year
}

Park.prototype.totalRevenuePerYear = function() {
    const total_revenue = this.visitorsPerYear() * this.ticket_price
    console.log(total_revenue)
    return total_revenue
}

const dinosaur_1 = new Dinosaur('t-rex', 'carnivore', 50)
const dinosaur_2 = new Dinosaur('brachiosaurus', 'herbivore', 45)
const park = new Park('Jurassik Park', 250, [dinosaur_1, dinosaur_2])

console.log(park.totalRevenuePerYear())

module.exports = Park