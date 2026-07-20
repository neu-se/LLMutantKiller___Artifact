import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly reduce an array", () => {
        const array = [1, , 2, , 3];
        const initialValue = 0;
        const callback = (basis: number, value: number) => basis + value;

        const promise = Q(array).then((arr: any[]) => arr.reduce(callback, initialValue));
        const result = promise.then((value: number) => value);

        expect(result).resolves.toBe(6); // This should be 6 if the mutation is not present
    });
});