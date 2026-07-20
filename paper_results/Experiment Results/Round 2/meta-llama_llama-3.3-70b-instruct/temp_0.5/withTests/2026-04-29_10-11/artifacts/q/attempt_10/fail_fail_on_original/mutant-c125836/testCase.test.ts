import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce function", () => {
    it("should iterate over the array and call the callback function with the correct arguments", () => {
        var array = [1, 2, 3, 4, 5];
        var callback = function (basis: number, value: number, index: number) {
            if (index === 0) {
                expect(basis).toBe(0);
            } else {
                expect(basis).toBeGreaterThan(0);
            }
            expect(value).toBeGreaterThan(0);
            expect(index).toBeGreaterThan(-1);
        };
        var initial: number = 0;
        var result = array.reduce(callback, initial);
        expect(result).toBe(15);
    });
});