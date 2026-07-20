// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-0ca70b3/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should filter stack traces with internal frames removed", () => {
    // Enable long stack traces to ensure filterStackString is called
    Q.longStackSupport = true;

    // Create a chain of promises that will generate internal stack frames
    const promise = Q.reject(new Error("Test error"));

    return promise.then(
      () => {},
      (err: Error) => {
        // The stack should be filtered to remove internal Q frames
        const stack = err.stack;
        expect(stack).toBeDefined();

        // Check that the stack doesn't contain Q internal frames
        // The mutated code would fail to filter these properly
        expect(stack).not.toMatch(/q\.js/);
        expect(stack).not.toMatch(/filterStackString/);
      }
    );
  });
});