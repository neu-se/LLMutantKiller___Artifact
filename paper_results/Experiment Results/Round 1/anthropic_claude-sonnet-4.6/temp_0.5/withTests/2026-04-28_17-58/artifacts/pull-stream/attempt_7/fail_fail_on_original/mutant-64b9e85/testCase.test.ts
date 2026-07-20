const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find', () => {
  it('should call callback with null error when match is found and stream is aborted', (done) => {
    const calls: Array<[any, any]> = [];
    
    // Use a source that never ends on its own, so drain must abort it
    let readCb: Function | null = null;
    const infiniteSource = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      readCb = cb;
      // Simulate async data delivery
      setImmediate(() => {
        if (readCb) {
          readCb(null, 7);
          readCb = null;
        }
      });
    };
    
    const sink = find(function (d: any) {
      return d === 7;
    }, function (err: any, found: any) {
      calls.push([err, found]);
      if (calls.length >= 1 && found === 7) {
        expect(err).toBeNull();
      }
      if (calls.length >= 2) {
        expect(calls[1][0]).toBeNull();
        done();
      }
    });
    
    sink(infiniteSource);
  });
});