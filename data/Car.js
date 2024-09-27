class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed;
    this.isTrunkOpen;
  };

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, ${this.speed} km/h ${this.isTrunkOpen}`);
  }
  go(){
    if(this.speed > 200 && this.isTrunkOpen === false){
      this.speed = 200;
    }
    if(this.isTrunkOpen === false){
      this.speed += 5;
    }
  }
  break(){
    this.speed -= 5;
    if(this.speed < 0){
      this.speed = 0;
    }
  }
  openTrunk(){
      if(this.speed === 0){
        this.isTrunkOpen = true;
      } else {
        console.log('speed not at 0')
      }
    }
  closeTunk(){
      this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(){
    if(this.speed > 200 && this.isTrunkOpen === false){
      this.speed = 200;
    }
    if(this.isTrunkOpen === false){
      this.speed += this.acceleration;
    }
  }
  displayInfo(){
    console.log(`${this.brand} ${this.model}, ${this.speed} km/h`);
  }
  openTrunk(){
    console.log("Race cars don't have trunks");
  }
  closeTunk(){
  console.log("Race cars don't have trunks")
  }
}



const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla',
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3',
});
const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

// car1.displayInfo();
// car2.displayInfo();

car1.go();
car1.go();
car1.go();
car1.go();
car1.break();
car1.break();
car1.break();
car1.go();
car1.break();
car1.displayInfo();
car1.openTrunk();
car1.displayInfo();
car1.break();
car1.openTrunk();
car1.displayInfo();


car3.displayInfo();
car3.go();
car3.go();
car3.displayInfo();





