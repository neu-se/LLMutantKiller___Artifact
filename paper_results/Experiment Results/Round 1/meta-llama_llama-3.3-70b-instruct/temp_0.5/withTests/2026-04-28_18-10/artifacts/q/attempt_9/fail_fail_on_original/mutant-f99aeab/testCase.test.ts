describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        let qFileName;
        try {
            throw new Error();
        } catch (e: any) {
            const lines = e.stack.split("\n");
            const firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
            const fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
            if (!fileNameAndLineNumber) {
                return;
            }
            qFileName = fileNameAndLineNumber[0];
        }
        expect(qFileName).toBeUndefined();
    });
});

function getFileNameAndLineNumber(stackLine: string) {
    const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
    return false;
}