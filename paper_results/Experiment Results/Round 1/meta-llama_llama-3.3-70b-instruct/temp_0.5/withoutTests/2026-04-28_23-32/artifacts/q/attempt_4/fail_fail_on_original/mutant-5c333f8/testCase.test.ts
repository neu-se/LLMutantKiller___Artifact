import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle stack traces correctly", () => {
        const error = new Error();
        const stack = error.stack;

        function testFunction() {
            throw error;
        }

        try {
            testFunction();
        } catch (e) {
            const lines = e.stack.split("\n");
            const firstLine = lines[0];
            const fileNameAndLineNumber = firstLine.match(/at (.+):(\d+):(\d+)/);
            if (fileNameAndLineNumber) {
                const lineNumber = parseInt(fileNameAndLineNumber[2]);
                expect(lineNumber).toBeGreaterThan(0);
            } else {
                throw new Error("Failed to parse line number from stack trace");
            }
        }
    });
});