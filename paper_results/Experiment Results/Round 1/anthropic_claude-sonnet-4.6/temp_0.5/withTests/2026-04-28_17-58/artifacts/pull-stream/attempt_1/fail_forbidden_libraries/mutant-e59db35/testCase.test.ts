import { describe, it, expect } from '@jest/globals';
import flatten from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';

describe('flatten abort behavior', () => {
  it('should abort the outer stream when aborting flatten with an active inner stream that cleanly acknowledges abort', (done) => {
    // Track whether the outer (stream of streams) source was aborted
    let outerAbortReceived: any = undefined;
    let innerAbortReceived: any = undefined;

    // Create an inner stream that has data and tracks abort
    const innerStream = (abort: any, cb: Function) => {
      if (abort) {
        innerAbortReceived = abort;
        cb(abort);
        return;
      }
      // Return a value so flatten has an active _read
      cb(null, 42);
    };

    // Create an outer stream that yields the inner stream, then tracks abort
    let outerCallCount = 0;
    const outerStream = (abort: any, cb: Function) => {
      if (abort !== null && abort !== undefined && abort !== false) {
        outerAbortReceived = abort;
        cb(abort);
        return;
      }
      outerCallCount++;
      if (outerCallCount === 1) {
        // First call: yield the inner stream
        cb(null, innerStream);
      } else {
        // Should not be called again in normal flow
        cb(true);
      }
    };

    const flattenThrough = flatten();
    const read = flattenThrough(outerStream);

    // First read to get a value (this sets _read = innerStream internally)
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(42);

      // Now abort the flatten stream
      const abortError = new Error('test abort');
      read(abortError, (err: any) => {
        // After abort, the outer stream should have been aborted
        // In original code: _read acks abort with null, then read(null || abortError, cb) = read(abortError, cb)
        // In mutated code: _read acks abort with null, then read(null && abortError, cb) = read(null, cb) - NOT aborted!
        expect(outerAbortReceived).toBeTruthy();
        expect(outerAbortReceived).toBe(abortError);
        done();
      });
    });
  });
});