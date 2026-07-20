import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should handle progress notifications correctly", () => {
        const promise = Q((resolve, reject, notify) => {
            notify("progress");
            resolve("resolved");
        });

        let progressCalled = false;
        let thenCalled = false;

        promise.then((value) => {
            thenCalled = true;
            expect(value).toBe("resolved");
        }, (error) => {
            throw error;
        }, (progress) => {
            progressCalled = true;
            expect(progress).toBe("progress");
        });

        expect(progressCalled).toBe(true);
        expect(thenCalled).toBe(true);
    });
});