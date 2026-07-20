import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle window and self correctly", () => {
        const global = typeof window !== "undefined" ? window : self;
        if (typeof global !== "undefined") {
            expect(typeof global.Q).toBe("function");
        } else {
            expect(true).toBe(false); // This should not happen
        }
    });
});