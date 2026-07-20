describe("Q behavior", () => {
    it("should create a global Q object when executed as a script", () => {
        // Since the mutation changes the behavior of Q in a browser environment,
        // we can test this by checking if the Q object is created as a global variable.
        const globalObject = global as any;
        expect(typeof globalObject.Q).toBe("function");
    });
});