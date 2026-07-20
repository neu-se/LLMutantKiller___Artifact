import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isNodeFrame", () => {
        const stackLine = "some other line";
        expect(Q.isNodeFrame(stackLine)).toBe(false);
    });
});