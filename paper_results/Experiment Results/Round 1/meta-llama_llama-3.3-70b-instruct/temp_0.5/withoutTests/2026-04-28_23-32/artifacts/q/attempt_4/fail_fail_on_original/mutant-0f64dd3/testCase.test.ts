describe('captureLine function', () => {
    it('should return a line number', () => {
        const captureLine = () => {
            try {
                throw new Error();
            } catch (e: any) {
                const lines = e.stack?.split("\n");
                const firstLine = lines?.[0];
                const fileNameAndLineNumber = /at (.+):(\d+):(\d+)/.exec(firstLine);
                if (fileNameAndLineNumber) {
                    return true;
                }
                return false;
            }
        };
        expect(captureLine()).toBe(true);
    });
});