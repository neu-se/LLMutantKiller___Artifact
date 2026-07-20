import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid object', () => {
    expect(() => GeoPoint.fromObject({ latitude: 10, longitude: 20, foo: 'bar' })).toThrowError(TypeError);
  });
});