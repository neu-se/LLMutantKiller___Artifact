import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should inspect a pending promise correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        expect(promise.inspect().state).toBe("pending");

        deferred.resolve("resolved value");

        return promise.then((value) => {
            expect(value).toBe("resolved value");
        });
    });
});