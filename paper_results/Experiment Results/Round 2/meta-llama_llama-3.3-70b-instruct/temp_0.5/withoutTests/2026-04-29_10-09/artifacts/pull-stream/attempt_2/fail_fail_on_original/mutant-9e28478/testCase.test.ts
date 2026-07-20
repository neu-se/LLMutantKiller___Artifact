import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull.js', () => {
  it('should handle the case when length is 2', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const result = pull.default(read, arg1, arg2);
    expect(typeof result).toBe('function');
  });
});