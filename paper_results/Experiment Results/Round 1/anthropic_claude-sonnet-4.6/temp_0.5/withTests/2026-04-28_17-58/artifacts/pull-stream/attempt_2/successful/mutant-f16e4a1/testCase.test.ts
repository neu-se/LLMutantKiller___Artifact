import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

test('reduce without initial value on empty stream calls callback with null error', (done) => {
  // Empty source that ends immediately on first read
  const emptySource = (end: any, cb: (end: any, data?: any) => void) => {
    cb(true, undefined);
  };

  // Call reduce with only 2 arguments (reducer + callback), no initial accumulator
  const sink = (reduce as any)(
    (acc: any, data: any) => data,
    (err: any, val: any) => {
      // Original: end === true => cb(null), err should be null
      // Mutated:  end === false ? null : end => cb(true), err would be true
      expect(err).toBeNull();
      done();
    }
  );

  // With 2 arguments, reduce returns a function that takes a source
  sink(emptySource);
});