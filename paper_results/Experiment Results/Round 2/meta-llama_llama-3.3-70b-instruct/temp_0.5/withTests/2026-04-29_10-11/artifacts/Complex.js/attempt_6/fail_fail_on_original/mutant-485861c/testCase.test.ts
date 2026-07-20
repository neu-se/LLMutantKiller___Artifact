import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have an im property', () => {
    const complex = new Complex();
    expect(complex).toHaveProperty('im');
  });
});