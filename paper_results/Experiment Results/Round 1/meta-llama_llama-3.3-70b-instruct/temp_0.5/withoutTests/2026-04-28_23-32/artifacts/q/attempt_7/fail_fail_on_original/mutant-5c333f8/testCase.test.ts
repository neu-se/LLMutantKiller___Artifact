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
        } catch (e: any) {
            const originalStack = e.stack;
            const filteredStack = Q.filterStackString(originalStack);
            expect(filteredStack).toBe(originalStack);
        }
    });
});