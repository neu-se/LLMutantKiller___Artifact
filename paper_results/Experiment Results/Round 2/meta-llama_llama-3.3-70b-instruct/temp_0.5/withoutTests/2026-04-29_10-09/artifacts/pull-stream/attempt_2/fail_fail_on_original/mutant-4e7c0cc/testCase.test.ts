import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle 4 arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const arg4 = () => {};

    const result = pull(read, arg1, arg2, arg3, arg4);
    expect(typeof result).toBe('function');
  });
});