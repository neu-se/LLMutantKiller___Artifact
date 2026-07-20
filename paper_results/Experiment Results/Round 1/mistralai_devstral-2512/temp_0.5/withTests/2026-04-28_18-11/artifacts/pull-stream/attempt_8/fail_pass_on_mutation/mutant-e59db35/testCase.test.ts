import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('flatten abort behavior', () => {
  it('should abort stream of streams when nested stream is active', (done) => {
    const error = new Error('test error');
    let streamOfStreamsEnded: any = null;
    let nestedStreamEnded: any = null;

    const read = flatten()(
      values([
        values([1, 2, 3], function(err: any) {
          nestedStreamEnded = err;
        })
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

        // Now abort with error
        read(error, function(abortErr: any) {
          expect(abortErr).toBe(error);

          setImmediate(() => {
            // Original: both should receive the error
            // Mutated: streamOfStreamsEnded would be null
            expect(streamOfStreamsEnded).toBe(error);
            expect(nestedStreamEnded).toBe(error);
            done();
          });
        });
      });
    });
  });
});