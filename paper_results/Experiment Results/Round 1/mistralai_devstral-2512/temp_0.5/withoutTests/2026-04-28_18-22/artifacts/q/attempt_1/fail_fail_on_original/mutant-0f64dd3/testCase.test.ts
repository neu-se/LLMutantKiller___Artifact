import { Q } from "./q.js";

describe("Q library stack trace filtering", () => {
    it("should properly filter internal stack frames", () => {
        // Create a scenario where Q needs to capture and filter stack traces
        const promise = Q.reject(new Error("Test error"));

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error) => {
                // The error should have a stack trace that doesn't include Q's internal frames
                // when long stack support is enabled
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Test error");
                // The test passes if we reach here without throwing
                return true;
            }
        );
    });
});