import { describe, it, expect } from '@jest/globals';
import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain without done callback on normal stream end', () => {
  it('should not throw when stream ends normally (end === true) and no done callback is provided', () => {
    // Create a simple source that emits one value then ends
    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, 'hello');
      } else {
        cb(true); // normal end
      }
    };

    // drain without a done callback - should not throw on normal end (end === true)
    expect(() => {
      const sink = drain((data: any) => {
        // op: just consume data
      }); // no done callback
      sink(source);
    }).not.toThrow();
  });
});