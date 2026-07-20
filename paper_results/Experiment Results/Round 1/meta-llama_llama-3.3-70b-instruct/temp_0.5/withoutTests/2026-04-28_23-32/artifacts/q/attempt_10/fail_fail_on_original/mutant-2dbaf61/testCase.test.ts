describe('Q', () => {
    it('should throw an error when trying to access the stack of an error object in an empty catch block', () => {
        // Act and Assert
        expect(() => {
            try {
                throw new Error();
            } catch (e) {
                if (!(e instanceof Error)) {
                    const stack = e.stack;
                }
            }
        }).toThrowError();
    });
});