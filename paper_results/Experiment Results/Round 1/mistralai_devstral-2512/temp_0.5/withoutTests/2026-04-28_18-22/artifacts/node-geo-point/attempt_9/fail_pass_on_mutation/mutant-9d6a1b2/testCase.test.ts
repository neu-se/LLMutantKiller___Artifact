import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is missing longitude property', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 45.5 } as any);
    }).toThrow(TypeError);
  });
});