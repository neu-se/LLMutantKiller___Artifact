import Complex from '../complex';

describe('Complex', () => {
  it('should correctly parse complex numbers with "i" notation but fail with "I" notation in the mutated code', () => {
    const c1 = new Complex('3+i');
    expect(c1.re).toBeCloseTo(3, 10);
    expect(c1.im).toBeCloseTo(1, 10);
    const c2 = new Complex('3+I');
    expect(c2.re).toBeCloseTo(3, 10);
    expect(c2.im).toBeCloseTo(1, 10);
  });
});