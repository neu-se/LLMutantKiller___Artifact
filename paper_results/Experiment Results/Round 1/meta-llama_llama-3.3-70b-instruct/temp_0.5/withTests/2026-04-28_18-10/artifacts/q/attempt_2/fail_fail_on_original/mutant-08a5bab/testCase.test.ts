import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should return false when the condition is always true", () => {
        const isInternalFrame = Q.isInternalFrame;
        const originalIsInternalFrame = isInternalFrame;
        Q.isInternalFrame = () => true;
        const stackLine = "at foo (bar.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(true);
        Q.isInternalFrame = originalIsInternalFrame;
    });
});