import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain error handling', () => {
  it('should throw error when end is an error object and no done callback', (done) => {
    const error = new Error('test error');
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

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