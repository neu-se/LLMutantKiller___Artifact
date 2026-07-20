import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const errorFunction = () => {};
    const sink = drain(null, (err: any) => {
      // In original code, when abort is called with a function,
      // it should be treated as a callback, not as an error
      expect(err).toBe(null);
      done();
    });

    // Call abort with a function as the error parameter
    (sink as any).abort(errorFunction);

    // Trigger a read to make the abort take effect
    const read = (sink as any).read;
    if (read) {
      read(true, () => {
        // This should trigger the done callback
      });
    }
  });
});