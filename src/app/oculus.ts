import { Imei } from './imei';

export interface IOculus {
  id?: number;
  created_at?: string;
  ville?: string;
  incident?: string;
  description?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  image1?: string;
  image2?: string;
  multiImei?: Imei[];
}

export class Oculus implements IOculus{
  constructor(
    public id?: number,
    public created_at?: string,
    public ville?: string,
    public incident?: string,
    public description?: string,
    public phone?: string,
    public latitude?: number,
    public longitude?: number,
    public image1?: string,
    public image2?: string,
    public multiImei?: Imei[],
  ) {}
}
