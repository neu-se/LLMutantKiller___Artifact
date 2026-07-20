import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('flatten abort behavior', () => {
  it('should abort stream of streams with truthy error value', (done) => {
    const read = flatten()(
      values([
        values([1, 2, 3])
      ], function(err: any) {
        // In original: err will be true (truthy)
        // In mutated: err will be null (falsy)
        expect(err).toBe(true);
        done();
      })
    );

    read(null, function(err: any, data: any) {
      expect(err).toBeNull();
      expect(data).toBe(1);

      // Abort with true (truthy value)
      read(true, function(abortErr: any) {
        expect(abortErr).toBe(true);
      });
    });
  });
});