import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should resolve promise correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        deferred.resolve("resolved value");

        return promise.then((value) => {
            expect(value).toBe("resolved value");
        });
    });
});