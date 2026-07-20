import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should return true for node internal frames", () => {
        const stackLine = "(module.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(true);
    });

    it("should return false for non-node internal frames", () => {
        const stackLine = "at foo (bar.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });
});