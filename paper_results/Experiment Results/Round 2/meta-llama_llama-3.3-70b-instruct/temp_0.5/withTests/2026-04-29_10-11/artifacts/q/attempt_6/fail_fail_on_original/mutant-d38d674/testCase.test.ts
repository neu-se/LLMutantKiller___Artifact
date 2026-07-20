import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const fallback = function(op: string): any {
            return Q.reject(new Error("Promise does not support operation: " + op));
        };
        const promise = Q.Promise({}, fallback);
        return promise.then(
            (value: any) => {
                throw new Error("Promise should be rejected");
            },
            (error: any) => {
                expect(error.message).toBe("Promise does not support operation: when");
            }
        );
    });
});