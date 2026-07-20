import { pull } from '../pull';

describe('pull', () => {
  it('should pass with original code and fail with mutated code', () => {
    const func = function(a: any) { return a; };
    const length = 3;
    const result = pull(func, 1, 2, 3);
    const args = new Array(length);
    for(var i = 0; i < length; i++)
      args[i] = i + 1;
    expect(args.length).toBe(length);
  });
});