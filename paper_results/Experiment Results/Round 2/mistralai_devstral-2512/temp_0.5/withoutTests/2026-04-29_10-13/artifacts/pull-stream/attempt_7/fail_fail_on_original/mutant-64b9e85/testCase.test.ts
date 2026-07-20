const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('find sink', () => {
  it('should call callback with error when stream ends with true error', (done) => {
    const testFn = (data: any) => data === 'target';
    const callback = (err: any, result: any) => {
      expect(err).toBe(true);
      expect(result).toBeNull();
      done();
    };

    const source = {
      read: (abort: any, cb: any) => {
        cb(true, null); // Pass true as error
      }
    };

    pull(
      source,
      find(testFn, callback)
    );
  });
});