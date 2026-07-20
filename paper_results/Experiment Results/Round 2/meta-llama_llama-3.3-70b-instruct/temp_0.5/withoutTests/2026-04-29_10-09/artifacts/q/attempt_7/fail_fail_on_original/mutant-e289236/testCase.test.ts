import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should not resolve a promise when the deferred object is resolved and messages are present in the mutated code", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const value = "test value";
        const messages = ["message1", "message2"];
        deferred.resolve(value);
        deferred.promiseDispatch(void 0, "when", [void 0, void 0]);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(value);
        if (messages) {
            throw new Error("Messages are present");
        }
    });
});