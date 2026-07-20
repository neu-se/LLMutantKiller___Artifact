import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with an object argument that has no type or coordinates in the mutated code', () => {
    const point = {};
    expect(() => GeoPoint.fromGeoJSON(point)).toThrow();
  });
});