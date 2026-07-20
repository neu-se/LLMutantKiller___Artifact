import { Q, array_map } from '../../q.js';

describe("Q", () => {
    it("should map an array correctly", () => {
        const array = [1, 2, 3];
        const callback = (value: number) => value * 2;
        const mappedArray = array_map(array, callback);
        expect(mappedArray).toEqual([2, 4, 6]);
    });
});