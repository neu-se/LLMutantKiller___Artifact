import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle multiple arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};

    const result = pull(read, sink1, sink2);
    expect(result).toBeUndefined();
    // The mutation should cause an error when the pull function is called with 2 arguments and then called again
    const read2 = () => {};
    const sink3 = () => {};
    const partial = pull(read2, sink3);
    expect(() => partial()).not.toThrowError();
    expect(() => partial()).toThrowError();
  });
});