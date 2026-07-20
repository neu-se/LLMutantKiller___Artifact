import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with error on immediate end (2-argument form)", () => {
  it("should pass the actual error to callback when source ends immediately with an error", (done) => {
    const expectedError = new Error("stream error");
    
    // Create a source that immediately ends with an error
    const errorSource = (end: any, cb: Function) => {
      cb(expectedError, null);
    };
    
    const reducer = (acc: any, data: any) => data;
    
    const sink = reduce(reducer, (err: any, result: any) => {
      // Original: err should be the actual error object
      // Mutated: err would be null (error swallowed)
      expect(err).toBe(expectedError);
      done();
    });
    
    sink(errorSource);
  });
});