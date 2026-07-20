const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find error handling', () => {
  it('should pass true as error when stream ends with true', (done) => {
    pull(
      function (abort: any, cb: any) {
        if (abort) {
          cb(abort);
        } else {
          cb(true);
        }
      },
      find(function (data: any) {
        return data === 'test';
      }, function (err: any, result: any) {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      })
    );
  });
});