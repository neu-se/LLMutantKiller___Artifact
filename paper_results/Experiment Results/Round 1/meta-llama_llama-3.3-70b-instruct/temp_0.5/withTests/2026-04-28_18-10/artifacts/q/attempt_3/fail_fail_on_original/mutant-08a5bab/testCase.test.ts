import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should return false when the condition is always true", () => {
        const stackLine = "at foo (bar.js:123:45)";
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = () => true;
        expect(Q.isInternalFrame(stackLine)).toBe(true);
        Q.isInternalFrame = originalIsInternalFrame;
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });
});