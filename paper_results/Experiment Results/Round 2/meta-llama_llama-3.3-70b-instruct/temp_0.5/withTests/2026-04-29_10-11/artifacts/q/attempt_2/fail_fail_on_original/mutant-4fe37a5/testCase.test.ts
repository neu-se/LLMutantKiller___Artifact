import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject when operation is not supported", () => {
        const promise = Q.Promise({}, function(op) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        });
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Promise does not support operation: when");
        });
    });
});