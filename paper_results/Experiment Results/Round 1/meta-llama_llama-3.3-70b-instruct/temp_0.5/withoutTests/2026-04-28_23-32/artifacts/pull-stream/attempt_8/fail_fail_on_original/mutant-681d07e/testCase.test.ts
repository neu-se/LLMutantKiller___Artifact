import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when args is null in mutated code', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    expect(() => {
      partialSink({}); // calling with a non-function argument to test the args check
    }).toThrowError('partial sink should only be called once!');
  });
});