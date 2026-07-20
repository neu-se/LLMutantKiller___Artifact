import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should not throw an error when fileNameAndLineNumber is truthy", () => {
        const error = new Error();
        const lines = error.stack.split("\n");
        const firstLine = lines[0].indexOf("@") > 0? lines[1] : lines[2];
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(firstLine);
        if (fileNameAndLineNumber) {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});