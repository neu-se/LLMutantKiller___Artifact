import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

function values(array: number[]) {
  let i = 0;
  return function (abort: any, cb: (end: any, data?: any) => void) {
    if (abort) {
      i = array.length;
      cb(abort);
    } else if (i >= array.length) {
      cb(true);
    } else {
      cb(null, array[i++]);
    }
  };
}

describe('reduce without initial accumulator', () => {
  it('should use the first element as the initial accumulator when called with only 2 arguments', (done) => {
    // Called with 2 args: reducer and callback (no initial accumulator)
    // For [1, 2, 3]: first element (1) becomes acc, then reducer(1,2)=3, reducer(3,3)=6
    // With mutation (if false): acc stays null, reducer(null,1)=null+1=1 (NaN or wrong), result != 6
    const sink = reduce(
      function (a: number, b: number) { return a + b; },
      function (err: any, val: number) {
        expect(err).toBeNull();
        expect(val).toBe(6);
        done();
      }
    );

    sink(values([1, 2, 3]));
  });
});