// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-016d39e/testCase.test.ts
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('drain error message', () => {
  it('should throw error with descriptive message when no done callback is provided', (done) => {
    const errorMessages: string[] = [];
    const originalError = console.error;
    console.error = (...args: any[]) => {
      errorMessages.push(args.join(' '));
    };

    try {
      const drainStream = drain();
      values([1, 2, 3])(null, (end, data) => {
        if (end) {
          console.error = originalError;
          expect(errorMessages.some(msg => msg.includes('no done callback supplied'))).toBe(true);
          done();
        }
      });
    } catch (err) {
      console.error = originalError;
      done('Expected error to be thrown asynchronously');
    }
  });
});