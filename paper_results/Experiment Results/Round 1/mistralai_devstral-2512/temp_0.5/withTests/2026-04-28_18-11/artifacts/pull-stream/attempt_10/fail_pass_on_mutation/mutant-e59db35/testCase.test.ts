import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('flatten abort behavior', () => {
  it('should abort stream of streams with error when nested stream is active', (done) => {
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

      // Read second item to ensure nested stream is active
      read(null, function(err: any, data: any) {
        expect(err).toBeNull();
        expect(data).toBe(2);

        // Abort with error
        read(error, function(abortErr: any) {
          expect(abortErr).toBe(error);

          setImmediate(() => {
            // Original: streamOfStreamsEnded should be error
            // Mutated: streamOfStreamsEnded would be null (because err && abort)
            if (streamOfStreamsEnded === error) {
              done();
            } else {
              done(new Error('Expected streamOfStreamsEnded to be error, but got: ' + streamOfStreamsEnded));
            }
          });
        });
      });
    });
  });
});