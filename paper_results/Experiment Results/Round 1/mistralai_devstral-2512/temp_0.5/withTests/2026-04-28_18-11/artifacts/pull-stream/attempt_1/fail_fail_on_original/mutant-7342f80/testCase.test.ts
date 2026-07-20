import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain without done callback", () => {
  it("should throw an error when no done callback is provided", (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const source = pull.values([1, 2, 3]);
    const sink = drain();

    pull(source, sink);

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.any(Error));
      const error = consoleWarnSpy.mock.calls[0][0];
      expect(error.message).toBe('no done callback supplied');

      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      done();
    });
  });
});