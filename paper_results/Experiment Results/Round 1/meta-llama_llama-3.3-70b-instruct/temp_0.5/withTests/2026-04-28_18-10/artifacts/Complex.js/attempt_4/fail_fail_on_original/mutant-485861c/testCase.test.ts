import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a property "re" when created with no arguments', () => {
    const complex = new Complex();
    expect(complex).toHaveProperty('re');
  });
});