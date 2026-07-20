import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should resolve promises with any", () => {
        const promise1 = q.Q(1);
        const promise2 = q.Q(2);
        const promise3 = q.Q.reject("Error");

        return q.Q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
        });
    });
});