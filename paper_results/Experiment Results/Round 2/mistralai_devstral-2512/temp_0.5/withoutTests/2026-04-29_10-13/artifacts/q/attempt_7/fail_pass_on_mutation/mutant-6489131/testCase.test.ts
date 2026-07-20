const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.reduce behavior with sparse array", () => {
    it("should find first defined element in sparse array", () => {
        return Q([, , 5]).then(function (arr: any[]) {
            return arr.reduce(function (acc: number, val: number) {
                return acc + val;
            });
        }).then(function (result: number) {
            expect(result).toBe(5);
        });
    });
});