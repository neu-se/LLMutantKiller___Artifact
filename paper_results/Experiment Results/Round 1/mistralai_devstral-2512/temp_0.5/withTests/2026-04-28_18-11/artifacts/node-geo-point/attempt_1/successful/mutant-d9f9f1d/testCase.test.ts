import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when only longitude is missing', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 });
    }).toThrow(TypeError);
  });
});