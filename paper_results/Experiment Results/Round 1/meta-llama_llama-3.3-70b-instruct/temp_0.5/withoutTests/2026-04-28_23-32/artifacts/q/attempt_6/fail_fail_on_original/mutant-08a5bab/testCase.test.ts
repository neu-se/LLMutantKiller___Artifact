import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const isInternalFrame = Q.isInternalFrame;
        expect(isInternalFrame).toBeInstanceOf(Function);
        const line = "    at isInternalFrame (q.js:123:45)";
        expect(isInternalFrame(line)).toBe(true);
    });
});