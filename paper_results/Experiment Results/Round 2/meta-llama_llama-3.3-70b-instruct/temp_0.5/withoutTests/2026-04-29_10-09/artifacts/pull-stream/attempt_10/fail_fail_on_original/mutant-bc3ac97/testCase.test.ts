import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle case 3 correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const result1 = pull(read, arg1, arg2);
    const result2 = pull(read, arg1, arg2, arg3);
    expect(result1).not.toEqual(result2);
  });
});