describe('captureLine function', () => {
    it('should return true when condition is falsy', () => {
        const captureLine = (condition: boolean) => {
            if (!condition) {
                return true;
            }
            return false;
        };
        expect(captureLine(false)).toBe(true);
    });
    it('should return false when condition is truthy', () => {
        const captureLine = (condition: boolean) => {
            if (!condition) {
                return true;
            }
            return false;
        };
        expect(captureLine(true)).toBe(false);
    });
});