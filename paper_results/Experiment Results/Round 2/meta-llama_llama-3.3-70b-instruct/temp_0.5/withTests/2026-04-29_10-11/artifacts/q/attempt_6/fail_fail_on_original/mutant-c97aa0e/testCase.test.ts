import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should return a promise that is fulfilled when any of the promises is fulfilled", () => {
        const promise1 = Q.delay(100).then(() => "Promise 1");
        const promise2 = Q.delay(50).then(() => "Promise 2");
        const promise3 = Q.delay(200).then(() => "Promise 3");

        return Q.any([promise1, promise2, promise3]).then((value: any) => {
            expect(value).toBe("Promise 2");
        });
    });

    it("should throw an error when the any function is not implemented", () => {
        const originalAny = Q.any;
        Q.any = () => {};
        expect(() => Q.any([Q.delay(100).then(() => "Promise 1")])).toThrowError();
        Q.any = originalAny;
    });
});