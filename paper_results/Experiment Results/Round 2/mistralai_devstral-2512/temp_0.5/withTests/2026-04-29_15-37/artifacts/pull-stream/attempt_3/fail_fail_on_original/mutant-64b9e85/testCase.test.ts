const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass true as error when stream ends with true', (done) => {
    pull(
      pull.empty(),
      find((data: any) => false, (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});