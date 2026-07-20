import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
    it("should handle exactly 3 arguments correctly", () => {
        const deferred = defer();
        const resolver = deferred.makeNodeResolver();

        // Call with null error and exactly 3 arguments (including the error)
        resolver(null, "value1", "value2", "value3");

        return deferred.promise.then(
            (values) => {
                // In original code, this should resolve with all arguments after error
                // In mutated code, it will incorrectly resolve with just the first value
                expect(values).toEqual(["value1", "value2", "value3"]);
            },
            () => {
                throw new Error("Promise should have been fulfilled");
            }
        );
    });
});