import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should invoke the ninvoke method correctly', () => {
    const promise = Q();
    const name = 'test';
    const args = ['arg1', 'arg2'];
    const nodeback = jest.fn();

    // @ts-ignore
    const originalNinvoke = Promise.prototype.ninvoke;
    // @ts-ignore
    Promise.prototype.ninvoke = jest.fn();

    promise.ninvoke(name, ...args);

    expect(Promise.prototype.ninvoke).toHaveBeenCalledTimes(1);
    expect(Promise.prototype.ninvoke).toHaveBeenCalledWith(name, ...args);

    // @ts-ignore
    Promise.prototype.ninvoke = originalNinvoke;
  });
});