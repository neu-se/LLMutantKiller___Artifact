import { Q } from "../../../../../q.js";

describe("Q.timeout", () => {
    it("should reject with a timeout error if the promise is too slow", () => {
        const promise = Q.delay(100).timeout(50, "Timeout");
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                if (error instanceof Error) {
                    expect(error.message).toContain("Timeout");
                } else {
                    expect(true).toBe(false);
                }
            }
        );
    });
});