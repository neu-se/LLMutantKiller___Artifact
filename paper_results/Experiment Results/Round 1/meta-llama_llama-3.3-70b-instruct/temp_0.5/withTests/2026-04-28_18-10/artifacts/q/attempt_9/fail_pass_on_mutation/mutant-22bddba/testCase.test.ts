import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle window and self correctly", () => {
        if (typeof window !== "undefined") {
            expect(typeof window).toBe("object");
            expect(typeof Q).toBe("function");
        } else if (typeof globalThis !== "undefined") {
            expect(typeof globalThis).toBe("object");
            expect(typeof Q).toBe("function");
        } else {
            expect(true).toBe(false); // This should not happen
        }
    });
});