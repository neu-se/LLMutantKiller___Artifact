const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('find error handling', () => {
  it('should handle false error correctly', (done) => {
    const testData = [1, 2, 3];

    const findStream = find((d: any) => d > 10, (err: any, data: any) => {
      // This should not be called since no data matches
      expect(true).toBe(false); // Force fail if called
    });

    pull(
      values(testData),
      findStream,
      pull.drain(null, (err: any) => {
        // The original code should pass false through as null
        // The mutated code should pass false through as false
        expect(err).toBe(null);
        done();
      })
    );
  });
});