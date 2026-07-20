describe("getFileNameAndLineNumber", () => {
    it("should return a value when attempt1 is truthy", () => {
        const stackLine = "at functionName (filename:10:20)";
        const originalGetFileNameAndLineNumber = getFileNameAndLineNumber;
        function getFileNameAndLineNumber(stackLine) {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return null;
        };
        const resultOriginal = getFileNameAndLineNumber(stackLine);
        function getFileNameAndLineNumber(stackLine) {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                // do nothing
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return null;
        };
        const resultMutated = getFileNameAndLineNumber(stackLine);
        expect(resultOriginal).not.toBeUndefined();
        expect(resultOriginal[0]).toBe("filename");
        expect(resultOriginal[1]).toBe(10);
        expect(resultMutated).toBeNull();
        getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});