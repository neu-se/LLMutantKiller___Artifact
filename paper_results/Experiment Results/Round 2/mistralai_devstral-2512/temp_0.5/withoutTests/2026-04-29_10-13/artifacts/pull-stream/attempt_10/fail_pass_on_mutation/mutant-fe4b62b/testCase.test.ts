// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-fe4b62b/testCase.test.ts
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort behavior', () => {
  it('should set correct abort value when called with callback as first argument', () => {
    let receivedAbortValue: any;
    const source = (abort: any, cb: (err: any) => void) => {
      receivedAbortValue = abort;
      cb(null);
    };

    const sink = drain((data: any) => false);

    // Call abort with callback as first argument
    sink.abort(() => {});

    // Trigger the source to capture the abort value
    sink(source);

    // In original code: abort should be true
    // In mutated code: abort will be false
    expect(receivedAbortValue).toBe(true);
  });
});