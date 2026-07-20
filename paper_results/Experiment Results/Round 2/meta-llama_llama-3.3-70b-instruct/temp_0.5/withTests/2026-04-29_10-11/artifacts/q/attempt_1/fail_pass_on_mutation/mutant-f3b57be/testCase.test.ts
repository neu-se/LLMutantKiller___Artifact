import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle array_reduce with initial value", () => {
        var array = [1, 2, 3];
        var initial = 10;
        var result = array.reduce(function (acc, current) {
            return acc + current;
        }, initial);

        expect(result).toBe(16);
    });

    it("should correctly handle array_reduce without initial value", () => {
        var array = [1, 2, 3];
        var result = array.reduce(function (acc, current) {
            return acc + current;
        });

        expect(result).toBe(6);
    });
});