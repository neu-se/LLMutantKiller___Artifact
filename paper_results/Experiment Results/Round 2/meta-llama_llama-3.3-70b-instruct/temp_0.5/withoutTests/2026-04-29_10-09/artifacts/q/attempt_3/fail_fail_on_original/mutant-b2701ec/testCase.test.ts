import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect).toBeDefined();
        expect(typeof promise.inspect).toBe('function');
    });
});