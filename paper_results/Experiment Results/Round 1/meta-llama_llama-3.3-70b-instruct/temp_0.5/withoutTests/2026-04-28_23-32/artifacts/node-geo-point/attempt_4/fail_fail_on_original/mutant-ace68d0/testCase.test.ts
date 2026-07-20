import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid object', () => {
    expect(() => GeoPoint.fromObject({ latitude: 1, longitude: 'a' })).toThrow(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 'a', longitude: 1 })).toThrow(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 1, longitude: 1 })).not.toThrow(TypeError);
    expect(() => GeoPoint.fromObject(null)).toThrow(TypeError);
  });
});