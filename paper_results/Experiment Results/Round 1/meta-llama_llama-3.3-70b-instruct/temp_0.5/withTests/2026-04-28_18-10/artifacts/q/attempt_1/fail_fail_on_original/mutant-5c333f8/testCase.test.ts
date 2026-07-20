import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("isInternalFrame", () => {
    it("should return false for non-internal frames", () => {
        const stackLine = "at someFunction (someFile.js:1:2)";
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });

    it("should return true for internal frames", () => {
        const stackLine = "at Q.nextTick (q.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(true);
    });
});