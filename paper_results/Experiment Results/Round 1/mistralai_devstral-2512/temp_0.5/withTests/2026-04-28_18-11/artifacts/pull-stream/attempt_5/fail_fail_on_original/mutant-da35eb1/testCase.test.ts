const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass error when stream ends with error', (done) => {
    const error = new Error('test error');
    const values = pull.values([1, 2, 3]);
    const asyncMap = pull.asyncMap(function(data: any, cb: any) {
      if (data === 2) {
        cb(error);
      } else {
        cb(null, data);
      }
    });
    const findSink = find(null, function(err: any, result: any) {
      expect(err).toBe(error);
      expect(result).toBeNull();
      done();
    });
    pull(values, asyncMap, findSink);
  });
});