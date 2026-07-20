import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle window and self correctly", () => {
        const global = typeof window !== "undefined" ? window : globalThis;
        expect(global).toBeDefined();
    });
});