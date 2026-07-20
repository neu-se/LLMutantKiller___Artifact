const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.reduce behavior with sparse array", () => {
    it("should handle sparse arrays correctly in reduce", () => {
        return Q([, 1, , 2]).then(function (arr: any[]) {
            return arr.reduce(function (acc: number, val: number) {
                return acc + (val || 0);
            }, 0);
        }).then(function (result: number) {
            expect(result).toBe(3);
        });
    });
});