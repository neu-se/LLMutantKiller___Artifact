import flatten from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('flatten abort with active nested stream', () => {
  it('abort callback receives truthy err, not a stream value', (done) => {
    let outerCallCount = 0;

    function outerSource(abort: any, cb: (err: any, data?: any) => void) {
      outerCallCount++;
      if (abort) {
        cb(abort);
      } else {
        // Always provide a fresh inner stream
        cb(null, values([100, 200, 300]));
      }
    }

    const read = flatten()(outerSource);

    // Read first value to ensure _read is set
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(100);

      const countBeforeAbort = outerCallCount;

      // Now abort - with mutation, outer source gets called with null
      // meaning outerCallCount increases and cb gets (null, stream) not (true)
      read(true, (abortErr: any, abortData: any) => {
        // With original: abortErr=true, outerCallCount increases by 1 (abort call)
        // With mutation: abortErr=null, abortData=stream, outerCallCount increases by 1 (null read)
        // then ANOTHER call happens... let's just check abortErr is truthy
        // and that outer was called exactly once more (for the abort)
        expect(abortErr).toBeTruthy();
        // With mutation the outer source is called with null (not abort),
        // so it returns a stream - meaning cb gets data not an error
        // This check distinguishes: abortData should be undefined
        expect(typeof abortData).not.toBe('function');
        done();
      });
    });
  });
});