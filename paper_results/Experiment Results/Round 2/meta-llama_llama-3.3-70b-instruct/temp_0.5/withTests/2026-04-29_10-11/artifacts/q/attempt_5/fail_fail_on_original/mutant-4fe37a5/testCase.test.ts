import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject when operation is not supported", () => {
        const promise = Q.Promise({
            when: function(resolve: any, op: any, args: any) {
                throw new Error("Promise does not support operation: " + op);
            }
        }, function fallback(op: any, args: any) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        }, function inspect() {
            return { state: "pending" };
        });
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Promise does not support operation: when");
        });
    });
});