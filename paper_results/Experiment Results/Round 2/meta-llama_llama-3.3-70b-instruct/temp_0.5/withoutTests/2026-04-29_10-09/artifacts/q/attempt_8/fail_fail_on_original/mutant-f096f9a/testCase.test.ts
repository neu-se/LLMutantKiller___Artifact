import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should return a promise that resolves to the first fulfilled promise", () => {
        const promise1 = Q.delay(100).then(() => 1);
        const promise2 = Q.delay(50).then(() => 2);
        const promise3 = Q.reject("Error");
        const promises = [promise1, promise2, promise3];
        return Q.any(promises).then((result) => {
            expect(result).toBe(2);
        });
    });
});