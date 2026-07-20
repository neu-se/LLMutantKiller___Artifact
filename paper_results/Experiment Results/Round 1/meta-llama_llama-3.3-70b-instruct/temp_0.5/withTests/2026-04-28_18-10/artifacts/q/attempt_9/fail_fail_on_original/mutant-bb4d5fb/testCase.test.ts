import { Q } from "./q";

describe("Q", () => {
    it("should correctly identify internal frames", () => {
        const isInternalFrame = (line: string) => {
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
            if (fileNameAndLineNumber) {
                const fileName = fileNameAndLineNumber[0];
                const lineNumber = fileNameAndLineNumber[1];
                return fileName === Q.qFileName && lineNumber >= Q.qStartingLine && lineNumber <= Q.qEndingLine;
            }
            return false;
        };

        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split("\n");

        const internalFrames = lines?.filter(isInternalFrame);

        expect(internalFrames?.length).toBeGreaterThan(0);
    });
});