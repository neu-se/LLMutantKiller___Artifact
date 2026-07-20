import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q array reduce function", () => {
    it("should reduce an array correctly", () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const initialBasis = 0;

        const promise = Q(array).then((arr) => arr.reduce(callback, initialBasis));

        return promise.then((result) => {
            expect(result).toBe(15);
        });
    });
});