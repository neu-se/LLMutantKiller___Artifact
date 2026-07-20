import { Q } from "./q";

describe("Q", () => {
    it("should correctly reduce an array with a callback", () => {
        const array = [1, 2, 3, 4, 5];
        const initialValue = 0;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        const result = Q.reduce(array, callback, initialValue);
        expect(result).toBe(15);
    });

    it("should correctly reduce an empty array with a callback", () => {
        const array = [];
        const initialValue = 0;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        const result = Q.reduce(array, callback, initialValue);
        expect(result).toBe(initialValue);
    });

    it("should correctly reduce an array with a single element and a callback", () => {
        const array = [1];
        const initialValue = 0;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        const result = Q.reduce(array, callback, initialValue);
        expect(result).toBe(1);
    });
});