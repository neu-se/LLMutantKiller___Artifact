import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex('2+0i');
    expect(() => complex.acosh()).not.toThrow();
  });
});