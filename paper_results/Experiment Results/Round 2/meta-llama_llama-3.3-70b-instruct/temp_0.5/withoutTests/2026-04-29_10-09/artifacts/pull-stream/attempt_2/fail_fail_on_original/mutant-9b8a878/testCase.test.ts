import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle multiple arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};

    const partial = pull(read, sink1, sink2);
    expect(partial).toBeInstanceOf(Function);
    const result = partial();
    expect(result).toBeUndefined();
    // We can test that the pull function returns the correct result
    // when called with multiple arguments
    // We can do this by testing that the pull function returns the correct result
    // when called with 3 arguments
    const read2 = () => {};
    const sink3 = () => {};
    const partial2 = pull(read2, sink1, sink2, sink3);
    expect(partial2).toBeInstanceOf(Function);
    const result2 = partial2();
    expect(result2).toBeUndefined();
    // We can test that the pull function returns the correct result
    // when called with 4 arguments
    const read3 = () => {};
    const sink4 = () => {};
    const partial3 = pull(read3, sink1, sink2, sink3, sink4);
    expect(partial3).toBeInstanceOf(Function);
    const result3 = partial3();
    expect(result3).toBeUndefined();
    // The mutation should cause an error when the pull function is called with more than 4 arguments
    const read4 = () => {};
    const sink5 = () => {};
    const sink6 = () => {};
    expect(() => pull(read4, sink1, sink2, sink3, sink4, sink5, sink6)).toThrowError();
    // The mutation should cause an error when the pull function is called with more than 4 arguments
    const read5 = () => {};
    const sink7 = () => {};
    const sink8 = () => {};
    expect(() => pull(read5, sink1, sink2, sink3, sink4, sink5, sink6, sink7, sink8)).toThrowError();
    // We can test that the pull function returns the correct result
    // when called with 2 arguments
    const read6 = () => {};
    const sink9 = () => {};
    const partial4 = pull(read6, sink9);
    expect(partial4).toBeInstanceOf(Function);
    const result4 = partial4();
    expect(result4).toBeUndefined();
  });
});