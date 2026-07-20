import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    const read = jest.fn((err, cb) => {
      if (err) {
        cb(true, null);
      } else {
        cb(false, 'data');
      }
    });

    const sink = drainModule.drain(null, (err) => {
      if (err) {
        expect(err).toBeNull();
      } else {
        expect(read).toHaveBeenCalledTimes(1);
      }
      done();
    });

    sink(read);
  });
});