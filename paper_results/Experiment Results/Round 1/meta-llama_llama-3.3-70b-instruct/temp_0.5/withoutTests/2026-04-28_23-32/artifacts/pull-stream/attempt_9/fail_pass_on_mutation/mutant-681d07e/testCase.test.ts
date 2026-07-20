import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when called with a function argument', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    expect(() => partialSink(read)).not.toThrowError();
  });
});