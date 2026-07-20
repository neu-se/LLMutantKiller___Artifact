describe("Q", () => {
    it("should dispatch 'apply' when calling fcall", () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === "apply") {
                    return Promise.resolve();
                } else {
                    return Promise.reject(new Error("Invalid operation"));
                }
            }),
        };
        const Q = {
            fcall: (obj, method) => {
                return obj.dispatch("apply", [void 0, [method]]);
            },
        };
        Q.fcall(object, "test");
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith("apply", [void 0, ["test"]]);
    });
});