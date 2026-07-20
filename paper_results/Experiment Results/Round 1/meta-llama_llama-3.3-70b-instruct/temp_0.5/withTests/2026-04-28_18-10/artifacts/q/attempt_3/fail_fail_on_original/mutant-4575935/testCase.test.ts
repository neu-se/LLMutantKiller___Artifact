describe("Q function", () => {
    it("should attach Q to the global object", async () => {
        // @ts-ignore
        const global = typeof globalThis !== "undefined" ? globalThis : global;
        expect(global.Q).toBeDefined();
    });
});