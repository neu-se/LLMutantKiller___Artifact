import pull from '../pull.js';

describe('pull', () => {
  it('should pass with original code and fail with mutated code', () => {
    const func = (a: any) => a;
    const args = new Array(3);
    for(let i = 0; i < 3; i++)
      args[i] = i + 1;
    expect(args.length).toBe(3);
    const result = pull(func,...args);
    expect(result).toBeInstanceOf(Function);
  });
});