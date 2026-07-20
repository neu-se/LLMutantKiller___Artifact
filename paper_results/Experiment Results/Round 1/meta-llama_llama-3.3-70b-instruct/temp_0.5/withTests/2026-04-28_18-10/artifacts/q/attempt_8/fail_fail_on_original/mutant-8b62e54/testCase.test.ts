import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should reject after all promises are rejected", (done) => {
        const deferreds = [Q.defer(), Q.defer()];
        const promises = [deferreds[0].promise, deferreds[1].promise];

        const promise = Q.any(promises);

        deferreds[0].reject("Rejected");
        deferreds[1].reject("Rejected");

        promise.then(
            () => {
                expect(true).toBe(false);
                done();
            },
            (error: any) => {
                expect(error.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected");
                done();
            }
        );
    }, 10000);
});