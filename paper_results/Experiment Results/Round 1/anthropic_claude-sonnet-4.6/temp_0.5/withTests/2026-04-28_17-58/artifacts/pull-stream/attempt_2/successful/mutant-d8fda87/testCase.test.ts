import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe("once source - abort behavior", () => {
  it("should invoke the callback with the abort error when abort is truthy", (done) => {
    const abortError = new Error("abort");
    let onAbortCalled = false;
    const onAbort = () => { onAbortCalled = true; };

    const read = once("someValue", onAbort);

    // Abort the stream before reading any value
    read(abortError, (err: any) => {
      expect(err).toBe(abortError);
      done();
    });
  });
});