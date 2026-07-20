// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-016d39e/testCase.test.ts
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain error message', () => {
  it('should throw error with descriptive message when no done callback is provided', () => {
    const errorMessages: string[] = [];
    const originalError = console.error;
    console.error = (...args: any[]) => {
      errorMessages.push(args.join(' '));
    };

    try {
      const sink = drain();
      sink((end: any, data: any) => {
        if (end) {
          console.error = originalError;
          const hasDescriptiveError = errorMessages.some(msg =>
            msg.includes('no done callback supplied')
          );
          expect(hasDescriptiveError).toBe(true);
        }
      });

      // Simulate stream ending with error
      sink(true, new Error('test error'));
    } catch (err) {
      console.error = originalError;
      throw err;
    }
  });
});