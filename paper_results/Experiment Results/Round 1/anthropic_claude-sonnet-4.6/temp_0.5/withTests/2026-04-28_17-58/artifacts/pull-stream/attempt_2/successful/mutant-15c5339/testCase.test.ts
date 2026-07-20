import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take terminate error propagation', () => {
  it('should propagate upstream error (not just true) when terminating with last:true', (done) => {
    const upstreamError = new Error('upstream abort error');
    let i = 0;
    const values = [1, 2, 3, 4, 5];

    // Source that returns an actual error when aborted
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(upstreamError);
      } else if (i >= values.length) {
        cb(true);
      } else {
        cb(null, values[i++]);
      }
    }

    // take with last:true - delivers the first item that fails the test, then terminates
    const through = take((n: number) => n < 3, { last: true });
    const read = through(source);

    function drain(end: any, data?: any): void {
      if (end) {
        // Original: cb(err || true) => upstreamError is propagated
        // Mutated:  cb(true)        => only true is propagated
        expect(end).toBe(upstreamError);
        done();
        return;
      }
      read(null, drain);
    }

    read(null, drain);
  });
});