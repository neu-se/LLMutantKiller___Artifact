describe("Q", () => {
    it("should create a Q promise in a browser environment", () => {
        const global = typeof window!== "undefined"? window : globalThis;
        const previousQ = global.Q;
        const q = Q(1);
        expect(q).toBeInstanceOf(Object);
        expect(q.then).toBeInstanceOf(Function);
        expect(q.catch).toBeInstanceOf(Function);
        global.Q = previousQ;
    });
});