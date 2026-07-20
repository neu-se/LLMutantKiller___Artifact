// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise prototype exception property", () => {
    it("should set exception property for rejected promises", () => {
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);

        // The mutation changes `if (inspect)` to `if (false)`, which means
        // the exception property won't be set on rejected promises
        // In the original code, rejected promises should have an exception property
        expect(rejectedPromise.exception).toBe(error);
    });
});