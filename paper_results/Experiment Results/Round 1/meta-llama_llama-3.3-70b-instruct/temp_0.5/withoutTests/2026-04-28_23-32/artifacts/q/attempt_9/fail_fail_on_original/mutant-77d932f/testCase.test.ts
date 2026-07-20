describe('q', () => {
    it('should correctly handle getFileNameAndLineNumber function', () => {
        const stackLine = 'at Q (filename:123:456)';
        const getFileNameAndLineNumber = (global as any).getFileNameAndLineNumber;
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(['filename', 123]);
    });
});