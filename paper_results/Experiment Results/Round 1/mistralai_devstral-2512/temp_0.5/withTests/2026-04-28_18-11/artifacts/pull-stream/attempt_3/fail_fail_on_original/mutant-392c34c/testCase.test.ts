const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('find error handling', () => {
  it('should handle false error correctly', (done) => {
    pull(
      pull.values([1, 2, 3]),
      pull.find((d: any) => d > 10, (err: any, data: any) => {
        expect(err).toBe(null);
        expect(data).toBe(null);
      }),
      pull.drain(null, (err: any) => {
        expect(err).toBe(null);
        done();
      })
    );
  });
});