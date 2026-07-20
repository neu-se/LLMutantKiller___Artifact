import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the function with the correct method name', () => {
    const func = jest.fn();
    const promise = Q.resolve();
    const result = promise.fcall(func, 1, 2, 3);
    expect(result).not.toBeNull();
    expect(typeof result.then).toBe('function');
  });
});