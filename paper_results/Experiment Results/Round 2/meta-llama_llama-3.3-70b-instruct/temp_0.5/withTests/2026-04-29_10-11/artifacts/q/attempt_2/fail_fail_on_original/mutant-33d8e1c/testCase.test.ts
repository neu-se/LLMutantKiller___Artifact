import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then", () => {
    it("should call the progress listener with the correct value", () => {
        const deferred = Q.defer();
        const progressValues = [];

        const promise = deferred.promise.then(
            () => {},
            () => {},
            (value) => {
                progressValues.push(value);
            }
        );

        deferred.notify(1);
        deferred.notify(2);
        deferred.resolve();

        return promise.then(() => {
            expect(progressValues).toEqual([1, 2]);
        });
    });
});