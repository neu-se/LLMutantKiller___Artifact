import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should reject a promise when the deferred object is already resolved", () => {
        const deferred = Q.defer();
        deferred.resolve("resolved value");
        expect(() => deferred.resolve("another value")).not.toThrow();
        expect(deferred.promise.inspect().state).toBe("fulfilled");
        expect(deferred.promise.inspect().value).toBe("resolved value");
    });
});