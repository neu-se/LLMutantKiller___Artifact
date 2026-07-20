import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should invoke the ninvoke method correctly', () => {
    const promise = Q();
    const name = 'test';
    const args = ['arg1', 'arg2'];

    // Check if ninvoke method exists
    expect(typeof promise.ninvoke).toBe('function');

    // Spy on the ninvoke method
    const ninvokeSpy = jest.spyOn(promise, 'ninvoke');

    // Call ninvoke method
    promise.ninvoke(name, ...args);

    // Check if ninvoke method was called
    expect(ninvokeSpy).toHaveBeenCalledTimes(1);
    expect(ninvokeSpy).toHaveBeenCalledWith(name, ...args);
  });
});