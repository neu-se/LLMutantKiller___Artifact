describe("Q promise library", () => {
    it("should create a global Q object when executed as a script", () => {
        // Check if Q is defined in the global scope
        expect((globalThis as any).Q).toBeDefined();

        // Check if Q has a resolve method
        expect((globalThis as any).Q.resolve).toBeDefined();

        // Create a new promise
        const promise = (globalThis as any).Q.resolve("Test");

        // Check if the promise is fulfilled
        promise.then((value: any) => {
            expect(value).toBe("Test");
        });
    });
});