let klaviatuur=require("readline-sync")
let kiirus1:number=parseInt(klaviatuur.question("Palun sisesta esimene kiirus: "));
let kiirus2:number=parseInt(klaviatuur.question("Palun sisesta teine kiirus: "));

function keskmine(kiirus1: number, kiirus2: number): number{
	
    return (kiirus1+kiirus2)/2;
}
console.log(keskmine(kiirus1, kiirus2));

/*class kiirused {
	constructor(keskmine: number, teekond: number){}
	
}*/
