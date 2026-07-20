import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should return a promise that calls the any function", () => {
        const promise1 = Q.delay(100).then(() => "Promise 1");
        const promise2 = Q.delay(50).then(() => "Promise 2");
        const promise3 = Q.delay(200).then(() => "Promise 3");

        const spy = jest.spyOn(Q, 'any');
        Q.any([promise1, promise2, promise3]);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});