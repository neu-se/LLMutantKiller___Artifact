const drainSource = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

// Inspect what drain passes to end callback
describe('find', () => {
  it('detects mutation by checking error value passed to end callback', (done) => {
    // First, let's understand what drain passes to end callback
    // by testing drain directly
    let endErr: any = 'NOT_CALLED';
    
    let count = 0;
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      count++;
      if (count > 2) return cb(true);
      cb(null, count);
    };
    
    const sink = drainSource(
      function(data: any) { /* noop */ },
      function(err: any) {
        endErr = err;
        // Check what drain actually passes - if null or true
        expect(typeof endErr).toBe('object'); // null is object
        expect(endErr).toBeNull();
        done();
      }
    );
    
    sink(source);
  });
});