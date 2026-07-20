import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should correctly handle an array of promises", () => {
        const promise1 = Q(1);
        const promise2 = Q(2);

        const promises = [promise1, promise2];

        return Q.all(promises).then((values: any[]) => {
            expect(values).toEqual([1, 2]);
        });
    });
});