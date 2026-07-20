import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called as a partial sink', () => {
    const partialSink = pull(function () { });
    let error1: Error | null = null;
    try {
      partialSink(function () { });
    } catch (e) {
      error1 = e as Error;
    }
    let error2: Error | null = null;
    try {
      partialSink(function () { });
    } catch (e) {
      error2 = e as Error;
    }
    expect(error1).not.toBeNull();
    expect(error1!.message).toBe('partial sink should only be called once!');
    expect(error2).not.toBeNull();
    expect(error2!.message).toBe('partial sink should only be called once!');
  });
});