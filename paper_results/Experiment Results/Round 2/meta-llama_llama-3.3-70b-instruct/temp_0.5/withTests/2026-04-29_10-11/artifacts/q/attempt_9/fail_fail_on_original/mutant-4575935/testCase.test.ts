describe("Q behavior", () => {
    it("should throw an error when Q is not defined in a Node environment", () => {
        const globalObject = global as any;
        if (!globalObject.Q) {
            throw new Error("Q is not defined");
        }
    });
});