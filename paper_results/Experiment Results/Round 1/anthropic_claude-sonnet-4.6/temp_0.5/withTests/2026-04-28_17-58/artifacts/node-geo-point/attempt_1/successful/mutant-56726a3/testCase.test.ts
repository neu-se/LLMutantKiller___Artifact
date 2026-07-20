import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject error message', () => {
  it('should throw a TypeError with the correct message when object is missing latitude or longitude', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 } as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 } as any);
    }).toThrow('Object must have latitude and longitude');
  });
});