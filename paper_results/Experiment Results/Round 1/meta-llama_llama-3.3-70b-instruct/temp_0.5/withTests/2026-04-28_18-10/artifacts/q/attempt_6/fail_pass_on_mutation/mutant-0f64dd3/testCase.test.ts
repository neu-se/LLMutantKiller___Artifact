import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should not throw an error when trying to get the file name and line number", () => {
        try {
            throw new Error();
        } catch (e) {
            const lines = e.stack.split("\n");
            const firstLine = lines[0].indexOf("@") > 0? lines[1] : lines[2];
            const fileNameAndLineNumber = firstLine.match(/at.* \((.*):(\d+):(\d+)\)/);
            if (!fileNameAndLineNumber) {
                throw new Error("Could not get file name and line number");
            }
        }
    });
});