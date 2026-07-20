import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle array reduce with sparse arrays", () => {
        const array = [1, , 3];
        const result = Q(array).then((arr: any[]) => {
            let sum = 0;
            for (let index = 0; index < arr.length; index++) {
                if (index in arr) {
                    sum += arr[index];
                }
            }
            return sum;
        });
        return result.then((sum: number) => expect(sum).toBe(4));
    });
});