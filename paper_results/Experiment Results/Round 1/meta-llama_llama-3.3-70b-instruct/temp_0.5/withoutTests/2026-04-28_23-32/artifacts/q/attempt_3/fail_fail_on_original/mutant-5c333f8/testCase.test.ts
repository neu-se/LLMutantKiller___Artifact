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
            const fileNameAndLineNumber = Q.getFileNameAndLineNumber(firstLine);
            const lineNumber = fileNameAndLineNumber[1];

            expect(lineNumber).toBeGreaterThan(0);
        }
    });
});