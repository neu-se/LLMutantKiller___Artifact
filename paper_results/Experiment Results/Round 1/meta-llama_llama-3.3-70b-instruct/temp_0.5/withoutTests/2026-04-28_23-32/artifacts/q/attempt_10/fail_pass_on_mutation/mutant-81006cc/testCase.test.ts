describe("Q post method", () => {
    const Q = {
        post: (object: any, name: string, args: any[]) => {
            object.dispatch("post", [name, args]);
        },
    };

    const QMutated = {
        post: (object: any, name: string, args: any[]) => {
            object.dispatch("", [name, args]);
        },
    };

    it("should dispatch with the correct operation name", () => {
        const dispatchSpy = jest.fn((op: string) => {
            if (op === "post") {
                return true;
            } else {
                return false;
            }
        });
        const object = {
            dispatch: dispatchSpy,
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        Q.post(object, name, args);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveReturnedWith(true);
    });

    it("should return false with incorrect operation name", () => {
        const dispatchSpy = jest.fn((op: string) => {
            if (op === "post") {
                return true;
            } else {
                return false;
            }
        });
        const object = {
            dispatch: dispatchSpy,
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        QMutated.post(object, name, args);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveReturnedWith(false);
    });
});