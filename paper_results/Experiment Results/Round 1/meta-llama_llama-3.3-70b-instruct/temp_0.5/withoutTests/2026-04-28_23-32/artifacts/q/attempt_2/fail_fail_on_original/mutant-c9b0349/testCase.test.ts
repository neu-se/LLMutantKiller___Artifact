import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.stack;
        const lines = stack.split("\n");
        const isInternalFrame = (line: string) => {
            const fileNameAndLineNumber = getFileNameAndLineNumber(line);
            if (!fileNameAndLineNumber) {
                return false;
            }
            const lineNumber = fileNameAndLineNumber[1];
            return lineNumber >= qStartingLine && lineNumber <= qEndingLine;
        };
        const internalFrames = lines.filter(isInternalFrame);
        expect(internalFrames.length).toBeLessThan(lines.length);
    });
});