export class Toode {
  constructor(
    private _id: number,
    private _name: string,
    public price: number,
    public isActive: boolean
) {}
//tagasta omadused
    get id() {
      return this._id;
    }

    get name() {
      return this._name;
    }
//sedaistab nime
    set name(newName: string) {
      this._name = newName;
    }
}

