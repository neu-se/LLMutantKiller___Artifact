import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should resolve promises with any", () => {
        const promise1 = q(1);
        const promise2 = q(2);
        const promise3 = q.reject("Error");

        return q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
            expect(q.any([])).toBeInstanceOf(q.Promise);
        });
    });
});