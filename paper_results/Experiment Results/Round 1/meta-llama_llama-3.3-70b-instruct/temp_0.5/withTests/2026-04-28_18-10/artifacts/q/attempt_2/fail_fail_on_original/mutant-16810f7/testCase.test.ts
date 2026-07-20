import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const promise = Q.reject(new Error("Test error"));

        Q.onerror = jest.fn();

        // The mutation should cause this line to fail
        if (typeof process === "object" && typeof process.emit === "function") {
            promise.then(() => {}, () => {}, () => {});
        }

        expect(Q.onerror).toHaveBeenCalledTimes(1);
    });
});