import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce without initial accumulator value", () => {
  it("should call callback with end error when stream is empty and no initial value provided", (done) => {
    // Empty source
    const source = (abort: any, cb: Function) => {
      cb(true); // immediately end
    };

    // Called with only 2 arguments (no initial accumulator)
    // Original: through-stream reads first value, gets 'true' (end), calls cb(null) not cb(null, null)
    // Mutated: drain runs with acc=null, calls cb(null, null) when stream ends
    reduce(
      (acc: any, data: any) => acc,
      (err: any, result: any) => {
        // Original code: cb is called with (null) - end===true becomes null, result is undefined
        // Mutated code: cb is called with (null, null) - result is null
        expect(result).toBeUndefined();
        done();
      }
    )(source);
  });
});