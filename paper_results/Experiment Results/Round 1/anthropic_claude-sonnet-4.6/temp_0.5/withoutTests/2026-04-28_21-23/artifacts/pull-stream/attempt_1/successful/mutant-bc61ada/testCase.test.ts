import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with 2 arguments when stream ends immediately", () => {
  it("should call callback with null (no error) when stream ends immediately with true in 2-arg form", (done) => {
    // Create a source that ends immediately without providing any data
    const emptySource = (end: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined); // Signal end immediately
    };

    // Use reduce with 2 arguments (reducer and callback, no initial accumulator)
    const reducer = (acc: any, data: any) => data;
    
    const sink = reduce(reducer, (err: any, result: any) => {
      // Original: err should be null (end === true means normal end, so cb(null))
      // Mutated: err would be true (end !== true is false, so cb(end) = cb(true))
      expect(err).toBeNull();
      done();
    });

    // sink is a function that takes a source (2-arg form returns a function)
    sink(emptySource);
  });
});