import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const promise = Q.Promise({}, function fallback(op) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        });
        return promise.then(function(value) {
            throw new Error("Promise should be rejected");
        }, function(error) {
            expect(error.message).toBe("Promise does not support operation: when");
        });
    });
});