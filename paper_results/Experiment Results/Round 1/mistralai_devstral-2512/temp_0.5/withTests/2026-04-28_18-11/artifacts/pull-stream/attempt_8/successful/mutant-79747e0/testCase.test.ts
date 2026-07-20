const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should handle stream end without done callback', (done) => {
    let errorThrown = false;
    let warningLogged = false;

    // Override console.warn to detect the warning
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      if (msg && msg.message === 'no done callback supplied') {
        warningLogged = true;
      }
      originalWarn(msg);
    };

    // Create a source that ends with an error
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      const error = new Error('test error');
      cb(error);
    };

    // Create drain without done callback
    const sink = drain(null);

    try {
      pull(source, sink);
    } catch (err) {
      errorThrown = true;
    }

    setTimeout(() => {
      expect(warningLogged).toBe(true);
      expect(errorThrown).toBe(true);
      console.warn = originalWarn;
      done();
    }, 100);
  });
});