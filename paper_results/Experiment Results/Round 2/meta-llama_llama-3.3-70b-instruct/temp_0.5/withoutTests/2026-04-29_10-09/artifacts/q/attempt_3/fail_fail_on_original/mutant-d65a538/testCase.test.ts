import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when qFileName is not set', () => {
        // Mock the getFileNameAndLineNumber function to return null
        const originalGetFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
        (Q as any).getFileNameAndLineNumber = () => null;
        
        // Expect no error to be thrown when captureLine is called
        expect(() => (Q as any).captureLine()).not.toThrow();
        
        // Restore the original getFileNameAndLineNumber function
        (Q as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});