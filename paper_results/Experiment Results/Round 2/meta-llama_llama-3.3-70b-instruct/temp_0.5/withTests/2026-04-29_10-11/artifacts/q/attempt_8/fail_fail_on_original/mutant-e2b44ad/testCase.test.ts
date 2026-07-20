import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should check if process is an object in a specific condition", () => {
        if (typeof process === "object" && process && process.domain) {
            expect(true).toBe(true);
        } else {
            expect(false).toBe(true);
        }
    });
});