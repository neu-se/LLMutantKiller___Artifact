import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('throws an error when creating a GeoPoint with non-numeric coordinates', () => {
    try {
      new GeoPoint('a' as any, 0);
      throw new Error('Expected RangeError to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }

    try {
      new GeoPoint(0, 'a' as any);
      throw new Error('Expected RangeError to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError);
    }
  });
});