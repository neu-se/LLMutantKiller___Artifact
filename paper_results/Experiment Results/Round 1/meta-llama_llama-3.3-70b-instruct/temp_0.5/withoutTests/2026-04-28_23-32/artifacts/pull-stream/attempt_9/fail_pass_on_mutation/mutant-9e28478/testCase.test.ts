import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle two arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};

    const result1 = pull(read, arg1, arg2);
    const result2 = pull(read, arg1, arg2);
    expect(result1).toBe(result2);
  });
});