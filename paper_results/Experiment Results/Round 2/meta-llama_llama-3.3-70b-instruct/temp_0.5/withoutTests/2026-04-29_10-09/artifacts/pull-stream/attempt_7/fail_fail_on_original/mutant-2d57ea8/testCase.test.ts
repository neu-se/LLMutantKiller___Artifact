import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called as a partial sink', () => {
    const partialSink = pull(function () { });
    try {
      partialSink(function () { });
      partialSink(function () { });
    } catch (e) {
      expect(e.message).toBe('partial sink should only be called once!');
      return;
    }
    expect(true).toBe(false);
  });
});