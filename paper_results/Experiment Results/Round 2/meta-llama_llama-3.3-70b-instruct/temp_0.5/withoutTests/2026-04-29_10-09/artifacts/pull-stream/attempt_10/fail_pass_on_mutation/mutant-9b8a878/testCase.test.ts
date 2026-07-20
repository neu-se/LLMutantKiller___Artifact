import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle multiple arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};
    const sink3 = () => {};

    const result = pull(read, sink1, sink2, sink3);
    expect(result).toBeUndefined();
    const read2 = () => {};
    const sink4 = () => {};
    const sink5 = () => {};
    const sink6 = () => {};
    const result2 = pull(read2, sink1, sink2, sink4, sink5, sink6);
    expect(() => {
      const partial = pull(read2, sink1, sink2, sink4, sink5, sink6);
      partial();
      partial();
    }).toThrowError();
  });
});