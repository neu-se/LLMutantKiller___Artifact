import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain error message', () => {
  it('should produce descriptive error when no done callback is provided', (done) => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    const source = values([1, 2, 3]);
    const sink = drain();

    source(null, (end, data) => {
      if (end) {
        setImmediate(() => {
          expect(mockWarn).toHaveBeenCalled();
          const error = mockWarn.mock.calls[0][0];
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('no done callback supplied');
          console.warn = originalWarn;
          done();
        });
      } else {
        sink(null, (end) => {
          if (end) {
            setImmediate(() => {
              expect(mockWarn).toHaveBeenCalled();
              const error = mockWarn.mock.calls[0][0];
              expect(error).toBeInstanceOf(Error);
              expect(error.message).toBe('no done callback supplied');
              console.warn = originalWarn;
              done();
            });
          }
        });
      }
    });
  });
});