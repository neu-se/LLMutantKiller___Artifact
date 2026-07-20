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
    // For [2, 3, 4] with multiplication:
    // Original: first element (2) becomes acc, reducer(2,3)=6, reducer(6,4)=24 → 24
    // Mutated (if false): acc=null, reducer(null,2)=null*2=0, reducer(0,3)=0, reducer(0,4)=0 → 0
    const sink = reduce(
      function (a: number, b: number) { return a * b; },
      function (err: any, val: number) {
        expect(err).toBeNull();
        expect(val).toBe(24);
        done();
      }
    );

    sink(values([2, 3, 4]));
  });
});