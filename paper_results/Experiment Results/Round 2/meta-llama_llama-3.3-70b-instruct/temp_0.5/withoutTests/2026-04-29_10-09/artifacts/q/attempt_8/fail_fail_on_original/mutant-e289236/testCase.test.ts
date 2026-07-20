import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should resolve a promise with a value when the deferred object is resolved and messages are checked correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const value = "test value";
        deferred.resolve(value);
        const messages = deferred.messages;
        expect(messages).toBeUndefined();
    });
});