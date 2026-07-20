import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised function", () => {
    it("should resolve promised arguments and 'this'", () => {
        var sum = Q.promised(function add(a: any, b: any) {
            return a + b;
        });
        return sum(Q(4), Q(5)).then(function (sum: any) {
            expect(sum).toEqual(9);
        });
    });
});