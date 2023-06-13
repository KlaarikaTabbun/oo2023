export class User{
	constructor(private _id:number, private _uname:string, public_eesnimi:string, public perenimi:string){
		
	}
	get id(){return this._id;}
	get uname(){return this._uname;}
	set uname(newName:string){this._uname=newName;}
	
}