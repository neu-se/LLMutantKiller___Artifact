const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should handle stream completion without done callback', (done) => {
    let errorThrown = false;
    let streamEnded = false;

    const source = (end: any, cb: any) => {
      if (end) {
        streamEnded = true;
        return cb(end);
      }
      if (!errorThrown) {
        errorThrown = true;
        cb(null, 1);
      } else {
        cb(true);
      }
    };

    const sink = drain(null);

    pull(source, sink);

    setTimeout(() => {
      expect(streamEnded).toBe(true);
      done();
    }, 100);
  });
});