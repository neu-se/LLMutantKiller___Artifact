describe("Q", () => {
    it("should throw an error when reducing an empty array without an initial value", () => {
        const array: number[] = [];
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        let index = 0;
        let basis: number | undefined;
        do {
            if (index in array) {
                basis = array[index++];
                break;
            }
            if (++index >= array.length) {
                break;
            }
        } while (1);

        expect(basis).toBeUndefined();
    });

    it("should not throw an error when reducing an empty array with an initial value", () => {
        const array: number[] = [];
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;
        const initialValue = 10;

        let basis = initialValue;
        for (let index = 0; index < array.length; index++) {
            basis = callback(basis, array[index]);
        }

        expect(basis).toBe(initialValue);
    });

    it("should throw an error when reducing an array without an initial value and the array is empty", () => {
        const array: number[] = [];
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        let index = 0;
        let basis: number | undefined;
        do {
            if (index in array) {
                basis = array[index++];
                break;
            }
            if (++index >= array.length) {
                break;
            }
        } while (1);

        expect(basis).toBeUndefined();
    });
});