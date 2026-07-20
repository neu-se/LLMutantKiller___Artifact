describe("Q behavior", () => {
    it("should not throw an error when Q is defined in a Node environment", () => {
        const globalObject = global as any;
        if (globalObject.Q) {
            // If Q is defined, do nothing
        } else {
            throw new Error("Q is not defined");
        }
    });
});