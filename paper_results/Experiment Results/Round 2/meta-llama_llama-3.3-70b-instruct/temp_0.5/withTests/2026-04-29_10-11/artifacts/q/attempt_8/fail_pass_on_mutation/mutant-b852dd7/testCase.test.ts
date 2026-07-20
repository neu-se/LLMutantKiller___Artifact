import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = q.reject(new Error("Test error"));
        const errorSpy = jest.fn();
        // @ts-ignore
        q.onerror = errorSpy;
        q.nextTick(() => {
            promise.then(null, () => {
                // @ts-ignore
                expect(q.onerror).toHaveBeenCalledTimes(0);
            });
        });
    });
});