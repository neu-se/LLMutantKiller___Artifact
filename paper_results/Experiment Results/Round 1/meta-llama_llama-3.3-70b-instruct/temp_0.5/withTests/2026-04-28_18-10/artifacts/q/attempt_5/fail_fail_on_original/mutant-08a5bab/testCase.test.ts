import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should correctly identify internal frames", () => {
        const stackLine = "at Q.filterStackString (q.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(true);
    });

    it("should correctly identify non-internal frames", () => {
        const stackLine = "at foo (bar.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });
});