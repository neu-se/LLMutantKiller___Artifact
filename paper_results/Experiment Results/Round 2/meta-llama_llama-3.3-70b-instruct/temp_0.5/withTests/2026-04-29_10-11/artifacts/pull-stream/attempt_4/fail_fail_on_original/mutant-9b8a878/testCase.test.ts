import pull from '../pull.js';

describe('pull', () => {
  it('should behave differently when called with a function and arguments', () => {
    const func = function(a: any) { return a; };
    const result = pull(func, 1, 2, 3);
    expect(result).toBeInstanceOf(Function);
    const read = result;
    expect(read.length).toBe(1);
  });
});