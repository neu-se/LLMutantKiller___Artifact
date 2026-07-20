import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        // Create a new promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Make sure the promise is rejected
        promise.then(() => {
            throw new Error("Promise was not rejected");
        }, (error) => {
            const stackLines = error.stack.split("\n");
            const internalFrameFound = stackLines.some((line) => {
                const fileNameAndLineNumber = Q.getFileNameAndLineNumber(line);
                if (fileNameAndLineNumber) {
                    const fileName = fileNameAndLineNumber[0];
                    const lineNumber = fileNameAndLineNumber[1];
                    return fileName === Q.qFileName && lineNumber <= Q.qEndingLine;
                }
                return false;
            });
            expect(internalFrameFound).toBe(false);
        });
    });
});