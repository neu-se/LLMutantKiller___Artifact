import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce without initial value', () => {
  it('should call callback with null error when empty stream ends normally', (done) => {
    // Empty source that ends immediately with true (normal end)
    const emptySource = (end: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined);
    };

    const reducer = (acc: number, data: number) => acc + data;

    // Called with 2 args: reducer and callback (no initial accumulator)
    const sink = reduce(reducer, (err: any, val: any) => {
      // Original code: end === true => cb(null) => err is null
      // Mutated code: end !== true => cb(end) => err is true
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});