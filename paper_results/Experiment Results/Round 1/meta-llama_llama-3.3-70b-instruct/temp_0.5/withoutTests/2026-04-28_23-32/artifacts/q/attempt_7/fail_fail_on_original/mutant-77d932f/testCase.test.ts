import * as q from '../q';

describe('q', () => {
    it('should correctly handle getFileNameAndLineNumber function', () => {
        const stackLine = 'at Q (filename:123:456)';
        const getFileNameAndLineNumber = q.getFileNameAndLineNumber;
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
    });
});