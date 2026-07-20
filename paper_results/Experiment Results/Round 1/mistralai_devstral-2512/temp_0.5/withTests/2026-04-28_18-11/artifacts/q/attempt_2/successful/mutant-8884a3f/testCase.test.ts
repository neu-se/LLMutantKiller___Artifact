import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should include all calling functions when long stack support is enabled", () => {
        // Enable long stack traces
        (Q as any).longStackSupport = true;

        function func1(): Q.Promise<any> {
            return Q().then(() => func2());
        }

        function func2(): Q.Promise<any> {
            return Q.Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
                func3().then(resolve, reject);
            });
        }

        function func3(): Q.Promise<any> {
            return Q.Promise((resolve: (value?: any) => void, reject: (reason?: any) => void) => {
                setTimeout(() => {
                    reject(new Error("test error"));
                }, 0);
            });
        }

        return func1()
            .catch((err: Error) => {
                // The stack should contain all three functions
                expect(err.stack).toMatch(/func3(.|\n)*func2(.|\n)*func1/);
            });
    });
});