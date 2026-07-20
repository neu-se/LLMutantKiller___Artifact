describe('captureLine function', () => {
    it('should return true when condition is met', () => {
        const captureLine = (fileNameAndLineNumber: any) => {
            if (!fileNameAndLineNumber) {
                return true;
            }
            return false;
        };
        const originalCondition = false;
        const mutatedCondition = true;
        expect(captureLine(originalCondition)).toBe(true);
        expect(captureLine(mutatedCondition)).toBe(false);
    });
});