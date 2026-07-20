import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const captureLine = () => {
            try {
                throw new Error();
            } catch (e) {
                const lines = e.stack.split("\n");
                const firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                const fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
                if (!fileNameAndLineNumber) {
                    return;
                }
                return fileNameAndLineNumber[1];
            }
        };

        const getFileNameAndLineNumber = (stackLine) => {
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
        };

        expect(captureLine()).not.toBeUndefined();
    });
});