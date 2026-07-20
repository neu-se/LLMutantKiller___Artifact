describe('captureLine function', () => {
    it('should return true when fileNameAndLineNumber is falsy', () => {
        const captureLine = (fileNameAndLineNumber: any) => {
            if (!fileNameAndLineNumber) {
                return true;
            }
            return false;
        };
        expect(captureLine(null)).toBe(true);
    });
});