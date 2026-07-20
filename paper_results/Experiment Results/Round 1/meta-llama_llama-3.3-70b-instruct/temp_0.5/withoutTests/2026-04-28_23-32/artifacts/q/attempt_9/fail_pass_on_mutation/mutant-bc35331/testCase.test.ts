describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        const toStringValue = '[object process]';
        const mutatedToStringValue = '';

        expect(toStringValue).not.toBe(mutatedToStringValue);
    });
});