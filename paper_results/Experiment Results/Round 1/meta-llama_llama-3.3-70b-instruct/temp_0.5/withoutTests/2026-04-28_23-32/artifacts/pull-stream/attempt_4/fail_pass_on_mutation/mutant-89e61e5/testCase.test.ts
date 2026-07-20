import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should behave differently when called twice with the same arguments', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    expect(() => partialSink(read)).not.toThrow();
  });
});