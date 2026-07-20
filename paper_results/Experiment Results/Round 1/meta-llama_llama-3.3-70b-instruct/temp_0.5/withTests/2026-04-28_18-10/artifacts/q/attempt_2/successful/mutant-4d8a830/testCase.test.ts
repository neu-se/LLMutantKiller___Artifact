import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post with no name", () => {
    it("should work as apply when given no name", () => {
        return Q(function (a: number, b: number, c: number) {
            return a + b + c;
        })
        .post(null, [1, 2, 3])
        .then((sum: number) => {
            expect(sum).toEqual(6);
        });
    });
});