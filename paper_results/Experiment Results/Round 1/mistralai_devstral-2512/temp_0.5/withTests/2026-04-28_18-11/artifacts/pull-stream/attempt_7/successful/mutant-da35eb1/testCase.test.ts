const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass error when stream ends with error', (done) => {
    const error = new Error('test error');

    // Create a simple source that emits an error
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(error); // Emit error immediately
    };

    // Use find with no test function (should pass through all values)
    pull(
      source,
      find(null, (err: any, result: any) => {
        expect(err).toBe(error);
        expect(result).toBeNull();
        done();
      })
    );
  });
});