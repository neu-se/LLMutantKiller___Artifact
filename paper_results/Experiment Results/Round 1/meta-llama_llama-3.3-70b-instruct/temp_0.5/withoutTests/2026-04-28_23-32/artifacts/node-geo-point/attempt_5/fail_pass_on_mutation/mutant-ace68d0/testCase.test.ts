import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid object', () => {
    expect(() => GeoPoint.fromObject({})).toThrow(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 1 })).toThrow(TypeError);
    expect(() => GeoPoint.fromObject({ longitude: 1 })).toThrow(TypeError);
  });
});