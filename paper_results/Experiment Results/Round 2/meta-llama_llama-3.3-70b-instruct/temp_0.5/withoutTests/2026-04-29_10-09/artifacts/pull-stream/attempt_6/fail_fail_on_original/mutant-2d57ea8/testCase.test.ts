import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called as a partial sink', () => {
    const partialSink = pull(function () { });
    let error: Error | null = null;
    try {
      partialSink(function () { });
      partialSink(function () { });
    } catch (e) {
      error = e as Error;
    }
    expect(error).not.toBeNull();
    expect(error!.message).toBe('partial sink should only be called once!');
  });
});