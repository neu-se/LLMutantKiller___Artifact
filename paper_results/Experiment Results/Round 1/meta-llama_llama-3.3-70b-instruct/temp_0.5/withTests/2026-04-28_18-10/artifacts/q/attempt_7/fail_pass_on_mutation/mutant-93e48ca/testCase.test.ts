describe("Q function with post method", () => {
    it("should call the function when name is null or undefined", () => {
        const func = () => {};
        const obj = { post: func };
        obj.post(null, [1, 2, 3]);
    });
});