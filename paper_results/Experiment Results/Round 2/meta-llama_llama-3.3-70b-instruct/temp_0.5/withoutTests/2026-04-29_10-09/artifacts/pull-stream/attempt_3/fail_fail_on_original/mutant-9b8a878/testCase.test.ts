import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle multiple arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};

    const partial = pull(read, sink1, sink2);
    expect(partial).toBeInstanceOf(Function);
    const result = partial();
    expect(result).toBeUndefined();
    // The mutation should cause an error when the pull function is called with more than 4 arguments
    const read2 = () => {};
    const sink3 = () => {};
    expect(() => pull(read2, sink1, sink2, sink3)).not.toThrowError();
    // The mutation should cause an error when the pull function is called with more than 4 arguments
    const read3 = () => {};
    const sink4 = () => {};
    const sink5 = () => {};
    expect(() => pull(read3, sink1, sink2, sink3, sink4, sink5)).toThrowError();
    // The mutation should not cause an error when the pull function is called with less than or equal to 4 arguments
    const read4 = () => {};
    const sink6 = () => {};
    const sink7 = () => {};
    expect(() => pull(read4, sink1, sink2, sink3, sink6)).not.toThrowError();
  });
});