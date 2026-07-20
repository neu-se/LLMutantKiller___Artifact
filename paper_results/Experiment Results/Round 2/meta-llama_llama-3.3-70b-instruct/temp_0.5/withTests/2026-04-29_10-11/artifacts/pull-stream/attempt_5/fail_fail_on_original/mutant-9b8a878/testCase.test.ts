import pull from '../../pull.js';

describe('pull', () => {
  it('should behave differently when called with a function and arguments', () => {
    const func = function(a: any) { return a; };
    const result = pull(func, 1, 2, 3);
    expect(result).toBeInstanceOf(Function);
    const read = result;
    expect(read.length).toBe(1);
    const args = new Array(3);
    for(var i = 0; i < 3; i++)
      args[i] = i + 1;
    expect(args.length).toBe(3);
  });
});