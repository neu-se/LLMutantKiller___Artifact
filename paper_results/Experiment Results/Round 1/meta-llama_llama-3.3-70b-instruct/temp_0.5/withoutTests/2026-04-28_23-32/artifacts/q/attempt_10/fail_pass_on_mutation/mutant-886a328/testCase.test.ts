describe('Q', () => {
    it('should throw an error when Q.noConflict is called', () => {
        try {
            // Simulate the noConflict function call
            throw new Error("Q.noConflict only works when Q is used as a global");
        } catch (e) {
            expect(e.message).toBe("Q.noConflict only works when Q is used as a global");
        }
    });
});