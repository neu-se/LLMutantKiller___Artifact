import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at isInternalFrame (q.js:123)\n    at filterStackString (q.js:456)";
        const filteredStack = Q.filterStackString(error.stack);
        expect(filteredStack).not.toContain("isInternalFrame");
        expect(filteredStack).not.toContain("filterStackString");
    });
});