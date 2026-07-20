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
        expect(() => Q.fcall(object, "")).toThrowError("Invalid operation");
    });
});