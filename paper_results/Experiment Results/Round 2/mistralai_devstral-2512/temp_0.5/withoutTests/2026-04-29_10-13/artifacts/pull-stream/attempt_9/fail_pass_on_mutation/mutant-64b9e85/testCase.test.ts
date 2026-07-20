const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('find sink', () => {
  it('should call callback with null error when stream ends without match', (done) => {
    const testFn = (data: any) => data === 'target';
    const callback = (err: any, result: any) => {
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    };

    const source = values(['a', 'b', 'c']);

    pull(
      source,
      find(testFn, callback)
    );
  });
});