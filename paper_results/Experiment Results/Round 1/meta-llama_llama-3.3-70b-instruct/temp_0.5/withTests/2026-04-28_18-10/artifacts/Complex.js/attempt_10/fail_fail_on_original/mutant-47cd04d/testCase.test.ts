import Complex from '../../complex';

describe('Complex', () => {
  it('should correctly handle addition with infinite values', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex('Infinity');
    const result = c1.add(c2);
    expect(result.toString()).toBe('Infinity');
    const c3 = new Complex('Infinity');
    const c4 = new Complex(1, 0);
    const result2 = c3.add(c4);
    expect(result2.toString()).not.toBe('1+0i');
  });
});