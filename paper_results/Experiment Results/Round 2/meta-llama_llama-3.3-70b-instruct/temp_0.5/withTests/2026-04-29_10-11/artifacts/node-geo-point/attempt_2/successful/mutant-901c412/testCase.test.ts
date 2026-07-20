import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error for latitude less than -90', () => {
    expect(() => new GeoPoint(-90.1, 0)).toThrowError('bad latitude value');
    expect(() => new GeoPoint(-90, 0)).not.toThrowError();
  });
});