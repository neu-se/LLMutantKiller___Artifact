import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called twice with the same arguments', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    try {
      partialSink(read);
    } catch (e) {
      expect(e.message).toBe('partial sink should only be called once!');
    }
  });
});