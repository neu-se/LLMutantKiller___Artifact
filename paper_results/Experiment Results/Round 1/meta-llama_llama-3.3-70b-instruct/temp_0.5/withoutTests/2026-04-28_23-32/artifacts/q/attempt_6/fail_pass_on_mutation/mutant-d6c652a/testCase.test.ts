describe('Q', () => {
    it('should return a value when hasStacks is true and captureLine is called', () => {
        const originalHasStacks = (global as any).hasStacks;
        (global as any).hasStacks = true;
        const result = (function () {
            try {
                throw new Error();
            } catch (e) {
                var lines = (e as any).stack.split("\n");
                var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                var fileNameAndLineNumber = (function getFileNameAndLineNumber(stackLine: string) {
                    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
                    // In IE10 function name can have spaces ("Anonymous function") O_o
                    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
                    if (attempt1) {
                        return [attempt1[1], Number(attempt1[2])];
                    }

                    // Anonymous functions: "at filename:lineNumber:columnNumber"
                    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
                    if (attempt2) {
                        return [attempt2[1], Number(attempt2[2])];
                    }

                    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
                    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                    if (attempt3) {
                        return [attempt3[1], Number(attempt3[2])];
                    }
                })(firstLine);
                if (!fileNameAndLineNumber) {
                    return;
                }

                return fileNameAndLineNumber[1];
            }
        })();
        expect(result).not.toBeUndefined();
        (global as any).hasStacks = originalHasStacks;
    });
});