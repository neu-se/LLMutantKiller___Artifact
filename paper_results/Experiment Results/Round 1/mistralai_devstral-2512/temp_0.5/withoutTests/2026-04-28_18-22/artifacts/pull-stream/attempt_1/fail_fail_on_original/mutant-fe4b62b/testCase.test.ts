import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should call callback with true when abort is called without error', (done) => {
    const source = (abort, cb) => {
      if (abort) {
        cb(true);
      } else {
        cb(null, 'data');
      }
    };

    const sink = drain(null, (err) => {
      expect(err).toBeNull();
      done();
    });

    sink.abort((err) => {
      expect(err).toBe(true);
    }, source);
  });
});