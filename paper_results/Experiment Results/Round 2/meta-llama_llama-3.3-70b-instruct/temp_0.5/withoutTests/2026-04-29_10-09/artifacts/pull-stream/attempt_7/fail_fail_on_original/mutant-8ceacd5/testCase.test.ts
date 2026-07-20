import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle more than 4 arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const arg4 = () => {};
    const arg5 = () => {};

    const result1 = pull(read, arg1, arg2, arg3, arg4);
    const result2 = pull(read, arg1, arg2, arg3, arg4, arg5);
    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    expect(result1).not.toBe(result2);
  });
});