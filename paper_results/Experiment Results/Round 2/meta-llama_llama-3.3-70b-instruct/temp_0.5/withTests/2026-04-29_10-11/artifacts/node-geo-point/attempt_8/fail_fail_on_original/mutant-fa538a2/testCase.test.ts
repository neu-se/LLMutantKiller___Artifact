import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a descriptive message when creating a GeoPoint with an invalid longitude', () => {
    try {
      new GeoPoint(0, 200);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).not.toBe('');
      } else {
        throw error;
      }
    }
    expect(false).toBe(true); // This line should be reached only if no error is thrown, which is the case for the mutated code
  });
});