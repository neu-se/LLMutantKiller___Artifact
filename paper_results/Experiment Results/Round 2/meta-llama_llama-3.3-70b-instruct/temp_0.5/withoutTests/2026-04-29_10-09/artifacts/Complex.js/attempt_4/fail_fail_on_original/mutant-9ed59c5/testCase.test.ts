import * as complexModule from './complex.js';

describe('Complex', () => {
  it('should export Complex when using CommonJS', () => {
    expect(complexModule).toHaveProperty('Complex');
    expect(complexModule).toHaveProperty('default');
    expect(complexModule.Complex).toBe(complexModule.default);
  });
});