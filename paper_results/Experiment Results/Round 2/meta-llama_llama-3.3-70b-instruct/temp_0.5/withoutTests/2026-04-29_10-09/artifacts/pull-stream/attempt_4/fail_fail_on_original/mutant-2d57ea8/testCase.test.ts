import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called as a partial sink', () => {
    const partialSink = pull(function () { });
    const error1 = new Error();
    try {
      partialSink(function () { });
    } catch (e) {
      error1 = e;
    }
    const error2 = new Error();
    try {
      partialSink(function () { });
    } catch (e) {
      error2 = e;
    }
    expect(error1.message).toBe('partial sink should only be called once!');
    expect(error2.message).toBe('partial sink should only be called once!');
  });
});