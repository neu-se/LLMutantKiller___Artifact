import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should map an array correctly", async () => {
        const array = [1, 2, 3];
        const callback = (value: number) => value * 2;
        const mappedArray = await Q(array).then((arr: number[]) => arr.map(callback));
        expect(mappedArray).toEqual([2, 4, 6]);
    });
});