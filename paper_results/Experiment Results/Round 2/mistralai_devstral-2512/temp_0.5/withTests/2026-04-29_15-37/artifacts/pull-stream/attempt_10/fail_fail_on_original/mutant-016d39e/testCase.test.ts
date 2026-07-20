// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-016d39e/testCase.test.ts
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('drain error message', () => {
  it('should throw error with descriptive message when no done callback is provided', (done) => {
    const errorMessages: string[] = [];
    const originalError = console.error;
    console.error = (...args: any[]) => {
      errorMessages.push(args.join(' '));
    };

    const sink = drain();
    const source = values([1, 2, 3]);

    source(null, (end: any, data: any) => {
      if (end) {
        console.error = originalError;
        const hasDescriptiveError = errorMessages.some(msg =>
          msg.includes('no done callback supplied')
        );
        expect(hasDescriptiveError).toBe(true);
        done();
      } else {
        sink(end, data);
      }
    });
  });
});