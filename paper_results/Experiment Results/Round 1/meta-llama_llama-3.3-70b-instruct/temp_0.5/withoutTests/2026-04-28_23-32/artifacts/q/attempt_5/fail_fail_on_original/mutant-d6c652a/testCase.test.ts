describe('Q', () => {
    it('should return undefined when hasStacks is false and captureLine is called', () => {
        const originalHasStacks = (global as any).hasStacks;
        (global as any).hasStacks = false;
        const result = (function () {
            try {
                throw new Error();
            } catch (e) {
                var lines = e.stack.split("\n");
                var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
                if (!fileNameAndLineNumber) {
                    return;
                }

                return fileNameAndLineNumber[1];
            }
        })();
        expect(result).toBeUndefined();
        (global as any).hasStacks = originalHasStacks;
    });
});