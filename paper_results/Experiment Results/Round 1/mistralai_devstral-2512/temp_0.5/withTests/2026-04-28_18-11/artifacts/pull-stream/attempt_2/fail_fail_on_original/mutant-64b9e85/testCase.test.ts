import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('find error handling', () => {
  it('should pass error to callback when stream ends with error', (done) => {
    const error = new Error('test error');
    let callbackCalled = false;

    const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

    const read = pull(
      function (abort: any, cb: any) {
        if (abort) {
          cb(abort);
        } else {
          cb(error);
        }
      },
      find(function (data: any) {
        return data === 'test';
      }, function (err: any, result: any) {
        callbackCalled = true;
        expect(err).toBe(error);
        expect(result).toBeNull();
        done();
      })
    );

    read(null, function (end: any, data: any) {
      expect(callbackCalled).toBe(true);
    });
  });
});