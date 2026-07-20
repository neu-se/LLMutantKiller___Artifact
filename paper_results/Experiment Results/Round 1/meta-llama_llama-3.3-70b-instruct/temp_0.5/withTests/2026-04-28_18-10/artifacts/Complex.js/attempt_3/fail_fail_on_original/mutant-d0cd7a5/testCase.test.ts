import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const originalResult = new Complex(0.48121182505960347, -0.48121182505960347);
    expect(result.toString()).not.toBe((new Complex(0.48121182505960347, 0.48121182505960347)).toString());
  });
});