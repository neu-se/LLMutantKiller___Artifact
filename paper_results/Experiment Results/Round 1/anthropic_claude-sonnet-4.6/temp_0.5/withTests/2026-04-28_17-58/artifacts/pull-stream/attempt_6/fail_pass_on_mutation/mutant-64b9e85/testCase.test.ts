const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find', () => {
  it('should pass actual error to callback when stream errors without finding a match', (done) => {
    const testError = new Error('test error');
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      cb(testError);
    };
    
    const sink = find(function (d: any) {
      return false;
    }, function (err: any, found: any) {
      expect(err).toBe(testError);
      expect(found).toBeNull();
      done();
    });
    
    sink(source);
  });
});