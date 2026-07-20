import { Complex } from './complex';

describe('Complex', () => {
  it('should have a function asec', () => {
    const c = new Complex(1, 1);
    expect(c.constructor.prototype).toHaveProperty('asec');
  });
});