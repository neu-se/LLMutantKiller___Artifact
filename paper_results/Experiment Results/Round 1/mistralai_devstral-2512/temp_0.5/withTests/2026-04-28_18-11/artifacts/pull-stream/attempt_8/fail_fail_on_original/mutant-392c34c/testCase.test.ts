const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('find error handling', () => {
  it('should handle false error correctly', (done) => {
    const testError = false;
    const testData = [1, 2, 3];

    const findStream = find((d: any) => d > 10, (err: any, data: any) => {
      expect(err).toBe(null);
      expect(data).toBe(null);
    });

    pull(
      values(testData),
      findStream,
      drain(null, (err: any) => {
        expect(err).toBe(null);
        done();
      })
    );
  });
});