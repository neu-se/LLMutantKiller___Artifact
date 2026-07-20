import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle two arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};

    const partialSink = pull(arg1);
    const result = partialSink(read, arg2);
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe('function');
  });
});