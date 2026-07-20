import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when args is null', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink.args = null;
    expect(() => partialSink(read)).toThrowError('partial sink should only be called once!');
  });
});