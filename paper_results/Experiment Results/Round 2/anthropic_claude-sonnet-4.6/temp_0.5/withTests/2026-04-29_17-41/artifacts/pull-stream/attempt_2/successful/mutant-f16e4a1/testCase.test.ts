import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce without initial value', () => {
  it('should call callback with null error when source ends immediately with no data', (done) => {
    // Source that ends immediately (empty stream)
    const emptySource = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined);
    };

    // reduce called with 2 args: reducer and callback (no initial accumulator)
    const sink = reduce(
      (acc: any, data: any) => data,
      (err: any, val: any) => {
        // Original code: end === true ? null : end => cb(null)
        // Mutated code: end === false ? null : end => cb(true)
        expect(err).toBeNull();
        done();
      }
    );

    sink(emptySource);
  });
});