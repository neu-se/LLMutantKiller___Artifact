import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should pass error to callback when stream ends with an error", (done) => {
    const expectedError = new Error("stream error");
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      // Immediately end with error
      cb(expectedError);
    };

    const sink = reduce(
      (acc: any, data: any) => data,
      null,
      (err: any, result: any) => {
        expect(err).toBe(expectedError);
        done();
      }
    );

    sink(source);
  });
});