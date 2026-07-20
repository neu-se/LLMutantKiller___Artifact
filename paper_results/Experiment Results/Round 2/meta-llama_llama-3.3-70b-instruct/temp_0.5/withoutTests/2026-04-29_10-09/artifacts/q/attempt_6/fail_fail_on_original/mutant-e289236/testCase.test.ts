import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should resolve a promise with a value when the deferred object is resolved and messages are not present", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const value = "test value";
        deferred.resolve(value);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(value);
        const messages = [];
        deferred.promiseDispatch(function(resolve, op, args) {
            messages.push(args);
        }, "when", [function (exception) {
            return exception;
        }]);
        expect(messages.length).toBe(0);
    });
});