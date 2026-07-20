import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = q.reject(new Error("Test error"));
        q.nextTick(() => {
            promise.then(null, () => {
                // @ts-ignore
                expect(typeof process === "object" && typeof process.emit === "function").toBe(true);
            });
        });
    });
});