import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle 4 arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const arg4 = () => {};

    const partial = pull(arg1);
    const result1 = partial(read, arg2, arg3);
    const result2 = partial(read, arg2, arg3, arg4);
    expect(result1).not.toBe(result2);
  });
});