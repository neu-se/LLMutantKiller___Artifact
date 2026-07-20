import { describe, it, expect } from '@jest/globals';
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain abort with connected source', () => {
  it('should call the abort callback when abort is called after sink is connected to a source', (done) => {
    // Create a source that hangs (never ends on its own)
    let pendingCb: ((end: any, data?: any) => void) | null = null;
    
    const hangingSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // Hang: store the callback but never call it
      pendingCb = cb;
    };

    const sink = drain(
      () => {}, // op: do nothing with data
      (err: any) => {} // done callback
    );

    // Connect the sink to the source - this sets `read` inside drain
    sink(hangingSource);

    // Now call abort with a callback - in original code, this calls read(abort, cb)
    // which calls the hanging source with abort=true, which calls cb(abort)
    // In mutated code, if(false) means read is never called, so cb is never called
    sink.abort(true, (err: any) => {
      // This should be called in the original but NOT in the mutated version
      expect(err).toBe(true);
      done();
    });
  });
});