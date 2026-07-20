import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with an error when all promises are rejected and onProgress is not called", () => {
        const promises = [Q.reject("error1"), Q.reject("error2")];
        let progressCalled = false;
        Q.any(promises).progress(() => {
            progressCalled = true;
        }).then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
            expect(progressCalled).toBe(false);
        });
    });
});