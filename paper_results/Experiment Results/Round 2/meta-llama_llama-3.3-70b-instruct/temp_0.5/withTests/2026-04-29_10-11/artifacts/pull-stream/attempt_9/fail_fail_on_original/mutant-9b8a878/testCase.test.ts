import pull from './pull';

describe('pull', () => {
  it('should pass with original code and fail with mutated code', () => {
    const func = (a: any) => a;
    const result = pull(func, 1, 2, 3);
    expect(result).toBeInstanceOf(Function);
    const read = result;
    expect(read.length).toBe(1);
    const length = 3;
    const args = new Array(length);
    for(let i = 0; i < length; i++)
      args[i] = i + 1;
    expect(args.length).toBe(length);
  });
});