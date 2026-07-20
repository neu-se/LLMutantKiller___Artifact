import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle two arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};

    const result = pull(read, arg1, arg2);
    expect(typeof result).toBe('function');
  });
});