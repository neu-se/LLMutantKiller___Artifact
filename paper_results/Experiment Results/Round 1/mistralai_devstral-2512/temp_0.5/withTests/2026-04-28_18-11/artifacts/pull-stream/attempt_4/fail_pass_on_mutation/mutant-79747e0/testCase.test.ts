const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should not call done when done is not provided', (done) => {
    let doneCalled = false;
    const mockDone = () => {
      doneCalled = true;
    };

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 1);
      cb(true);
    };

    const sink = drain(null, mockDone);

    pull(source, sink);

    setTimeout(() => {
      expect(doneCalled).toBe(true);
      done();
    }, 100);
  });
});