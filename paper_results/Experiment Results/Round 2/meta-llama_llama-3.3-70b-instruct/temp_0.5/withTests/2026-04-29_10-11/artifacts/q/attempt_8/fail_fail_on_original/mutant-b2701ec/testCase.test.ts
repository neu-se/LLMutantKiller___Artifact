describe('Promise', () => {
    it('should inspect a promise correctly', () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        expect(inspected).toEqual({ state: "pending" });
        if (inspected.state === "pending") {
            expect(inspected).not.toHaveProperty('value');
        }
    });
});