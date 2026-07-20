import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress callback exceptions correctly", (done) => {
        let threw = false;
        Q.delay(10).progress(() => {
            throw new Error("Test error");
        }).catch((error: any) => {
            threw = true;
        });
        setTimeout(() => {
            expect(threw).toBe(true);
            done();
        }, 20);
    });
});