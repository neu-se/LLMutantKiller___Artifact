import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle array reduce with no initial value", () => {
        const array = [1, 2, 3];
        const callback = (basis: any, value: any) => basis + value;
        const result = Q.fulfill(array).then((array) => {
            let sum = 0;
            for (let i = 0; i < array.length; i++) {
                sum += array[i];
            }
            return sum;
        });
        expect(result).resolves.toEqual(6);
    });
});