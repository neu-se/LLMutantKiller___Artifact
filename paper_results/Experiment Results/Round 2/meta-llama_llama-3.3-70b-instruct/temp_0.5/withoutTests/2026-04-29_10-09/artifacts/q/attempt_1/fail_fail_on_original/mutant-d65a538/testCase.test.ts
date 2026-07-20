import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when qFileName is not set', () => {
        // Mock the hasStacks variable to true
        (Q as any).hasStacks = true;
        
        // Mock the getFileNameAndLineNumber function to return null
        const originalGetFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
        (Q as any).getFileNameAndLineNumber = () => null;
        
        // Expect an error to be thrown when captureLine is called
        expect(() => (Q as any).captureLine()).toThrowError("This environment was not anticipated by Q. Please file a bug.");
        
        // Restore the original getFileNameAndLineNumber function
        (Q as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});