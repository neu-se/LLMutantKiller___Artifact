describe('Q', () => {
    it('should throw an error with a specific message when Q.noConflict is called', () => {
        let error;
        try {
            (Q as any).noConflict();
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Q.noConflict only works when Q is used as a global");
    });
});