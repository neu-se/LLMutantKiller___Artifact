import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor exception handling", () => {
    it("should reject when an exception occurs in promise descriptor", () => {
        const error = new Error("Test exception");
        const promise = Q.makePromise({
            "when": function () {
                throw error;
            }
        }, function fallback(op: string) {
            return Q.reject(new Error("Operation not supported: " + op));
        });

        return promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (caughtError: Error) => {
                expect(caughtError.message).toBe("Test exception");
            }
        );
    });
});