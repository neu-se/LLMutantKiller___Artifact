import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should correctly handle promises that are already resolved", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);

        const promises = [promise1, promise2];

        let count = 0;
        Q.all(promises).then((values) => {
            expect(values).toEqual([1, 2]);
            count++;
        });

        expect(count).toBe(1);
    });
});