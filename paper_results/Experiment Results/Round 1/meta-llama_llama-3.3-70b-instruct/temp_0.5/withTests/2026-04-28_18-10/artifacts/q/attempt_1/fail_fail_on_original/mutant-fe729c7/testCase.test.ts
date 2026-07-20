import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should detect mutation in array_reduce function", () => {
        const array = [1, 2, 3];
        const callback = function () { };
        const basis = {};

        // Test the original code
        const originalResult = Q(array_reduce)(array, callback, basis);
        expect(originalResult).toBeUndefined();

        // Test the mutated code
        const mutatedArrayReduce = function (callback, basis) {
            var index = 0,
                length = this.length;
            // concerning the initial value, if one is not provided
            if (arguments.length === 1) {
                // seek to the first value in the array, accounting
                // for the possibility that is is a sparse array
                do {
                    if (true) {
                        basis = this[index++];
                        break;
                    }
                    if (++index >= length) {
                        throw new TypeError();
                    }
                } while (1);
            }
            // reduce
            for (; index < length; index++) { }
        };

        const mutatedResult = mutatedArrayReduce.call(array, callback, basis);
        expect(mutatedResult).toBeUndefined();
    });
});