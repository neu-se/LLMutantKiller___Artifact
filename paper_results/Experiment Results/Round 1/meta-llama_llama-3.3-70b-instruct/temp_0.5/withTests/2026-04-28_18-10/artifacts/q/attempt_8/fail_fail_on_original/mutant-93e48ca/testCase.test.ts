describe("Q function with post method", () => {
    it("should not call the function with arguments when name is not null or undefined", () => {
        const func = jest.fn();
        const obj = { testMethod: func };
        Q(obj).post("testMethod", [1, 2, 3]);
        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith(1, 2, 3);
    });
});