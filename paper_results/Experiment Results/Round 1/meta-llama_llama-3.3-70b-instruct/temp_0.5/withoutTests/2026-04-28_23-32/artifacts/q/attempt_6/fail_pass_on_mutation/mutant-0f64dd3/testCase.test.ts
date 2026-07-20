describe('captureLine function', () => {
    it('should return false when fileNameAndLineNumber is truthy', () => {
        const captureLine = (fileNameAndLineNumber: any) => {
            if (fileNameAndLineNumber) {
                return false;
            }
            return true;
        };
        expect(captureLine({})).toBe(false);
    });
});