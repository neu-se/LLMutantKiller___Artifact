import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should include all calling functions when long stack support is enabled", () => {
        // Enable long stack traces
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
                    reject(new Error("test error"));
                }, 0);
            });
        }

        return func1()
            .catch((err) => {
                // The stack should contain all three functions
                expect(err.stack).toMatch(/func3(.|\n)*func2(.|\n)*func1/);
            });
    });
});