import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("array_reduce function in q.js", () => {
    it("should correctly reduce an array", async () => {
        const array = [1, 2, 3, 4, 5];
        const initial = 0;
        const callback = (accumulator: number, current: number) => accumulator + current;
        const result = await Q(array).then((array: number[]) => array.reduce(callback, initial));
        expect(result).toBe(15);
    });
});