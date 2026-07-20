import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reject the promise when an error occurs in a promise chain", () => {
        Q().then(() => {
            throw new Error("Test error");
        }).catch((error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});