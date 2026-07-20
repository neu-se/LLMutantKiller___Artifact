import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when args is not null', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    expect(() => {
      if (partialSink.args === null) {
        throw new Error('args should not be null');
      }
    }).not.toThrowError('args should not be null');
    expect(partialSink(read)).not.toThrowError('partial sink should only be called once!');
  });
});