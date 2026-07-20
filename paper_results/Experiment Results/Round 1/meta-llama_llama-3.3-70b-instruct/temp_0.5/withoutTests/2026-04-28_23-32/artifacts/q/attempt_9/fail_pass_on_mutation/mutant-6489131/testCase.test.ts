describe("Q", () => {
    it("should correctly reduce an array with a callback", () => {
        const array = [1, 2, 3, 4, 5];
        let index = 0;
        let basis: number | undefined;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        do {
            if (index in array) {
                if (basis === undefined) {
                    basis = array[index++];
                } else {
                    basis = callback(basis, array[index++]);
                }
            } else if (++index >= array.length) {
                break;
            }
        } while (1);

        expect(basis).toBe(15);
    });

    it("should return undefined when reducing an empty array without an initial value", () => {
        const array: number[] = [];
        let index = 0;
        let basis: number | undefined;
        const callback = (accumulator: number, currentValue: number) => accumulator + currentValue;

        do {
            if (index in array) {
                if (basis === undefined) {
                    basis = array[index++];
                } else {
                    basis = callback(basis, array[index++]);
                }
            } else if (++index >= array.length) {
                break;
            }
        } while (1);

        expect(basis).toBeUndefined();
    });
});