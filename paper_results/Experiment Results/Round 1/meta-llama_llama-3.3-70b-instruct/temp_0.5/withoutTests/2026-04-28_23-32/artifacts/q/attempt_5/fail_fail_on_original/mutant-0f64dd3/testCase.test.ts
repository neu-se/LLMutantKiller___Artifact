describe('Q', () => {
    it('should capture line number correctly', () => {
        const originalCode = () => {
            try {
                throw new Error();
            } catch (e: any) {
                if (!e.stack) {
                    return false;
                }
                const lines = e.stack.split("\n");
                const firstLine = lines[0];
                const fileNameAndLineNumber = /at (.+):(\d+):(\d+)/.exec(firstLine);
                if (!fileNameAndLineNumber) {
                    return false;
                }
                return true;
            }
        };

        const mutatedCode = () => {
            try {
                throw new Error();
            } catch (e: any) {
                if (!e.stack) {
                    return true;
                }
                const lines = e.stack.split("\n");
                const firstLine = lines[0];
                const fileNameAndLineNumber = /at (.+):(\d+):(\d+)/.exec(firstLine);
                if (fileNameAndLineNumber) {
                    return false;
                }
                return true;
            }
        };

        expect(originalCode()).toBe(true);
        expect(mutatedCode()).toBe(false);
    });
});