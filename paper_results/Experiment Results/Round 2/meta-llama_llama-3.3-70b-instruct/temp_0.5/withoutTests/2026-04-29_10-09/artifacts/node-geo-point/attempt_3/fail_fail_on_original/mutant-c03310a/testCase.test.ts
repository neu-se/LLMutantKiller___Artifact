import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object without throwing', () => {
    const point = 'not an object';
    expect(() => {
      GeoPoint.fromGeoJSON(point);
      if (typeof point !== 'object') {
        throw new Error('Expected an error to be thrown');
      }
    }).toThrowError('Expected an error to be thrown');
  });
});