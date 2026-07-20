import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - error throwing when no done callback supplied", () => {
  it("should throw an error when stream errors and no done callback is provided", () => {
    const testError = new Error("test stream error");

    // Create a source that immediately errors
    function errorSource(abort: any, cb: Function) {
      cb(testError);
    }

    const sink = drain(null);

    expect(() => {
      sink(errorSource);
    }).toThrow(testError);
  });
});