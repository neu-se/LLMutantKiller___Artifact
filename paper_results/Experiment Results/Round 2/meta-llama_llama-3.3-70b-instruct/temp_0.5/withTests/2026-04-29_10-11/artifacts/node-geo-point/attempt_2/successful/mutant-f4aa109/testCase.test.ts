import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint with an invalid latitude', () => {
    try {
      new GeoPoint(100, 0);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('bad latitude value');
      } else {
        throw error;
      }
    }
  });
});