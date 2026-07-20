import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const promise = Q.Promise({}, undefined);
        return promise.then(() => {
            throw new Error("Promise should be rejected");
        }, (error) => {
            expect(error.message).toBe("Promise does not support operation: when");
        });
    });
});