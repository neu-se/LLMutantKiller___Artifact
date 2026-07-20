const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('find sink', () => {
  it('should handle true as error value correctly', (done) => {
    const testFn = (data: any) => data === 'target';
    const callback = (err: any, result: any) => {
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