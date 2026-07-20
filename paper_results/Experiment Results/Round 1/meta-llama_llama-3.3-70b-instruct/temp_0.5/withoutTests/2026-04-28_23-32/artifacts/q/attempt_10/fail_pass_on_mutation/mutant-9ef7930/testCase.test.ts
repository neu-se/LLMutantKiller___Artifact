describe('Q.race', () => {
    it('should test the Q.race function with an array of promises', () => {
        const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
        const result = Promise.race(promises);
        expect(result).resolves.toBeLessThan(3);
    });
});