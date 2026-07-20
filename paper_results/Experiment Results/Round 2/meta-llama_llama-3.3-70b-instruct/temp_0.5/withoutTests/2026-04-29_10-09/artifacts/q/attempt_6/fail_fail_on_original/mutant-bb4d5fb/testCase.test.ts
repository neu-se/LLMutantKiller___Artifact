import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        const error = new Error();
        error.stack = `Error
    at isInternalFrame (q.js:123)
    at getFileNameAndLineNumber (q.js:456)
    at filterStackString (q.js:789)`;

        const filteredStack = Q.filterStackString(error.stack);

        expect(filteredStack).not.toContain("isInternalFrame");
        expect(filteredStack).not.toContain("getFileNameAndLineNumber");
        expect(filteredStack).not.toContain("filterStackString");
    });
});