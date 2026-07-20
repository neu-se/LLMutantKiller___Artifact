import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle array_reduce with empty array and initial value", () => {
        var array = [];
        var initial = 10;
        var result = Q(array_reduce)(array, function (acc, current) {
            return acc + current;
        }, initial);

        return result.then(function (result) {
            expect(result).toBe(10);
        });
    });
});