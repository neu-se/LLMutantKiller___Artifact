import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce function", () => {
    it("should return the correct result when given a non-empty array and a callback function", () => {
        var array = [1, 2, 3, 4, 5];
        var callback = function (basis, value, index) {
            return basis + value;
        };
        var result = Q(array_reduce)(array, callback, 0);
        return result.then(function (value) {
            expect(value).toBe(15);
        });
    });

    it("should return the initial value when given an empty array and a callback function", () => {
        var array = [];
        var callback = function (basis, value, index) {
            return basis + value;
        };
        var result = Q(array_reduce)(array, callback, 0);
        return result.then(function (value) {
            expect(value).toBe(0);
        });
    });

    it("should throw an error when given a non-array and a callback function", () => {
        var nonArray = "hello";
        var callback = function (basis, value, index) {
            return basis + value;
        };
        var result = Q(array_reduce)(nonArray, callback, 0);
        return result.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error instanceof TypeError).toBe(true);
        });
    });

    it("should throw an error when given an array and a non-function callback", () => {
        var array = [1, 2, 3, 4, 5];
        var nonFunction = "hello";
        var result = Q(array_reduce)(array, nonFunction, 0);
        return result.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error instanceof TypeError).toBe(true);
        });
    });
});