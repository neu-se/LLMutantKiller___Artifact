const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should not call done when done is not provided', (done) => {
    let doneCalled = false;
    const mockDone = () => {
      doneCalled = true;
    };

    // Create a source that ends immediately
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(true); // End immediately
    };

    // Create drain without done callback
    const sink = drain(null, mockDone);

    pull(source, sink);

    setTimeout(() => {
      // In original code, done should not be called when done is not provided
      // In mutated code, done will be called because of `if(true)`
      expect(doneCalled).toBe(false);
      done();
    }, 100);
  });
});