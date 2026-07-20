import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const func = () => {};
    const result = pull(func, func);
    expect(result).toBeInstanceOf(Function);
    const result2 = result(() => {});
    expect(result2).toBeInstanceOf(Function);
  });
});