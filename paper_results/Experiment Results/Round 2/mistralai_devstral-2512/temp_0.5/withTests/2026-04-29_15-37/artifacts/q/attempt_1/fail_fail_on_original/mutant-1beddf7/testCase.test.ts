// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-1beddf7/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise resolver execution", () => {
    it("should execute the resolver function with resolve, reject, and notify", () => {
        let resolverCalled = false;
        let resolve: (value: unknown) => void;
        let reject: (reason?: unknown) => void;
        let notify: (progress: unknown) => void;

        const promise = Q.promise((res, rej, not) => {
            resolverCalled = true;
            resolve = res;
            reject = rej;
            notify = not;
        });

        expect(resolverCalled).toBe(true);
        expect(typeof resolve).toBe("function");
        expect(typeof reject).toBe("function");
        expect(typeof notify).toBe("function");

        // Verify the promise is still pending
        expect(promise.isPending()).toBe(true);

        // Resolve the promise to complete the test
        resolve!(42);
        return promise.then((value) => {
            expect(value).toBe(42);
        });
    });
});