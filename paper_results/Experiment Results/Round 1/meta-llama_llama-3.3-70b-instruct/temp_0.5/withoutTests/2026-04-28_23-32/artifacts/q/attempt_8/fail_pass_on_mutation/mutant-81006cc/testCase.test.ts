describe("Q post method", () => {
    const Q = {
        post: (object, name, args) => {
            object.dispatch("post", [name, args]);
        },
    };

    const QMutated = {
        post: (object, name, args) => {
            object.dispatch("", [name, args]);
        },
    };

    it("should dispatch with the correct operation name", () => {
        const dispatchSpy = jest.fn();
        const object = {
            dispatch: dispatchSpy,
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        Q.post(object, name, args);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith("post", [name, args]);
    });

    it("should throw an error with incorrect operation name", () => {
        const dispatchSpy = jest.fn((op, args) => {
            if (op !== "post") {
                throw new Error("Incorrect operation name");
            }
        });
        const object = {
            dispatch: dispatchSpy,
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        expect(() => QMutated.post(object, name, args)).toThrow();
    });
});