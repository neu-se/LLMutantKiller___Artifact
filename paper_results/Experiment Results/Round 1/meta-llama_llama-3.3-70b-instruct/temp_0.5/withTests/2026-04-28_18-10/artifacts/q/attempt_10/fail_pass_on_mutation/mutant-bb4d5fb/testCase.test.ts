describe("Q", () => {
    it("should correctly filter out internal frames from stack traces", () => {
        // Given
        const error = new Error();
        const stack = error.stack;

        // When
        const filteredStack = stack.replace(/at .*q\.js:\d+:\d+/g, '');

        // Then
        expect(filteredStack).not.toContain('q.js');
    });
});