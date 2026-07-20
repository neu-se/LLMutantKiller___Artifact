import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = q.reject(new Error("Test error"));
        const errorSpy = jest.fn();
        q.onerror = errorSpy;
        return q.nextTick.runAfter(() => {
            promise.then(null, null);
        }).then(() => {
            expect(errorSpy).toHaveBeenCalledTimes(1);
        });
    });
});