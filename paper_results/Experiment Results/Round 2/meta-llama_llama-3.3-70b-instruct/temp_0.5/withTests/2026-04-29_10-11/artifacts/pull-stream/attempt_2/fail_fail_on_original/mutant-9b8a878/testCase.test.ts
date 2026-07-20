import { pull } from '../../../pull.js';

describe('pull', () => {
  it('should behave differently when called with a function and no arguments', () => {
    const originalLength = 5;
    const result = pull(function(a) { return a; });
    expect(result.length).toBe(originalLength);
  });
});