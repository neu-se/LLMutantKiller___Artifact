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
        Q.fcall(object, "test");
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith("apply", [void 0, ["test"]]);
    });

    it("should throw an error when calling fcall with mutated code", () => {
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
                return obj.dispatch("", [void 0, [method]]);
            },
        };
        expect(() => Q.fcall(object, "test")).toThrowError("Invalid operation");
    });
});