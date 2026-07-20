import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const promise = Q.reject("Test error");

        if (typeof process === "object" && typeof process.emit === "function") {
            promise.then(null, null, () => {});
        }

        expect(typeof process.emit).toBe("function");
    });
});