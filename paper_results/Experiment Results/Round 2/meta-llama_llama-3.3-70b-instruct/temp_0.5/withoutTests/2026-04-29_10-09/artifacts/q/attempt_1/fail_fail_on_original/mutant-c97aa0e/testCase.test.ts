import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve promises with any", () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.reject("Error");

        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2]);
        });
    });
});