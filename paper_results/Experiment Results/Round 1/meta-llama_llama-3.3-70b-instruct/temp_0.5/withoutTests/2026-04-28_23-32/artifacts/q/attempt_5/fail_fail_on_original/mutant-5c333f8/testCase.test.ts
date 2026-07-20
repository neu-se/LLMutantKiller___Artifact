import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle stack traces correctly", () => {
        const error: Error = new Error();
        const stack: string = error.stack;

        function testFunction() {
            throw error;
        }

        try {
            testFunction();
        } catch (e: unknown) {
            if (e instanceof Error) {
                const lines: string[] = e.stack!.split("\n");
                const firstLine: string = lines[0];
                const fileNameAndLineNumber = firstLine.match(/at (.+):(\d+):(\d+)/);
                if (fileNameAndLineNumber) {
                    const lineNumber: number = parseInt(fileNameAndLineNumber[2]);
                    expect(lineNumber).toBeGreaterThan(0);
                } else {
                    expect(true).toBe(false); // If we can't parse the line number, fail the test
                }
            } else {
                expect(true).toBe(false); // If e is not an instance of Error, fail the test
            }
        }
    });
});