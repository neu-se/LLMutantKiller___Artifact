import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('flatten abort behavior', () => {
  it('should abort stream of streams with error when abort is called with error', (done) => {
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

      // Trigger abort with an error
      read(error, function(abortErr: any) {
        expect(abortErr).toBe(error);

        // In the original code, streamOfStreams should be aborted with the error
        // In the mutated code, it would be aborted with null/undefined
        setImmediate(() => {
          expect(streamOfStreamsEnded).toBe(error);
          done();
        });
      });
    });
  });
});