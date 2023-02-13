let klaviatuur=require("readline-sync")
let alus:number=klaviatuur.question("Palun sisesta kolmnurga alus:");
let k6rgus:number=klaviatuur.question("Palun sisesta k6rgus:");

function pindala(alus:number, k6rgus:number):number{
	return (alus*k6rgus)/2;
}
 console.log(pindala(alus, k6rgus));
