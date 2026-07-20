import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should invoke the ninvoke method correctly', () => {
    const promise = Q();
    const name = 'test';
    const args = ['arg1', 'arg2'];
    const nodeback = jest.fn();

    // @ts-ignore
    const originalDispatch = promise.dispatch;
    // @ts-ignore
    promise.dispatch = jest.fn();

    promise.ninvoke(name, ...args);

    expect(promise.dispatch).toHaveBeenCalledTimes(1);
    expect(promise.dispatch).toHaveBeenCalledWith('post', [name, [...args, expect.any(Function)]]);
  });
});