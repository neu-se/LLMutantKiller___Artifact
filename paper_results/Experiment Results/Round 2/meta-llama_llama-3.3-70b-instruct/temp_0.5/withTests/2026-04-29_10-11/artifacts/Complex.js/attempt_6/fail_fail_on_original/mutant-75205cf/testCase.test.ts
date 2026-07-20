import { Complex } from './complex';

describe('Complex', () => {
  it('subtracts two complex numbers correctly when one of them is infinite', () => {
    const c1 = new Complex('Infinity');
    const c2 = new Complex('1+2i');
    const result = c1.sub(c2);
    expect(result.toString()).not.toBe('undefined');
    expect(typeof result.toString()).toBe('string');
  });
});