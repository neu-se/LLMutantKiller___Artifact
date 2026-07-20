import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
    it("should reject with a timeout error if the promise is too slow", () => {
        const promise = Q.delay(100).timeout(50, "Timeout");
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error).toBe("Timeout");
            }
        );
    });
});