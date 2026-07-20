import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle multiple arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};
    const sink3 = () => {};

    const partial = pull(read, sink1, sink2, sink3);
    expect(partial).toBeInstanceOf(Function);
    const result = partial();
    expect(result).toBeUndefined();
    // The mutation should cause an error when the pull function is called with multiple arguments
    const read2 = () => {};
    const sink4 = () => {};
    const sink5 = () => {};
    const sink6 = () => {};
    const partial2 = pull(read2, sink1, sink2, sink4, sink5, sink6);
    expect(() => partial2()).toThrowError();
    // The mutation should not cause an error when the pull function is called with less than or equal to 4 arguments
    const read3 = () => {};
    const sink7 = () => {};
    const sink8 = () => {};
    const partial3 = pull(read3, sink1, sink2, sink7, sink8);
    expect(partial3).toBeInstanceOf(Function);
  });
});