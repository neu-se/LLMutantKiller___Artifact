import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should correctly handle array reduce with sparse arrays", () => {
        const array = [1, , 3];
        const result = Q(array).then((arr: any[]) => {
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                if (i in arr) {
                    sum += arr[i];
                }
            }
            return sum;
        });
        return result.then((sum: number) => expect(sum).toBe(4));
    });
});