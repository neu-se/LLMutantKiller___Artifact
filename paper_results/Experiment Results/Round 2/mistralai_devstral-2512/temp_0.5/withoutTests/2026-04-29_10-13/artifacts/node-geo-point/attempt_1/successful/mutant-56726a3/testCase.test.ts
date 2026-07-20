import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with descriptive message when object lacks latitude or longitude', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 40 });
    }).toThrow('Object must have latitude and longitude');
  });
});