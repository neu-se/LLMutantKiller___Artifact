const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('values with null input', () => {
  it('should handle null input by returning empty stream', (done) => {
    const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
    const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

    pull(
      values(null),
      collect((err: any, ary: any) => {
        expect(err).toBeNull();
        expect(ary).toEqual([]);
        done();
      })
    );
  });
});