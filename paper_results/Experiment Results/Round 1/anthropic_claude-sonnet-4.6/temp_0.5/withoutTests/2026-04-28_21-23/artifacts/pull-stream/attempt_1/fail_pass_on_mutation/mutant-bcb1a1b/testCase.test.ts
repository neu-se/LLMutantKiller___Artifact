import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js"

describe("reduce without initial accumulator (2 arguments)", () => {
  it("should use the first element as the accumulator when called with 2 arguments", (done) => {
    // Create a simple pull-stream source
    const values = [1, 2, 3, 4];
    let index = 0;
    
    const source = (_end: any, cb: (end: any, data?: any) => void) => {
      if (_end) return cb(_end);
      if (index >= values.length) {
        return cb(true);
      }
      cb(null, values[index++]);
    };

    // Call reduce with only 2 arguments (reducer and callback)
    // In original code: arguments.length === 2 is true, so it uses first element as acc
    // In mutated code: if(false) is never true, so it falls through to `return sink`
    // which would use null as the accumulator
    const sink = reduce(
      (acc: number, data: number) => acc + data,
      (err: any, result: number) => {
        expect(err).toBeNull();
        // With original code: first element (1) is used as acc, then 2+3+4 are added
        // Result should be 1+2+3+4 = 10
        expect(result).toBe(10);
        done();
      }
    );

    sink(source);
  });
});