import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a RangeError with a meaningful message when creating a GeoPoint with invalid longitude', () => {
    let errorMessage = '';
    try {
      new GeoPoint(0, 200);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).not.toBe('');
  });
});