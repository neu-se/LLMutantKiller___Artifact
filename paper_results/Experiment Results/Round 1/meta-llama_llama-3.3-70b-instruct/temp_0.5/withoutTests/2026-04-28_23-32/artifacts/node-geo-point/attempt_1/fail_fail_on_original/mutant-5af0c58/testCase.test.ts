import { GeoPoint } from "../../../src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with non-numeric coordinates', () => {
    expect(() => new GeoPoint('a' as any, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 'a' as any)).toThrow(RangeError);
  });
});