import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle two arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};

    const partialSink = pull(arg1);
    expect(partialSink).toBeInstanceOf(Function);
    const result = partialSink(read, arg2);
    expect(() => partialSink(read, arg2)).toThrow('partial sink should only be called once!');
  });
});