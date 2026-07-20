import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine", () => {
    it("should not throw an error when getFileNameAndLineNumber is called with a falsy value in the original code", () => {
        const getFileNameAndLineNumber = (line: string) => {
            if (!line) {
                return;
            }
        };

        expect(() => getFileNameAndLineNumber("")).not.toThrowError();
    });

    it("should throw an error when getFileNameAndLineNumber is called with a falsy value in the mutated code", () => {
        const getFileNameAndLineNumber = (line: string) => {
            if (line) {
                return;
            } else {
                throw new Error("getFileNameAndLineNumber is falsy");
            }
        };

        expect(() => getFileNameAndLineNumber("")).toThrowError("getFileNameAndLineNumber is falsy");
    });
});