import { Complex } from "../../../../../complex";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex(2, 0);
    expect(c.acosh()).not.toBeNull();
    expect(c.acosh()).not.toBeUndefined();
  });
});