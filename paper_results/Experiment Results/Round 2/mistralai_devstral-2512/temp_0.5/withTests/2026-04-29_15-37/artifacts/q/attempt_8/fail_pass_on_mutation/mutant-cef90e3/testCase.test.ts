import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should handle promise resolution with multiple then callbacks", async () => {
        const deferred = Q.defer();
        const results = [];

        deferred.promise.then(value => {
            results.push(`first:${value}`);
            return value + 1;
        });

        deferred.promise.then(value => {
            results.push(`second:${value}`);
            return value + 2;
        });

        deferred.resolve(10);

        await Q.delay(10);
        expect(results).toEqual(["first:10", "second:10"]);
    });
});