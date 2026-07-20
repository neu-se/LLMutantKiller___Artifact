import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const promise = Q.Promise({}, function fallback(op: string): any {
            if (op === "when") {
                return Q.resolve();
            } else {
                return Q.reject(new Error("Promise does not support operation: " + op));
            }
        });
        return promise.then(
            (value: any) => {
                expect(value).toBeUndefined();
            },
            (error: any) => {
                throw new Error("Promise should not be rejected");
            }
        );
    });
});