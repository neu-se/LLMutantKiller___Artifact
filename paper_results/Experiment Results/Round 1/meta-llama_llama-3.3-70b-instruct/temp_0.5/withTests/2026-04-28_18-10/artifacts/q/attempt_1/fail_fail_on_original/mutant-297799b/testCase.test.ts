import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
    it("should return false for a non-internal frame", () => {
        const stackLine = "at myFunction (myFile.js:10:20)";
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });

    it("should return true for an internal frame", () => {
        const stackLine = "at Q.nextTick (q.js:123:45)";
        expect(Q.isInternalFrame(stackLine)).toBe(true);
    });
});