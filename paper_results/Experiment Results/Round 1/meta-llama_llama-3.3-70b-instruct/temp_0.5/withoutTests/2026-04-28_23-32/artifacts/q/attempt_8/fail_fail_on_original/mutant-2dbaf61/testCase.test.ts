describe('Q', () => {
    it('should throw an error when trying to access the stack of a non-error object in the catch block of an empty try block', () => {
        // Act and Assert
        expect(() => {
            try {
            } catch (e) {
                const stack = e.stack;
            }
        }).toThrowError();
    });
});