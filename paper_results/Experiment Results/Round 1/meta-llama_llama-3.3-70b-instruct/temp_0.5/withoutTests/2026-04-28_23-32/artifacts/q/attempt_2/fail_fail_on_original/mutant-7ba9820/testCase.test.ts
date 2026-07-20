import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should invoke the ninvoke method correctly', () => {
    const promise = Q();
    const name = 'test';
    const args = ['arg1', 'arg2'];
    const nodeback = jest.fn();

    promise.ninvoke(name, ...args, nodeback);

    expect(nodeback).toHaveBeenCalledTimes(1);
  });
});