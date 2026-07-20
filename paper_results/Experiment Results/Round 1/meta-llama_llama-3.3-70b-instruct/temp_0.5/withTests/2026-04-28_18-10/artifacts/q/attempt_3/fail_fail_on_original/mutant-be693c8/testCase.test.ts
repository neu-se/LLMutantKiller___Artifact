import { Q } from "../../../../../q";

describe("Q.timeout", () => {
    it("should reject the promise if it does not resolve within the given time", () => {
        const promise = Q.delay(100).timeout(50);
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.code).toBe("ETIMEDOUT");
            }
        );
    });
});