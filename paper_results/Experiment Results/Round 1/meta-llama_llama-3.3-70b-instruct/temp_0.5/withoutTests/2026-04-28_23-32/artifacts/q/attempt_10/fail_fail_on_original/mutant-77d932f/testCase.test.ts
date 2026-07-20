describe('q', () => {
    it('should correctly handle getFileNameAndLineNumber function', () => {
        const stackLine = 'at Q (filename:123:456)';
        const q = require('./q');
        const getFileNameAndLineNumber = q.getFileNameAndLineNumber;
        expect(getFileNameAndLineNumber).toBeInstanceOf(Function);
    });
});