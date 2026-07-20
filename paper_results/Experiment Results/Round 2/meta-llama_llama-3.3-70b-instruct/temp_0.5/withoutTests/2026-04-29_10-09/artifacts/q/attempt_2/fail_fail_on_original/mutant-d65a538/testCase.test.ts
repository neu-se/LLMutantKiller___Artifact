import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set qFileName correctly', () => {
        // Call the captureLine function
        const originalCaptureLine = (Q as any).captureLine;
        (Q as any).captureLine = jest.fn();
        
        // Mock the getFileNameAndLineNumber function to return a value
        const originalGetFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
        (Q as any).getFileNameAndLineNumber = () => ['someFile.js', 10];
        
        // Call the original captureLine function to set qFileName
        originalCaptureLine();
        
        // Expect qFileName to be set correctly
        expect((Q as any).qFileName).toBe('someFile.js');
        
        // Restore the original functions
        (Q as any).captureLine = originalCaptureLine;
        (Q as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});