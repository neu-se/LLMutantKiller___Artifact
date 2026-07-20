import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should handle progress notifications correctly", () => {
        let threw = false;
        let progressCalled = false;

        const promise = Q((resolve, reject, notify) => {
            notify("progress");
            resolve("resolved");
        });

        promise.then((value) => {
            expect(value).toBe("resolved");
        }, (error) => {
            throw error;
        }, (progress) => {
            progressCalled = true;
            expect(progress).toBe("progress");
            throw new Error("Test error");
        }).catch((error) => {
            if (error.message === "Test error") {
                threw = true;
            }
        });

        expect(progressCalled).toBe(true);
        expect(threw).toBe(true);
    });
});