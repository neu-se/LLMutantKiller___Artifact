import { Complex } from '../../complex';

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});