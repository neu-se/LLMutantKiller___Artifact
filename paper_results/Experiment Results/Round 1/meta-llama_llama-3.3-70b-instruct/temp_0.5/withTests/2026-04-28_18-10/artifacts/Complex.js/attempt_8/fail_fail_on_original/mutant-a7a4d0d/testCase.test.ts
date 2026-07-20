import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acosh correctly for a specific value', () => {
    const complex = new Complex({ r: 2, phi: Math.PI / 4 });
    const resultOriginal = complex.acosh();
    if (resultOriginal.im <= 0) {
      expect(resultOriginal.im).toBeCloseTo(-Math.PI / 4);
    } else {
      expect(resultOriginal.im).toBeCloseTo(Math.PI / 4);
    }
    const complexMutated = new Complex({ r: 2, phi: Math.PI / 4 });
    const resultMutated = complexMutated.acosh();
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});