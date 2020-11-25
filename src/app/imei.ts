export interface IImei {
  id?: number;
  imei?: string;
}

export class Imei implements IImei{
  constructor(
  public id?: number,
  public imei?: string
  ) {}
}
