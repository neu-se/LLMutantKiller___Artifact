import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when stream ends without done callback', (done) => {
    const error = new Error('no done callback supplied');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    pull(
      pull.values([1, 2, 3]),
      drain(null as any) // Explicitly passing null to trigger the mutation
    );

    setImmediate(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(error);
      consoleWarnSpy.mockRestore();
      done();
    });
  });
});