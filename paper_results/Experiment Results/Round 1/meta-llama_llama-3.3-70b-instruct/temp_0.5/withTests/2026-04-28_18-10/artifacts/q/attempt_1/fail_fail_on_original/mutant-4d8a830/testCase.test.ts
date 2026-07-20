import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post with no name", () => {
    it("should work as apply when given no name", () => {
        return Q(function (a, b, c) {
            return a + b + c;
        })
        .post(undefined, [1, 2, 3])
        .then(function (sum) {
            expect(sum).toEqual(6);
        });
    });
});