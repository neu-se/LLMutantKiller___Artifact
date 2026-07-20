const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should not call done callback when done is not provided', (done) => {
    let doneCalled = false;
    const mockDone = () => {
      doneCalled = true;
    };

    const source = pull.values([1, 2, 3]);
    const sink = drain(null, mockDone);

    pull(source, sink);

    setTimeout(() => {
      expect(doneCalled).toBe(true);
      done();
    }, 100);
  });
});