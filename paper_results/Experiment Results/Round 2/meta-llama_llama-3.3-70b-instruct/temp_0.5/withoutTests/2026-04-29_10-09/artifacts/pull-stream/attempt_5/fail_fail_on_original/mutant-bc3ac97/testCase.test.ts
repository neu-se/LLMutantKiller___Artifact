import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle case 3 correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const result = pull(read, arg1, arg2, arg3);
    expect(result.toString()).toContain('arg1');
    expect(result.toString()).toContain('arg2');
    expect(result.toString()).toContain('arg3');
  });
});