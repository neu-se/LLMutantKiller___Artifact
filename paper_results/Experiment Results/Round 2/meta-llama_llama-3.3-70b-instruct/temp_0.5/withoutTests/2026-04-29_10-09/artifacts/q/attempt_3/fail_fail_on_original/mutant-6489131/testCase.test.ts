import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly reduce an array", () => {
        const array = [1, , 3, , 5];
        const initialValue = 0;
        let callbackCalledCount = 0;
        const callback = (basis: number, value: number) => {
            callbackCalledCount++;
            return basis + value;
        };

        const promise = Q(array).then((arr: any[]) => {
            let index = 0;
            do {
                if (index in arr) {
                    callback(0, arr[index]);
                    index++;
                } else {
                    index++;
                }
            } while (index < arr.length);
            return arr.reduce(callback, initialValue);
        });
        const result = promise.then((value: number) => value);

        expect(result).resolves.toBe(9);
        expect(callbackCalledCount).toBe(6); // This should be 6 because we're calling the callback function manually for each element
    });
});