import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('1+2i');
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    try {
      const d = new Complex('1+');
      expect(d).toThrow();
    } catch (e) {
      expect(e instanceof SyntaxError).toBe(true);
    }
  });
});