const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('find sink', () => {
  it('should call callback with error when stream ends without match', (done) => {
    const testFn = (data: any) => data === 'target';
    const callback = (err: Error | null, result: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(result).toBeNull();
      done();
    };

    const source = pull.values(['a', 'b', 'c']);

    pull(
      source,
      find(testFn, callback)
    );
  });
});