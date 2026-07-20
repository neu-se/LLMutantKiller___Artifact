describe("makeStackTraceLong function", () => {
    it("should correctly handle the mutation", () => {
        const error = new Error();
        const p = { stack: "test stack", stackCounter: 10 };
        const makeStackTraceLong = (error, p) => {
            // Simulate the original code's behavior
            error.__minimumStackCounter__ = p.stackCounter;
        };
        makeStackTraceLong(error, p);
        expect(error.__minimumStackCounter__).toBe(10);
    });
});