import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should fulfill with the first resolved promise", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();

        const promise = Q.any([deferred1.promise, deferred2.promise]);

        Q.delay(50).then(() => {
            deferred1.resolve("Fulfilled 1");
        });
        Q.delay(100).then(() => {
            deferred2.resolve("Fulfilled 2");
        });

        return promise.then((value) => {
            expect(value).toBe("Fulfilled 1");
        });
    });
});