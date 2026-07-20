import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when args check is bypassed in mutated code', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    expect(() => {
      partialSink.args = null;
      partialSink(read);
    }).toThrowError('partial sink should only be called once!');
    // In the mutated code, this should not throw an error because the args check is bypassed.
  });
});