const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should handle stream end without done callback', (done) => {
    let errorThrown = false;
    let warningLogged = false;

    // Override console.warn to detect the warning
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      if (msg.message === 'no done callback supplied') {
        warningLogged = true;
      }
      originalWarn(msg);
    };

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 1);
      cb(true); // End the stream
    };

    const sink = drain(null); // No done callback provided

    pull(source, sink);

    setTimeout(() => {
      expect(warningLogged).toBe(true);
      console.warn = originalWarn;
      done();
    }, 100);
  });
});