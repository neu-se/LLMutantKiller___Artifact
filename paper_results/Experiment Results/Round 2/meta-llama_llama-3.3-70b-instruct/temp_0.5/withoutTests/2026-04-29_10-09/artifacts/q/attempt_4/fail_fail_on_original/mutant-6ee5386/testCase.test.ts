import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should handle progress notifications correctly", () => {
        let threw = false;

        const promise = Q((resolve, reject, notify) => {
            notify("progress");
            resolve("resolved");
        });

        promise.then((value) => {
            expect(value).toBe("resolved");
        }, (error) => {
            throw error;
        }, (progress) => {
            throw new Error("Test error");
        }).catch((error) => {
            threw = true;
            expect(error.message).toBe("Test error");
        });

        expect(threw).toBe(true);
    });
});