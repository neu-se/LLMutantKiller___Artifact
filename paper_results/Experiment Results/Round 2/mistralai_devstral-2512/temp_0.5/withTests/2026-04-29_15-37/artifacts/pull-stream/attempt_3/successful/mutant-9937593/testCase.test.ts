const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain error handling', () => {
  it('should throw error when end is an error object and no done callback', (done) => {
    const error = new Error('test error');

    const source = function (abort: any, cb: any) {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    const sink = drain(null, null);

    expect(() => {
      pull(source, sink);
    }).toThrow(error);

    done();
  });
});