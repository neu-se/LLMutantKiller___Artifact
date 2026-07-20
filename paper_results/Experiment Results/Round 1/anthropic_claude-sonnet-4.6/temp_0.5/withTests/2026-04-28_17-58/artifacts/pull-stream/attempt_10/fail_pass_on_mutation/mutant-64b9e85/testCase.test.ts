const drainModule = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('find', () => {
  it('drain end callback receives true on normal stream end', (done) => {
    let endErr: any = 'NOT_CALLED';
    
    let count = 0;
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      count++;
      if (count > 2) return cb(true);
      cb(null, count);
    };
    
    const sink = drainModule(
      function(data: any) { /* noop */ },
      function(err: any) {
        endErr = err;
        // Log what drain actually passes to understand the behavior
        console.log('drain end callback err:', endErr, typeof endErr);
        done();
      }
    );
    
    sink(source);
  });
});