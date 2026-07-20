import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when fileNameAndLineNumber is falsy", () => {
        // Mock the getFileNameAndLineNumber function to return falsy values
        const originalGetFileNameAndLineNumber = (global as any).getFileNameAndLineNumber;
        (global as any).getFileNameAndLineNumber = () => null;

        // Test that an error is thrown when fileNameAndLineNumber is falsy
        expect(() => {
            // Call the captureLine function to test the behavior
            (global as any).captureLine();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original getFileNameAndLineNumber function
        (global as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});