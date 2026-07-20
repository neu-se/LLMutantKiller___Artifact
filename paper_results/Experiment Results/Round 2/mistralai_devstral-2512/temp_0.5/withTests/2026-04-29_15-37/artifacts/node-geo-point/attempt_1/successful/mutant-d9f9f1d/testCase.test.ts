import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object has only latitude', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 });
    }).toThrow('Object must have latitude and longitude');
  });
});