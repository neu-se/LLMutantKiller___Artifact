import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should handle progress notifications correctly", () => {
        const promise = Q((resolve, reject, notify) => {
            notify("progress");
            resolve("resolved");
        });

        promise.then((value) => {
            expect(value).toBe("resolved");
        }, (error) => {
            throw error;
        }, (progress) => {
            expect(progress).toBe("progress");
        });
    });
});