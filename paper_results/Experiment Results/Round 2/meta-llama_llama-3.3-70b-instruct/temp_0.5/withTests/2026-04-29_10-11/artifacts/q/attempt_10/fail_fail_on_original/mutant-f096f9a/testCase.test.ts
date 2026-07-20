import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should return a promise that resolves to the first fulfilled value", () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.defer().promise;

        Q.delay(10).then(() => {
            promise1.resolve("Fulfilled 1");
        });
        Q.delay(20).then(() => {
            promise2.resolve("Fulfilled 2");
        });

        return Q.any([promise1, promise2]).then((value: any) => {
            expect(value).toBe("Fulfilled 1");
        });
    });
});