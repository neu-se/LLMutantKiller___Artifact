import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('flatten abort behavior', () => {
  it('should abort stream of streams with error when nested stream errors during abort', (done) => {
    const error = new Error('test error');
    let streamOfStreamsEnded: any = null;
    let nestedStreamEnded: any = null;

    const read = pull(
      pull.values([
        pull.values([1, 2], function(err: any) {
          nestedStreamEnded = err;
        })
      ], function(err: any) {
        streamOfStreamsEnded = err;
      }),
      pull.flatten()
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
          expect(nestedStreamEnded).toBe(error);
          done();
        });
      });
    });
  });
});