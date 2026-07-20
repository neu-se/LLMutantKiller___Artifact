import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when only latitude is missing', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: undefined as any, longitude: 10 });
    }).toThrow(TypeError);
  });
});