import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer and makeNodeResolver", () => {
    it("should reject with the first argument if it's truthy", () => {
        const deferred = defer();
        const nodeResolver = deferred.makeNodeResolver();
        nodeResolver("error");
        return deferred.promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBe("error");
        });
    });

    it("should resolve with the second argument if the first argument is falsy", () => {
        const deferred = defer();
        const nodeResolver = deferred.makeNodeResolver();
        nodeResolver(null, "value");
        return deferred.promise.then((value) => {
            expect(value).toBe("value");
        }, () => {
            expect(true).toBe(false);
        });
    });

    it("should resolve with an array of arguments if there are more than two arguments", () => {
        const deferred = defer();
        const nodeResolver = deferred.makeNodeResolver();
        nodeResolver(null, "value1", "value2", "value3");
        return deferred.promise.then((values) => {
            expect(values).toEqual(["value1", "value2", "value3"]);
        }, () => {
            expect(true).toBe(false);
        });
    });
});