import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when done callback is not supplied', (done) => {
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    sink(read);
    // The mutated code will not throw an error, so the test will timeout
    // and fail if the mutation is present.
    setTimeout(() => {
      try {
        // The original code should throw an error when done callback is not supplied.
        sink.abort(new Error('Test error'));
        done.fail('Expected an error to be thrown');
      } catch (err) {
        expect(err.message).toBe('Test error');
        done();
      }
    }, 100);
  });
});