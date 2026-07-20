// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should include calling functions in stack trace when longStackSupport is enabled", async () => {
        // Enable long stack support
        Q.longStackSupport = true;

        function func1() {
            return Q().then(() => func2());
        }

        function func2() {
            return new Q.Promise((resolve, reject) => {
                func3().then(resolve, reject);
            });
        }

        function func3() {
            return new Q.Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Test error"));
                }, 0);
            });
        }

        try {
            await func1();
            fail("Expected promise to reject");
        } catch (err: any) {
            // Check if the stack trace includes all calling functions
            expect(err.stack).toMatch(/func3(.|\n)*func2(.|\n)*func1/);
        }
    });
});