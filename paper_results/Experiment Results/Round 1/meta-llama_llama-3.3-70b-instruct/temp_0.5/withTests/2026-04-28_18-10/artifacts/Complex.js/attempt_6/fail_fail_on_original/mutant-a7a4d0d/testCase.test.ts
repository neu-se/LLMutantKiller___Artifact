import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex({ r: 2, phi: Math.PI / 4 });
    const result = complex.acosh();
    if (result.im <= 0) {
      expect(result.im).toBeCloseTo(-Math.PI / 4);
    } else {
      expect(result.im).toBeCloseTo(Math.PI / 4);
    }
  });
});