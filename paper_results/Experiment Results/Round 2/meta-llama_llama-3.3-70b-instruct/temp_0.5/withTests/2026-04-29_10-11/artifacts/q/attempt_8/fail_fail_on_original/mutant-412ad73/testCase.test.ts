describe("Q function", () => {
    it("should call bootstrap function", () => {
        const bootstrapSpy = jest.fn();
        (global as any).bootstrap = bootstrapSpy;
        require('./q');
        expect(bootstrapSpy).toHaveBeenCalledTimes(1);
    });
});