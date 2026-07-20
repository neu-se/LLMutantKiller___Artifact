const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.reduce behavior with sparse array", () => {
    it("should throw TypeError when reducing sparse array without initial value and no elements", () => {
        return Q([, , ,]).then(function (arr: any[]) {
            return arr.reduce(function (acc: number, val: number) {
                return acc + val;
            });
        }).then(function () {
            throw new Error("Expected TypeError was not thrown");
        }, function (error: Error) {
            expect(error).toBeInstanceOf(TypeError);
        });
    });
});