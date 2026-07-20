describe('Q function', () => {
    it('should throw an error when Q.longStackSupport is accessed without Q', () => {
        expect(() => {
            Q.longStackSupport;
        }).toThrow();
    });
});