import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle unhandled rejections", () => {
        const promise = Q.reject("Test rejection");
        const originalProcessEmit = process.emit;
        let emitted = false;
        process.emit = (event, reason, promise) => {
            if (event === "unhandledRejection") {
                emitted = true;
            }
        };
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.untrackRejection && Q.untrackRejection(promise);
        } else if (typeof process === "object" || typeof process.emit === "function") {
            throw new Error("This should not be reached in the original code");
        }
        process.emit = originalProcessEmit;
        expect(emitted).toBe(false);
    });
});