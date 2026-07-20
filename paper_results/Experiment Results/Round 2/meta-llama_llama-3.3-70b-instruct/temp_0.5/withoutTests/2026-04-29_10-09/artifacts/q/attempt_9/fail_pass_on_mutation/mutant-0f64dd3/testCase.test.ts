import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should capture the line number correctly', () => {
        var error;
        try {
            throw new Error();
        } catch (e) {
            error = e;
        }
        var lines = error.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var lineNumber = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(firstLine)[2];
        expect(lineNumber).not.toBeNull();
    });
});