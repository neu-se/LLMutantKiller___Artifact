import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('flatten abort behavior', () => {
  it('should properly propagate abort error to stream of streams', (done) => {
    const abortError = new Error('abort error');
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

      // Trigger abort with an error
      read(abortError, function(abortErr: any) {
        expect(abortErr).toBe(abortError);

        setImmediate(() => {
          // In original code: streamOfStreamsEnded should be abortError
          // In mutated code: streamOfStreamsEnded would be null (because err && abort)
          expect(streamOfStreamsEnded).toBe(abortError);
          done();
        });
      });
    });
  });
});