const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass true as error when stream ends with true', (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true);
      }
    };

    pull(
      source,
      find((data: any) => false, (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});