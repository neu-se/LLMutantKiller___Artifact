import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isNodeFrame", () => {
        const originalIsNodeFrame = Q.isNodeFrame;
        Q.isNodeFrame = () => true;
        const stackLine = "(node.js:1234)";
        expect(Q.isNodeFrame(stackLine)).toBe(true);
        Q.isNodeFrame = originalIsNodeFrame;
    });
});