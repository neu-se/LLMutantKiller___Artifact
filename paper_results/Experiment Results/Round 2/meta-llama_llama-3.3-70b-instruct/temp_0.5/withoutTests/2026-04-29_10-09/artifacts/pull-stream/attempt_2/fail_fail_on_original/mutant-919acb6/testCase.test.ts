import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle end condition correctly', (done) => {
    let called = false;
    const read = jest.fn((err, cb) => {
      if (called) return;
      called = true;
      cb(null, null, 'test data');
    });
    const sink = drain(null, (err) => {
      expect(err).toBeNull();
      done();
    });
    sink(read);
  });
});