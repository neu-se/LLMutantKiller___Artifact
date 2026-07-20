import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint tests', () => {
  it('should not throw an error when type is Point', () => {
    expect(() => GeoPoint.fromGeoJSON({
      type: 'Point',
      coordinates: [[-0.15, 51.5]]
    })).not.toThrowError();
  });
});