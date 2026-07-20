const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('find sink', () => {
  it('should handle true error value differently from null', (done) => {
    let callbackCalled = false;
    const testFn = (data: any) => data === 'target';
    const callback = (err: any, result: any) => {
      if (callbackCalled) return;
      callbackCalled = true;
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    };

    const source = values([true, 'a', 'b']); // Include true in the data

    pull(
      source,
      find(testFn, callback)
    );
  });
});