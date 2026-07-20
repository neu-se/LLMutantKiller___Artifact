import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
    it("should handle exactly two arguments correctly", () => {
        const deferred = defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, "value1", "value2");
        return deferred.promise.then((result) => {
            expect(result).toEqual(["value1", "value2"]);
        });
    });
});