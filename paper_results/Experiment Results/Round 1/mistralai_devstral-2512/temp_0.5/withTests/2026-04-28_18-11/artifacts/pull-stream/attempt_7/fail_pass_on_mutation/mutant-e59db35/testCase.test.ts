import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('flatten abort behavior', () => {
  it('should properly handle abort with error object', (done) => {
    const error = new Error('test error');
    let streamOfStreamsEnded: any = null;

    const read = flatten()(
      values([
        values([1, 2, 3])
      ], function(err: any) {
        streamOfStreamsEnded = err;
      })
    );

    read(null, function(err: any, data: any) {
      expect(err).toBeNull();
      expect(data).toBe(1);

      // Abort with error object
      read(error, function(abortErr: any) {
        expect(abortErr).toBe(error);

        setImmediate(() => {
          // Original: streamOfStreamsEnded should be the error
          // Mutated: streamOfStreamsEnded would be null (because err && abort)
          expect(streamOfStreamsEnded).toBe(error);
          done();
        });
      });
    });
  });
});