const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should handle false error correctly', (done) => {
    const testError = false;
    const testData = [1, 2, 3];

    const findStream = find((d: any) => d > 10, (err: any, data: any) => {
      expect(err).toBe(null);
      expect(data).toBe(null);
    });

    pull(
      pull.values(testData),
      findStream,
      pull.drain(null, (err: any) => {
        expect(err).toBe(null);
        done();
      })
    );
  });
});