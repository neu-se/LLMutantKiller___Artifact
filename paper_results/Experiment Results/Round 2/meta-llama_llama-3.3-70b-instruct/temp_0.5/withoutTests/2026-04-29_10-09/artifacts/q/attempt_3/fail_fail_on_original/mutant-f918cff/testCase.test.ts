import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject the promise when an exception is thrown in the promise dispatch", () => {
        const promise = Q.Promise({
            "when": function (resolve, op, args) {
                throw new Error("Test error");
            }
        }, function fallback(op, args) {
            throw new Error("Test error");
        }, function inspect() {
            return { state: "pending" };
        });
        return promise.then(() => {
            throw new Error("Expected promise to be rejected");
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});