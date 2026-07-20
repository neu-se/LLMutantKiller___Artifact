import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when stream ends without a done callback', (done) => {
    expect.assertions(1);
    const source = pull.values([1, 2, 3]);
    const sink = drain();
    const pipeline = pull(source, sink);

    // Capture console.warn to check for the expected error message
    const originalWarn = console.warn;
    console.warn = (message: any) => {
      expect(message).toBeInstanceOf(Error);
      expect((message as Error).message).toBe('no done callback supplied');
      console.warn = originalWarn;
      done();
    };

    // Start the pipeline
    pipeline(null, () => {});
  });
});