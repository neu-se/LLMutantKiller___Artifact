// Test case to detect the mutation in Q.mapply
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.mapply mutation test", () => {
    it("should correctly dispatch 'post' operation with method name and args", (done) => {
        const testObject = {
            testMethod: function(arg1: string, arg2: string) {
                return arg1 + " " + arg2;
            }
        };

        const promise = Q(testObject);
        const resultPromise = promise.mapply("testMethod", ["Hello", "World"]);

        resultPromise.then((result: unknown) => {
            expect(result).toBe("Hello World");
            done();
        }).catch((error: unknown) => {
            done(error);
        });
    });
});