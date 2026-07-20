import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
    it("should handle exactly two arguments by resolving with single value", () => {
        const deferred = defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, "value");
        return deferred.promise.then((result) => {
            expect(result).toBe("value");
        });
    });
});