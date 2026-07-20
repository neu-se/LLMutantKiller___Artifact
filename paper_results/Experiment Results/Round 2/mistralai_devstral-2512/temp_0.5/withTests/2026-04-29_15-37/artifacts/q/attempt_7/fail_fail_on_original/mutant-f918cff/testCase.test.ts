import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor exception handling", () => {
    it("should reject when an exception occurs in promise descriptor", () => {
        const error = new Error("Test exception");
        const promise = Q.makePromise({
            "when": function () {
                throw error;
            }
        });

        return Q.when(promise, function () {
            throw new Error("Promise should have been rejected");
        }, function (caughtError: Error) {
            expect(caughtError).toBe(error);
        });
    });
});