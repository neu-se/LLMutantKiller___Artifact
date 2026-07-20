import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it("should be the identity when given promise", () => {
        const f = Q.fulfill(5);
        const r = Q.reject(new Error("aaargh"));
        const p = Q.promise(() => {});

        expect(Q(f)).toBe(f);
        expect(Q(r)).toBe(r);
        expect(Q(p)).toBe(p);
    });

    it("should handle progress notifications", () => {
        const deferred = Q.defer();
        const progressValues = [];

        const promise = Q.when(
            deferred.promise,
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