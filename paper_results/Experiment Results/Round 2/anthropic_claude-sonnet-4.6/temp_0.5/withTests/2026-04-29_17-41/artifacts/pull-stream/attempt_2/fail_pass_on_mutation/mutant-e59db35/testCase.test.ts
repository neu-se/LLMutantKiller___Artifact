import flatten from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('flatten', () => {
  it('should propagate abort to outer stream when aborting while a nested stream is active', (done) => {
    const outerAbortReceived: any[] = [];

    // Outer source that tracks abort signals and has multiple streams
    function outerSource(abort: any, cb: (err: any, data?: any) => void) {
      if (abort) {
        outerAbortReceived.push(abort);
        cb(abort);
        return;
      }
      // Always return a new inner stream (would be infinite if abort doesn't work)
      cb(null, values([10, 20, 30]));
    }

    const flattenThrough = flatten();
    const read = flattenThrough(outerSource);

    // First read: gets first value from first inner stream, setting _read internally
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(10);

      // Now abort - with the mutation, abort won't propagate to outer source
      // and instead outer source will be called with null (read next), causing
      // it to return another inner stream rather than aborting
      read(true, (abortErr: any) => {
        // The abort error should be truthy
        expect(abortErr).toBeTruthy();
        // The outer source must have received the abort signal
        expect(outerAbortReceived.length).toBe(1);
        expect(outerAbortReceived[0]).toBe(true);
        done();
      });
    });
  });
});