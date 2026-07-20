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
            const lastLine = lines[lines.length - 1];
            const expectedLine = "at testFunction";

            expect(lastLine).toContain(expectedLine);
        }
    });
});