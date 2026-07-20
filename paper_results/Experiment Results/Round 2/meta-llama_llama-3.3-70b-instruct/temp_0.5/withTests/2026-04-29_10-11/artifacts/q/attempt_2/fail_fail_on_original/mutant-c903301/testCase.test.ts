import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should call the progress listener with the notify values", () => {
        const deferred = Q.defer();
        const progressValues = [];
        const promise = Q.when(deferred.promise, null, null, (value) => {
            progressValues.push(value);
        });
        deferred.notify("test");
        deferred.resolve();
        return promise.then(() => {
            expect(progressValues).toEqual(["test"]);
        });
    });
});