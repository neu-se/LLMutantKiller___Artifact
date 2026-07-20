import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object has latitude but missing longitude', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 } as any);
    }).toThrow(TypeError);
  });
});