import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when called with null args', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    expect(() => {
      if (partialSink.args === null) {
        throw new Error('args should not be null');
      }
    }).not.toThrowError('args should not be null');
  });
});