import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and the stream ends with an error', (done) => {
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(true, new Error('Test error'));
    });
    sink(read);
    try {
      // If the error is not thrown, this will be executed
      done.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toBe('no done callback supplied');
      done();
    }
  });
});