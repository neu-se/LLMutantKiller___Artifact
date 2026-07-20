import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called twice with the same arguments', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    let errorCaught = false;
    try {
      partialSink(read);
      partialSink(read);
    } catch (e) {
      errorCaught = true;
    }
    expect(errorCaught).toBe(true);
  });
});