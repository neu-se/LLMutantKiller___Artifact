import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when no done callback is provided', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    try {
      pull(
        pull.values([1, 2, 3]),
        drain()
      );
      done.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toBe('no done callback supplied');
      consoleWarnSpy.mockRestore();
      errorSpy.mockRestore();
      done();
    }
  });
});