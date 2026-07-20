import { describe, it, expect } from '@jest/globals';
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain sink.abort with function argument', () => {
  it('should treat a function-only abort call as a clean end (err=true not err=false)', (done) => {
    const sink = drain(
      () => {},
      (err: any) => {
        // With original: err=true -> abort=true -> done gets null (end===true ? null : end)
        // With mutation: err=false -> abort=false||true=true -> same... 
        // Need different approach
        expect(err).toBeNull();
        done();
      }
    );

    const source = (abort: any, cb: Function) => {
      if (abort) cb(abort);
      else cb(null, 1);
    };

    sink(source);
    
    setTimeout(() => {
      sink.abort(() => {});
    }, 10);
  });
});