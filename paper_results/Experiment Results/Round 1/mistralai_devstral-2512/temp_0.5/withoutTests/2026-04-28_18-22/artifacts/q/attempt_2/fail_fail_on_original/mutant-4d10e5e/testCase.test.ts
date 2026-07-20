// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-4d10e5e/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace behavior", () => {
    it("should not include stack traces when hasStacks is false", () => {
        const originalHasStacks = Q.longStackSupport;
        Q.longStackSupport = false;

        let errorWithStack: Error | null = null;
        try {
            throw new Error("Test error");
        } catch (e) {
            errorWithStack = e as Error;
        }

        const promise = Q.reject(errorWithStack!);
        const result = promise.inspect();

        Q.longStackSupport = originalHasStacks;

        expect(result.state).toBe("rejected");
        expect(result.reason).toBeInstanceOf(Error);
        expect(result.reason!.message).toBe("Test error");
        expect((result.reason! as any).stack).toBeUndefined();
    });
});