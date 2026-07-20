import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

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
        Q.untrackRejection(promise);
        process.emit = originalProcessEmit;
        expect(emitted).toBe(true);
    });
});