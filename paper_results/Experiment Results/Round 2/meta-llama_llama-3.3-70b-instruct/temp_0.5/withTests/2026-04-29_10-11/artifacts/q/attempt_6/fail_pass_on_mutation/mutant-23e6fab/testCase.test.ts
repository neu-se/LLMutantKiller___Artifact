describe('q', () => {
    it('should throw an error when getFileNameAndLineNumber is called with a stack line that does not match any of the expected formats', () => {
        const error = new Error();
        const stackLine = 'some invalid stack line';
        expect(() => Q.getFileNameAndLineNumber(stackLine)).toThrowError();
    });
});