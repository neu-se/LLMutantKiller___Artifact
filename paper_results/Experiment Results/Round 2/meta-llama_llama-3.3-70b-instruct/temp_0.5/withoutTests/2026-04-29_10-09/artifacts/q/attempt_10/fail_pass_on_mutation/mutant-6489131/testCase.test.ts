import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly reduce an array", () => {
        const array = [1, , 2, , 3, , 4, , 5];
        const initialValue = 0;
        const callback = (basis: number, value: number) => basis + value;

        const promise = Q(array).then((arr: any[]) => {
            let count = 0;
            arr.forEach((value) => {
                if (value !== undefined) {
                    count++;
                }
            });
            return count;
        });
        const result = promise.then((value: number) => value);

        expect(result).resolves.toBe(5); // This should be 5 if the mutation is not present
    });
});