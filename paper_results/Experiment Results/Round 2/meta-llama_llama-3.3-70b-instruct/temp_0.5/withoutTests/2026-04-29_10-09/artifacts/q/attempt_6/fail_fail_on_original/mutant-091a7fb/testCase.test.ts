import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject if all promises are rejected and the rejection order is correct", (done) => {
        let rejectionCount = 0;
        const promise1 = Q.reject("error1");
        const promise2 = Q.reject("error2");
        Q.any([promise1, promise2]).then(
            () => {
                throw new Error("Expected rejection");
            },
            (error: any) => {
                expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
                done();
            }
        );
    }, 10000);
});