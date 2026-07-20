import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should throw an error if fileNameAndLineNumber is falsy", () => {
        // Create a mock implementation of getFileNameAndLineNumber that returns falsy
        const originalGetFileNameAndLineNumber = (global as any).getFileNameAndLineNumber;
        (global as any).getFileNameAndLineNumber = () => null;

        // Check if an error is thrown when captureLine is called
        expect(() => (Q as any).captureLine()).toThrowError();

        // Restore the original implementation
        (global as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});