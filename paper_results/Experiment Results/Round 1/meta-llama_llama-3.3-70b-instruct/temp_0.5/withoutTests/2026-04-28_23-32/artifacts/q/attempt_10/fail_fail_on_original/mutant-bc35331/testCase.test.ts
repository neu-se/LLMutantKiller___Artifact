describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        const processToString = process.toString;
        expect(processToString()).toBe('[object process]');
    });
});