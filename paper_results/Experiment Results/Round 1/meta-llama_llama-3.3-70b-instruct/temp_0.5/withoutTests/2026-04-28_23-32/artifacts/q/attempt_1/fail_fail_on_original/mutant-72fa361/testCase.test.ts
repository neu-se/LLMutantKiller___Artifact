import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle stack traces in promises", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Make sure the error stack is not empty
        expect(error.stack).not.toBeNull();

        // Make sure the promise's stack is not empty
        promise.then(null, () => {
            expect(promise.stack).not.toBeNull();
        });

        // We need to wait for the promise to be rejected before checking the stack
        return promise.catch((err) => {
            // The mutation should cause the stack to be empty
            expect(err.stack).not.toBeNull();
        });
    });
});