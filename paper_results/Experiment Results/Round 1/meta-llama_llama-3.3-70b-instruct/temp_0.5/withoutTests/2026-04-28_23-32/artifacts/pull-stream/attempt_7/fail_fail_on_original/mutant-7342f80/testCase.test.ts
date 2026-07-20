import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the done callback with an error when no done callback is supplied and an error occurs', (done) => {
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(new Error('Test error'), null);
    });
    sink(read);
    setTimeout(() => {
      try {
        // The original code should throw an error when no done callback is supplied.
        sink.abort();
        done.fail('Expected an error to be thrown');
      } catch (err) {
        expect(err.message).toBe('Test error');
        done();
      }
    }, 100);
  });
});