import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating acosh with mutated code', () => {
    const c = new Complex({ re: 1, im: 0 });
    expect(() => c.acosh()).toThrowError();
  });
});