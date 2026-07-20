describe("Q", () => {
    it("should detect mutation in array_reduce function", () => {
        const array = [1, 2, 3];
        const callback = (previousValue: any, currentValue: any, index: any, array: any) => {
            return previousValue + currentValue;
        };
        const basis = 0;

        // Test the original code
        const originalResult = array.reduce(callback, basis);
        expect(originalResult).toBe(6);

        // Test the mutated code
        const mutatedArrayReduce = function (this: any, callback: any, basis: any) {
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
            return basis;
        };

        expect(mutatedArrayReduce.call(array, callback, basis)).not.toBe(6);
    });
});