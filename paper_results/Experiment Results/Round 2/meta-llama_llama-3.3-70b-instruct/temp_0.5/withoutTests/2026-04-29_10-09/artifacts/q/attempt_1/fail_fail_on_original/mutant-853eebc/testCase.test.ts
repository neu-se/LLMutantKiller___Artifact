import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should map an array correctly", () => {
        const array = [1, 2, 3];
        const callback = (value: number) => value * 2;
        const mappedArray = Q(array).map(callback);
        expect(mappedArray).resolves.toEqual([2, 4, 6]);
    });
});