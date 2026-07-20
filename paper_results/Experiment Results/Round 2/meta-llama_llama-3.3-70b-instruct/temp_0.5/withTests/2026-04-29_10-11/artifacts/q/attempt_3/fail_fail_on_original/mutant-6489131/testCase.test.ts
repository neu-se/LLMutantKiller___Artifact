import { array_reduce } from "../../../../../q";

describe("array_reduce function in q.js", () => {
    it("should correctly reduce an array", () => {
        const array = [1, 2, 3, 4, 5];
        const initial = 0;
        const callback = (accumulator: number, current: number) => accumulator + current;
        const result = array_reduce(array, callback, initial);
        expect(result).toBe(15);
    });

    it("should throw an error for an empty array", () => {
        const array = [];
        const initial = 0;
        const callback = (accumulator: number, current: number) => accumulator + current;
        expect(() => array_reduce(array, callback, initial)).toThrowError();
    });
});