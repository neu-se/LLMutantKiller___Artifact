import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error with a descriptive message when creating a GeoPoint from an object without a type and coordinates', () => {
    expect(() => GeoPoint.fromObject({})).toThrowError('Object must have latitude and longitude');
  });
});