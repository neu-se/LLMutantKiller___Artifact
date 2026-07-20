import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce function", () => {
    it("should iterate over the array and call the callback function with the correct arguments", () => {
        var array = [1, 2, 3, 4, 5];
        var callback = jest.fn(function (basis: number, value: number, index: number) {
            expect(basis).toBeGreaterThan(0);
            expect(value).toBeGreaterThan(0);
            expect(index).toBeGreaterThan(-1);
        });
        var initial: number = 0;
        array_reduce(array, callback, initial);
        expect(callback).toHaveBeenCalledTimes(5);
    });
});