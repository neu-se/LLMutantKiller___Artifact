import { pull } from '../pull.js';

describe('pull', () => {
  it('should behave differently when called with a function and arguments', () => {
    const result = pull(function(a) { return a; }, 1, 2, 3);
    expect(result.length).toBe(4);
  });
});