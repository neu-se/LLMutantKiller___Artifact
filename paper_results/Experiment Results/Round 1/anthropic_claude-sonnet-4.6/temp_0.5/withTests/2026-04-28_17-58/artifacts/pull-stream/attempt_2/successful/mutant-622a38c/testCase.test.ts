import reduce = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js');

describe('reduce without initial value on empty stream', () => {
  it('should call callback with null error when stream ends immediately with no data', (done: jest.DoneCallback) => {
    // Source that ends immediately without providing any data
    const emptySource = (end: any, cb: (end: any, data?: any) => void) => {
      cb(true, undefined);
    };

    const reducer = (acc: number, data: number) => acc + data;

    // Called with 2 args: reducer and callback (no initial accumulator)
    // This triggers the special path where arguments.length === 2
    const sink = reduce(reducer, (err: any, val: any) => {
      // Original code: cb(end === true ? null : end) => cb(null) when end is true
      // Mutated code: cb(false ? null : end) => cb(true) when end is true
      expect(err).toBeNull();
      done();
    });

    sink(emptySource);
  });
});