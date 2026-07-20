import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle true end value correctly', (done) => {
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true);
      }
    };

    const doneCallback = jest.fn((err) => {
      expect(err).toBeNull();
      done();
    });

    const sink = drain(null, doneCallback);
    sink(source);
  });
});