import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle isInternalFrame", () => {
        const originalIsInternalFrame = Q.isInternalFrame;
        Q.isInternalFrame = jest.fn((line) => {
            return line.includes("isInternalFrame");
        });

        const line = "at isInternalFrame (q.js:123)";
        expect(Q.isInternalFrame(line)).toBe(true);

        Q.isInternalFrame = originalIsInternalFrame;
    });
});