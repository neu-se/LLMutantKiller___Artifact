import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid object', () => {
    expect(() => GeoPoint.fromObject(undefined)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 10 })).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ longitude: 10 })).toThrowError(TypeError);
  });
});