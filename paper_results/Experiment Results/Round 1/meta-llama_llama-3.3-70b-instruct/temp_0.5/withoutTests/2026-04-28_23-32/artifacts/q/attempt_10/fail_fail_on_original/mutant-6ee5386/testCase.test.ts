import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress callback exceptions correctly", (done) => {
        Q.delay(10).progress(() => {
            throw new Error("Test error");
        }).then(() => {
            done.fail("Expected an error to be thrown");
        }).catch((error: any) => {
            expect(error.message).toBe("Test error");
            done();
        });
    });
});