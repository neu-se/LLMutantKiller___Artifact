import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised function", () => {
    it("should resolve promised arguments and 'this'", () => {
        var sum = q.promised(function add(a: any, b: any) {
            return a + b;
        });
        return sum(q(4), q(5)).then(function (sum: any) {
            expect(sum).toEqual(9);
        });
    });
});