import { describe, it, expect } from '@jest/globals';
import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find sink', () => {
  it('should pass actual errors to the callback when stream ends with an error and item is not found', (done) => {
    const actualError = new Error('stream error');
    
    // Create a source that emits an error (not `true`)
    let called = false;
    const errorSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (called) {
        cb(actualError);
      } else {
        called = true;
        cb(null, 42);
      }
    };

    const sink = find(
      (data: any) => data === 999, // will never match
      (err: any, result: any) => {
        expect(err).toBe(actualError);
        expect(result).toBeNull();
        done();
      }
    );

    sink(errorSource);
  });
});