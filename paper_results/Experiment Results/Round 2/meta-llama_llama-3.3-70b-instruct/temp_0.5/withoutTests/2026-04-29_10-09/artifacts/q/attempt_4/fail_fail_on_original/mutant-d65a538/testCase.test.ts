import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not return undefined for qFileName when getFileNameAndLineNumber returns a value', () => {
        // Mock the getFileNameAndLineNumber function to return a value
        const originalGetFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
        (Q as any).getFileNameAndLineNumber = () => ['someFile.js', 10];
        
        // Call the captureLine function
        (Q as any).captureLine();
        
        // Expect qFileName to be set correctly
        expect((Q as any).qFileName).not.toBeUndefined();
        
        // Restore the original getFileNameAndLineNumber function
        (Q as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});