import flatten from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('flatten abort', () => {
  it('should call abort callback with truthy error when aborting with active nested stream', (done) => {
    // Outer source with two inner streams
    let outerIndex = 0;
    const innerStreams = [
      values([1, 2, 3]),
      values([4, 5, 6]),
    ];

    function outerSource(abort: any, cb: (err: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (outerIndex < innerStreams.length) {
        cb(null, innerStreams[outerIndex++]);
      } else {
        cb(true);
      }
    }

    const flattenThrough = flatten();
    const read = flattenThrough(outerSource);

    // First read: gets value 1, setting _read to first inner stream
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(1);

      // Abort: original passes true to outer, mutated passes null (reads next stream)
      // With mutation, cb gets called with (null, secondInnerStream) instead of (true)
      read(true, (abortErr: any, abortData: any) => {
        // abortErr must be truthy - if mutation is active, abortErr will be null
        // and abortData will be the second inner stream
        expect(abortErr).toBeTruthy();
        expect(abortData).toBeUndefined();
        done();
      });
    });
  });
});