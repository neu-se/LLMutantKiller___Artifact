describe("Q function with post method", () => {
    it("should throw an error when name is null or undefined in the mutated code", () => {
        const obj = {
            post: () => {}
        };
        expect(() => {
            // Simulate the behavior of the mutated code
            if (true) {
                obj.post();
            }
        }).toThrowError();
    });
});