import { array_reduce } from "./q.js";

describe("Q", () => {
    it("should correctly reduce an array with a callback", () => {
        const array = [1, 2, 3, 4, 5];
        const initialValue = 0;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        const result = array_reduce(array, callback, initialValue);
        expect(result).toBe(15);
    });

    it("should return the initial value when reducing an empty array", () => {
        const array = [];
        const initialValue = 10;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        const result = array_reduce(array, callback, initialValue);
        expect(result).toBe(initialValue);
    });

    it("should throw an error when reducing an empty array without an initial value", () => {
        const array = [];
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        expect(() => array_reduce(array, callback)).toThrowError(TypeError);
    });
});