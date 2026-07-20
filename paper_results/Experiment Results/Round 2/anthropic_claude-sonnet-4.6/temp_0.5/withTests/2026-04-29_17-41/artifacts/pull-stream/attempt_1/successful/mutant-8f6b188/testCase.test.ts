import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain error handling without done callback", () => {
  it("should throw when stream ends with an error and no done callback is provided", () => {
    const error = new Error("test stream error");

    // Create a source that immediately ends with an error
    function errorSource(_abort: any, cb: (end: any, data?: any) => void) {
      cb(error);
    }

    const sink = drain(null);

    expect(() => {
      sink(errorSource);
    }).toThrow(error);
  });
});