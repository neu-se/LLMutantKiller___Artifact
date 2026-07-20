import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe("once source - abort behavior", () => {
  it("should call the callback with the abort error when abort is truthy", (done) => {
    const abortError = new Error("abort");
    let onAbortCalled = false;
    const onAbort = () => { onAbortCalled = true; };

    const read = once("someValue", onAbort);

    // First, abort the stream
    read(abortError, (err: any) => {
      expect(err).toBe(abortError);
      done();
    });
  });
});