import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array reduce function", () => {
    it("should reduce an array correctly", () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const initialBasis = 0;

        const promise = Q(array).then((arr: number[]) => {
            let result = initialBasis;
            for (let index = 0; index < arr.length; index++) {
                if (index in arr) {
                    result = callback(result, arr[index]);
                }
            }
            return result;
        });

        return promise.then((result: number) => {
            expect(result).toBe(15);
        });
    });
});