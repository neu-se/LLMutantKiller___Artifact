import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should reject after all promises are rejected", () => {
        const deferreds = [Q.defer(), Q.defer()];
        const promises = [deferreds[0].promise, deferreds[1].promise];

        const promise = Q.any(promises);

        deferreds[0].reject(new Error("Rejected"));
        deferreds[1].reject(new Error("Rejected"));

        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error) => {
                expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Error: Rejected");
            }
        );
    });
});