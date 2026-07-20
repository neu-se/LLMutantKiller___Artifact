import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error with a message when creating a GeoPoint from GeoJSON without type and coordinates', () => {
    expect(() => GeoPoint.fromGeoJSON({})).toThrowError('Object must have type and coordinates');
  });
});