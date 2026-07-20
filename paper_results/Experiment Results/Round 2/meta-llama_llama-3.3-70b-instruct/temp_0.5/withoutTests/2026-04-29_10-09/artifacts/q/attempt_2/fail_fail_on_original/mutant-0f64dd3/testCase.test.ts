import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should capture the file name and line number correctly', () => {
        try {
            throw new Error();
        } catch (e) {
            var lines = e.stack.split("\n");
            var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
            var fileNameAndLineNumber = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(firstLine);
            expect(fileNameAndLineNumber).not.toBeNull();
            var q = Q(function(resolve) {
                resolve();
            });
            expect(q.inspect().state).toBe('pending');
            q.then(function() {
                throw new Error();
            });
            expect(q.inspect().state).toBe('rejected');
        }
    });
});