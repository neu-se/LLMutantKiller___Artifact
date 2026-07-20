import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce without initial value on immediately-ending source", () => {
  it("should call callback with null error when source ends immediately with no data", (done) => {
    // Source that ends immediately (no data at all)
    const emptySource = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // signal end immediately
    };

    const reducer = (acc: any, data: any) => acc + data;

    // Called with 2 args (no initial accumulator), returns a function accepting a source
    const sink = reduce(reducer, (err: any, _val: any) => {
      // Original: end === true -> cb(null)
      // Mutated:  false ? null : end -> cb(true), so err would be true
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});