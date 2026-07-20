import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when only longitude is missing', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 10 } as any);
    }).toThrow(TypeError);
  });
});