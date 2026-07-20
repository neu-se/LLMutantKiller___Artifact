describe('Q', () => {
    it('should set qFileName when getFileNameAndLineNumber returns a value', () => {
        const q = require('../../../../../../../../../subject_repositories/q/q.js');
        const originalGetFileNameAndLineNumber = (function () {
            try {
                throw new Error();
            } catch (e) {
                var lines = e.stack.split("\n");
                var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
                return fileNameAndLineNumber;
            }
            function getFileNameAndLineNumber(stackLine) {
                return ['someFile.js', 10];
            }
        })();
        q();
        expect((q as any).qFileName).toBe('someFile.js');
    });
});