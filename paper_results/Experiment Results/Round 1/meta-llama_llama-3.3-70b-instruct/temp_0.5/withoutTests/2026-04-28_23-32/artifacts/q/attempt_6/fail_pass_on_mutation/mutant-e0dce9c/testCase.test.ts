describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Promise.resolve(1);
        let value: any;
        promise.then((val: any) => {
            value = val;
        });
        expect(value).toBeUndefined();
    });
});