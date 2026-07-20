import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with the correct error message when all promises are rejected", () => {
        const promises = [Q.reject("error1"), Q.reject("error2")];
        return Q.any(promises).then(() => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
        });
    });
});