import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const promise = Q.reject(new Error("Test error"));

        if (typeof process === "" && typeof process.emit === "function") {
            throw new Error("This should not be reached");
        }
    });
});