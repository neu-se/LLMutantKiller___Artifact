describe("Q", () => {
    it("should dispatch 'apply' when calling fcall", () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === "apply") {
                    return Promise.resolve();
                } else {
                    return Promise.resolve();
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

    it("should not dispatch 'apply' when calling fcall with mutated code", () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === "apply") {
                    return Promise.resolve();
                } else {
                    return Promise.resolve();
                }
            }),
        };
        const Q = {
            fcall: (obj: any, method: any) => {
                return obj.dispatch("", [void 0, [method]]);
            },
        };
        Q.fcall(object, "test");
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).not.toHaveBeenCalledWith("apply", [void 0, ["test"]]);
    });
});