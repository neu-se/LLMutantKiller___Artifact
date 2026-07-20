import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
    it("should handle multiple arguments correctly", () => {
        const deferred = defer();
        const resolver = deferred.makeNodeResolver();

        // Call with error (first argument) and multiple values (second and third arguments)
        const error = new Error("test error");
        resolver(error, "value1", "value2");

        return deferred.promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (rejectedError) => {
                expect(rejectedError).toBe(error);
            }
        );
    });
});