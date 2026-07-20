import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a property with its own name', () => {
    const complex = new Complex();
    expect(Object.keys(complex)).not.toContain('');
  });
});