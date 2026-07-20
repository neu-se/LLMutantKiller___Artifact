import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should resolve a promise when the input is already resolved", () => {
        const input = Q.resolve("test");
        const deferred = Q.defer();
        input.then((value) => {
            deferred.resolve(value);
        });
        return deferred.promise.then((value) => {
            expect(value).toBe("test");
        });
    });
});