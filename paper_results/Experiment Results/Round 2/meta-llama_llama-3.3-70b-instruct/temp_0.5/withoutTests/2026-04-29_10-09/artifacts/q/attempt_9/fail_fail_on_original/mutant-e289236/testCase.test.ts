import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should check if messages are processed correctly when the deferred object is resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const value = "test value";
        deferred.resolve(value);
        const messages = [];
        deferred.promiseDispatch(function(resolve, op, args) {
            messages.push(args);
        }, "when", [function (exception) {
            return exception;
        }, function (value) {
            return value;
        }]);
        expect(messages.length).toBe(0);
    });
});