import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called twice', () => {
    const func = () => {};
    const partialSink = pull(func);
    partialSink(() => {});
    try {
      partialSink(() => {});
    } catch (e) {
      expect(e.message).toContain('partial sink');
    }
  });
});