import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames", () => {
        const error = new Error("Test error");
        const stackLine = "    at isInternalFrame (q.js:1234:12)";
        const fileNameAndLineNumber = q.getFileNameAndLineNumber(stackLine);
        expect(fileNameAndLineNumber[0]).toBeDefined();
        expect(fileNameAndLineNumber[1]).toBeDefined();
        expect(q.isInternalFrame(stackLine)).toBe(true);
    });
});