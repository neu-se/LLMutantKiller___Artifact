import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take - terminate propagates source error', () => {
  it('should propagate actual error from source when terminating after last item', (done) => {
    const abortError = new Error('source abort error');
    
    const sourceValues = [1, 2, 3, 4, 5];
    let index = 0;
    
    // Source that returns a real error when aborted
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        cb(abortError);
      } else if (index < sourceValues.length) {
        cb(null, sourceValues[index++]);
      } else {
        cb(true);
      }
    };
    
    // take with last:true - passes the first item that fails the test
    const through = take((n: number) => n < 2, { last: true });
    const read = through(source);
    
    // First read: gets 1 (passes test, n < 2 is true)
    read(null, (end1: any, data1: any) => {
      expect(end1).toBeFalsy();
      expect(data1).toBe(1);
      
      // Second read: gets 2 (fails test, n < 2 is false), last:true means we get it
      // ended = true, cb(null, 2) is called
      read(null, (end2: any, data2: any) => {
        expect(end2).toBeFalsy();
        expect(data2).toBe(2);
        
        // Third read: ended=true, last=true => terminate(cb) is called
        // terminate calls read(true, ...) => source returns abortError
        // original: cb(abortError || true) => cb(abortError)
        // mutated:  cb(true)
        read(null, (end3: any) => {
          // Original: end3 === abortError
          // Mutated:  end3 === true
          expect(end3).toBe(abortError);
          done();
        });
      });
    });
  });
});