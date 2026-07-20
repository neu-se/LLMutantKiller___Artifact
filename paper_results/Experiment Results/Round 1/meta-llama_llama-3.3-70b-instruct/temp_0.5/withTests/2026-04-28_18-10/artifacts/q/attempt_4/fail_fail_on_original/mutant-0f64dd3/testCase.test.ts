import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function", () => {
    it("should throw an error when fileNameAndLineNumber is falsy in the mutated code", () => {
        const captureLine = () => {
            try {
                throw new Error();
            } catch (e) {
                const lines = e.stack.split("\n");
                const firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                const fileNameAndLineNumber = Q.getFileNameAndLineNumber(firstLine);
                if (fileNameAndLineNumber) {
                    return;
                } else {
                    throw new Error("fileNameAndLineNumber is falsy");
                }
            }
        };

        expect(() => captureLine()).toThrowError("fileNameAndLineNumber is falsy");
    });
});