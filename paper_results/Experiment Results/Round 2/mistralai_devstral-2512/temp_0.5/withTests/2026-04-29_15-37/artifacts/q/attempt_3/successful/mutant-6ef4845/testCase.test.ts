const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise fallback behavior", () => {
    it("should call fallback when operation is not supported", () => {
        const promise = Q.makePromise({}, (op: string, args: any[]) => {
            return Q.reject(new Error(`Operation ${op} not supported`));
        });

        return promise.dispatch("unsupportedOp", ["arg1", "arg2"])
            .then(
                () => {
                    throw new Error("Expected rejection but promise was fulfilled");
                },
                (error: Error) => {
                    expect(error.message).toBe("Operation unsupportedOp not supported");
                }
            );
    });
});