import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from null', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 0, longitude: 0 })).not.toThrowError();
    expect(() => GeoPoint.fromObject({ latitude: 0, longitude: 0 })).not.toThrowError();
    expect(() => GeoPoint.fromObject({})).toThrowError(TypeError);
  });
});