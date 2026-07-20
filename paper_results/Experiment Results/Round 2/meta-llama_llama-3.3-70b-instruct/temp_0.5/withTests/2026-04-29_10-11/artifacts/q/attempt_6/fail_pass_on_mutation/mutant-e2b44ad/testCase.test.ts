import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should check if process is an object", () => {
        if (typeof process === "object" && process !== null) {
            expect(true).toBe(true);
        } else {
            expect(false).toBe(true);
        }
    });
});