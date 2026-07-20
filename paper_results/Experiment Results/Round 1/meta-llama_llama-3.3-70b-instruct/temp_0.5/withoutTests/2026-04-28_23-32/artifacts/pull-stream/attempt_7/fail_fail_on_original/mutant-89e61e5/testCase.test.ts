import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called twice with the same arguments', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    partialSink(read);
    let errorCaught = false;
    try {
      partialSink(read);
    } catch (e) {
      errorCaught = true;
    }
    if (errorCaught) {
      expect(errorCaught).toBe(true);
    } else {
      expect(partialSink(read)).toThrow();
    }
  });
});