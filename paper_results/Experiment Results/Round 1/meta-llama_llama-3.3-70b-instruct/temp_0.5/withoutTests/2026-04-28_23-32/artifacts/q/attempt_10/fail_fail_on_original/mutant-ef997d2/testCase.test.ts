describe("Q", () => {
    it("should return a promise with inspect method that returns an object with state and value", () => {
        const q = require('./q');
        const Q = q.Q;
        const promise = Q({ foo: 'bar' });
        expect(promise.inspect).toBeDefined();
        const inspected = promise.inspect();
        expect(typeof inspected).toBe("object");
        expect(inspected).toHaveProperty("state");
        expect(inspected).toHaveProperty("value");
        expect(inspected.state).toBe("fulfilled");
        expect(inspected.value).toEqual({ foo: 'bar' });
    });
});