import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called multiple times with mutated args check', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    expect(() => {
      partialSink.args = null;
      partialSink(read);
    }).toThrowError('partial sink should only be called once!');
  });
});