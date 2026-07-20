import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce function", () => {
    it("should return the correct result when given a non-empty array and a callback function", () => {
        var array = [1, 2, 3, 4, 5];
        var callback = function (basis: number, value: number, index: number) {
            return basis + value;
        };
        var initial: number = 0;
        var result = array.reduce(callback, initial);
        expect(result).toBe(15);
    });

    it("should return the initial value when given an empty array and a callback function", () => {
        var array: number[] = [];
        var callback = function (basis: number, value: number, index: number) {
            return basis + value;
        };
        var initial: number = 0;
        var result = array.reduce(callback, initial);
        expect(result).toBe(0);
    });

    it("should throw an error when given a non-array and a callback function", () => {
        var nonArray = "hello";
        var callback = function (basis: any, value: any, index: any) {
            return basis + value;
        };
        var initial: number = 0;
        expect(() => nonArray.reduce(callback, initial)).toThrowError();
    });

    it("should throw an error when given an array and a non-function callback", () => {
        var array = [1, 2, 3, 4, 5];
        var nonFunction = "hello";
        var initial: number = 0;
        expect(() => array.reduce(nonFunction, initial)).toThrowError();
    });
});