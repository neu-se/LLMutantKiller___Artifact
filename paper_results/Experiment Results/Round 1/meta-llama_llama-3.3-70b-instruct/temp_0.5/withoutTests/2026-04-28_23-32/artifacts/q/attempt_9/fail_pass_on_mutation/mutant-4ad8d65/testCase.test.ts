describe("Q", () => {
    it("should dispatch 'apply' when calling fcall", () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === "apply") {
                    return Promise.resolve();
                } else {
                    throw new Error("Invalid operation");
                }
            }),
        };
        const Q = {
            fcall: (obj: any, method: any) => {
                return obj.dispatch("apply", [void 0, [method]]);
            },
        };
        expect(() => Q.fcall(object, "")).not.toThrowError();
        Q.fcall(object, "test");
        expect(object.dispatch).toHaveBeenCalledTimes(2);
        expect(object.dispatch).toHaveBeenNthCalledWith(1, "apply", [void 0, [""]]);
        expect(object.dispatch).toHaveBeenNthCalledWith(2, "apply", [void 0, ["test"]]);
    });
});