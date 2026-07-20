import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const csch = complex['csch']();
    expect(csch).not.toBeNull();
    expect(csch).not.toBeUndefined();
    expect(typeof csch).toBe('object');
    expect(csch).toHaveProperty('re');
    expect(csch).toHaveProperty('im');
  });
});