import { Q } from './q'; // assuming the q.js file is in the same directory

describe("Q", () => {
    it("should map an array correctly", async () => {
        const array = [1, 2, 3];
        const callback = (value: number) => value * 2;
        const mappedArray = await Q(array).then((arr: number[]) => {
            const mapped = arr.map(callback);
            return mapped;
        });
        expect(mappedArray).toEqual([2, 4, 6]);
    });
});