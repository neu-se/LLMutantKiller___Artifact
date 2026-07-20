import * as ComplexModule from './complex.js';

describe('Complex', () => {
  it('should export Complex as a module', () => {
    expect(ComplexModule.__esModule).toBe(true);
    expect(ComplexModule.default).toBe(ComplexModule.Complex);
    expect(ComplexModule.Complex).toBe(ComplexModule.default);
  });
});