import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should resolve promises correctly", () => {
        const array = [1, 2, 3];
        const promise = Q(array);
        const result = promise.then((value: any[]) => {
            let sum = 0;
            for (let i = 0; i < value.length; i++) {
                sum += value[i];
            }
            return sum;
        });
        return result.then((sum: number) => {
            expect(sum).toBe(6);
        });
    });
});