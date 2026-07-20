import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should handle abort with a function as the first argument', (done) => {
    const mockRead = jest.fn((abort, cb) => {
      expect(abort).toBe(true);
      cb();
    });

    const mockSource = (abort, cb) => {
      mockRead(abort, cb);
    };

    const sink = drain(null, () => {
      done();
    });

    // This should trigger the abort path with a function as the first argument
    sink.abort(mockSource);
  });
});