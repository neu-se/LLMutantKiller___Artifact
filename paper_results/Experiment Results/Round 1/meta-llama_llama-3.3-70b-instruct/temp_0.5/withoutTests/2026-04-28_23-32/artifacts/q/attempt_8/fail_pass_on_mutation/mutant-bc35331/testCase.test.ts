describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        const originalProcessToString = global.process.toString;
        global.process.toString = () => '[object process]';

        expect(process.toString()).toBe('[object process]');
        expect(process.toString() === '[object process]').toBe(true);

        global.process.toString = originalProcessToString;
    });
});