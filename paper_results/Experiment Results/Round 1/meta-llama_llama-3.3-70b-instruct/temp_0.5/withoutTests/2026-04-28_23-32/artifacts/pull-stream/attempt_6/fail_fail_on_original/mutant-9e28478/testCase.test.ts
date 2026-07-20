import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle two arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};

    const partialSink = pull(arg1);
    expect(partialSink).toBeInstanceOf(Function);
    const result = partialSink(read);
    expect(result).toBeDefined();
    expect(result).toBe(arg2);
  });
});