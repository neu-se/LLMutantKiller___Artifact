const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('values with null input', () => {
  it('should handle null input by returning empty stream', (done) => {
    const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

    pull(
      values(null),
      pull.collect((err: any, ary: any) => {
        expect(err).toBeNull();
        expect(ary).toEqual([]);
        done();
      })
    );
  });
});