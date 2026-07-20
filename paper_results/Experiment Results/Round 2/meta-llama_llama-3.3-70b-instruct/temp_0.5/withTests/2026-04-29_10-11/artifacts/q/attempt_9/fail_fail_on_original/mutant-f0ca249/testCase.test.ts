describe('Q', () => {
    it('should handle array reduction correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const promise = Q(array);
        const result = promise.then((arr: number[]) => {
            if (arr.length === 0) {
                throw new Error("Array is empty");
            }
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
            return sum;
        });
        expect(result).resolves.toBe(15);
    });
});