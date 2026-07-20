describe("Q behavior in a Node environment", () => {
    it("should define the Q object", () => {
        const globalObject = global as any;
        expect(globalObject.Q).toBeDefined();
    });
});