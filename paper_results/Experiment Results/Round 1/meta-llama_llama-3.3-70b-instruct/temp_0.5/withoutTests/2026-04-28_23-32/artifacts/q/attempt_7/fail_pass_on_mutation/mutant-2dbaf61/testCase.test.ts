describe('Q', () => {
    it('should not throw an error when trying to access the stack of a non-error object in the catch block', () => {
        // Act and Assert
        expect(() => {
            try {
            } catch (e) {
                if (e instanceof Error) {
                    const stack = e.stack;
                }
            }
        }).not.toThrowError();
    });
});