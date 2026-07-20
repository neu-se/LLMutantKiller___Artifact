// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-b5bd5a3/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspection behavior", () => {
    it("should properly handle rejected promise inspection with exception property", () => {
        const rejectedPromise = Q.reject(new Error("Test error"));
        const inspected = rejectedPromise.inspect();
        expect(inspected.state).toBe("rejected");
        expect(inspected.reason).toBeInstanceOf(Error);
        expect(inspected.reason.message).toBe("Test error");
        // The mutation would prevent the exception property from being set
        // This test verifies that the exception property is properly accessible
        expect(rejectedPromise.exception).toBeDefined();
        expect(rejectedPromise.exception).toBeInstanceOf(Error);
        expect(rejectedPromise.exception.message).toBe("Test error");
    });
});