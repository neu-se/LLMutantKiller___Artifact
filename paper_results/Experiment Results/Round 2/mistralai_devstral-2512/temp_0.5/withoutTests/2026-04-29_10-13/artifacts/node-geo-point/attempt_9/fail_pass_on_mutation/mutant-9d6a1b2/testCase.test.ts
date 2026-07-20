import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when argument is missing longitude property', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 40.7128 } as any);
    }).toThrow(TypeError);
  });
});