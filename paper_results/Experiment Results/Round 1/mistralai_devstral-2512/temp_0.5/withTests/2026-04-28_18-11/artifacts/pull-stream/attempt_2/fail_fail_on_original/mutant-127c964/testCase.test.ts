const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with null input', () => {
  it('should handle null input correctly', (done) => {
    pull(
      values(null),
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual([]);
        done();
      })
    );
  });
});