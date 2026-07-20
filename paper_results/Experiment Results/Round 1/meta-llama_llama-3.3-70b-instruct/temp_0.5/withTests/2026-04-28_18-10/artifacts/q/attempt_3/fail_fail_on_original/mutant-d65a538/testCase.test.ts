import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should capture the line number correctly and not return undefined", () => {
        // Spy on the getFileNameAndLineNumber function to return a falsy value
        const originalGetFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
        (Q as any).getFileNameAndLineNumber = () => [null, null];

        // Check if captureLine returns a number
        const lineNumber = (Q as any).captureLine();
        expect(lineNumber).not.toBeUndefined();
        expect(typeof lineNumber).toBe('number');

        // Restore the original implementation
        (Q as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});