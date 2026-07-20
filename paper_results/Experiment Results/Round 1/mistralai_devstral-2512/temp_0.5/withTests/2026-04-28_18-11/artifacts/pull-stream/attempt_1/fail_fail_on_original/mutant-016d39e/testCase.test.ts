import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('drain without done callback', () => {
  it('should throw error with descriptive message when no done callback is provided', (done) => {
    const errorMessage = 'no done callback supplied';
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    try {
      const sink = drain();
      const source = values([1, 2, 3]);

      source(null, (end, data) => {
        if (end) {
          expect(consoleWarnSpy).toHaveBeenCalled();
          const warnCall = consoleWarnSpy.mock.calls[0][0];
          expect(warnCall).toBeInstanceOf(Error);
          expect(warnCall.message).toBe(errorMessage);
          consoleWarnSpy.mockRestore();
          done();
        } else {
          sink(null, (end, data) => {
            if (end) {
              expect(consoleWarnSpy).toHaveBeenCalled();
              const warnCall = consoleWarnSpy.mock.calls[0][0];
              expect(warnCall).toBeInstanceOf(Error);
              expect(warnCall.message).toBe(errorMessage);
              consoleWarnSpy.mockRestore();
              done();
            }
          });
        }
      });
    } catch (err) {
      expect(consoleWarnSpy).toHaveBeenCalled();
      const warnCall = consoleWarnSpy.mock.calls[0][0];
      expect(warnCall).toBeInstanceOf(Error);
      expect(warnCall.message).toBe(errorMessage);
      consoleWarnSpy.mockRestore();
      done();
    }
  });
});