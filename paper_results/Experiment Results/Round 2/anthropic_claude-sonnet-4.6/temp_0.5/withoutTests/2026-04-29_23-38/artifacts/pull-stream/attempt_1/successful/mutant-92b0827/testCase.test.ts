import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with 2 arguments - error handling when stream ends immediately with error", () => {
  it("should pass the actual error to callback when source ends immediately with an error (not null)", (done) => {
    const expectedError = new Error("stream error");
    
    // Create a source that immediately ends with an error
    const errorSource = (end: any, cb: Function) => {
      cb(expectedError, null);
    };
    
    const sink = reduce((acc: any, data: any) => data, (err: any, acc: any) => {
      // In the original code: end === true ? null : end
      // When end is an Error object (not true), it should pass the error
      // In the mutated code: true ? null : end always returns null
      expect(err).toBe(expectedError);
      done();
    });
    
    sink(errorSource);
  });
});