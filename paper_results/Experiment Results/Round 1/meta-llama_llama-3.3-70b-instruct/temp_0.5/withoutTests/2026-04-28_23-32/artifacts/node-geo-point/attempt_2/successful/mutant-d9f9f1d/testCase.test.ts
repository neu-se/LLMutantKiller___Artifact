import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object with only latitude', () => {
    const object = { latitude: 10 };
    expect(() => GeoPoint.fromObject(object)).toThrowError('Object must have latitude and longitude');
  });
});