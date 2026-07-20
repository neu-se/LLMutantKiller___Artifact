// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-fe4b62b/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should set abort to true when called with just a callback', (done) => {
    const source = (abort: any, cb: (err: any) => void) => {
      // The abort value should be true (original) or false (mutated)
      expect(abort).toBe(true);
      cb(null);
      done();
    };

    const sink = drain((data: any) => false);

    // Call abort with just a callback (no error argument)
    sink.abort(() => {});
    // Trigger the source to see what abort value was set
    sink(source);
  });
});