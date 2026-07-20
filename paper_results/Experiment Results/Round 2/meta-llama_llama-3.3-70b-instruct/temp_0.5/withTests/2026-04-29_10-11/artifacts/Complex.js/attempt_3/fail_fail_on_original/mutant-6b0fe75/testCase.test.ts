import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosh correctly when Math.cosh is not defined', () => {
    const originalMath = Math;
    const mathProxy = new Proxy(Math, {
      get(target, prop) {
        if (prop === 'cosh') {
          return undefined;
        }
        return target[prop];
      },
    });
    global.Math = mathProxy;
    const complex = new Complex(0, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
    global.Math = originalMath;
  });
});