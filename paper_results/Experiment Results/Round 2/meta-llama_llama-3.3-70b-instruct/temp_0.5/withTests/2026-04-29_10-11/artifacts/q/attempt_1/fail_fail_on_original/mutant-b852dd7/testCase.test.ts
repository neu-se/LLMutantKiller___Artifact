import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        const errorSpy = jest.fn();
        Q.onerror = errorSpy;
        return promise.then(null, null).then(() => {
            expect(errorSpy).toHaveBeenCalledTimes(1);
        });
    });
});