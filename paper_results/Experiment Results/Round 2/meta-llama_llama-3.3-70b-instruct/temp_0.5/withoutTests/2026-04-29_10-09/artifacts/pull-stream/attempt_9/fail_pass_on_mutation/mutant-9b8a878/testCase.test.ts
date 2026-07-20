import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle multiple arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};

    const result = pull(read, sink1, sink2);
    expect(result).toBeUndefined();
    // The mutation should cause an error when the pull function is called with multiple arguments
    const read2 = () => {};
    const sink3 = () => {};
    const sink4 = () => {};
    const sink5 = () => {};
    const partial = pull(read2, sink1, sink2, sink3, sink4, sink5);
    expect(partial).toBeUndefined();
    // The mutation should cause an error when the pull function is called with multiple arguments
    const read3 = () => {};
    const sink6 = () => {};
    const sink7 = () => {};
    const sink8 = () => {};
    const partial2 = pull(read3, sink1, sink2, sink6, sink7, sink8);
    expect(partial2).toBeUndefined();
    // The mutation should not cause an error when the pull function is called with less than or equal to 4 arguments
    const read4 = () => {};
    const sink9 = () => {};
    const sink10 = () => {};
    const result2 = pull(read4, sink1, sink2, sink9, sink10);
    expect(result2).toBeUndefined();
  });
});