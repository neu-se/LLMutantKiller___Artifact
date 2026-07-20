describe("Q.async", function () {
    it("should handle StopIteration correctly", function () {
        var asyncFunction = Q.async(function* () {
            try {
                yield Q.resolve(1);
                throw new Error('Test Error');
            } catch (e: any) {
                if (e instanceof QReturnValue) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        });

        return asyncFunction().then(function (result: any) {
            expect(result).toBeUndefined();
        }).catch(function (error: any) {
            expect(error.message).toBe('Test Error');
        });
    });
});