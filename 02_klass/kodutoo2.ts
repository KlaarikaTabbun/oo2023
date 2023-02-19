class Vendor {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    return "Tere tulemast " + this.name;
  }
}

class FoodTruck extends Vendor {
  cuisine: string;

  constructor(name: string, cuisine: string) {
    super(name);
    this.cuisine = cuisine;
  }

  greet() {
    return "Tere tulemast " + this.name + " food trucki. Me pakume " + this.cuisine + "toitu.";
  }
}

const truck = new FoodTruck("Wing Stop", "tänava");

console.log(truck.greet());
