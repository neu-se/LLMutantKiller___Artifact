const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('find', () => {
  it('should call callback with null error when stream ends normally without finding a match', (done) => {
    const source = values([1, 2, 3, 4, 5]);
    const sink = find(function (d: number) {
      return d === 999;
    }, function (err: any, found: any) {
      expect(err).toBeNull();
      expect(found).toBeNull();
      done();
    });
    sink(source);
  });
});