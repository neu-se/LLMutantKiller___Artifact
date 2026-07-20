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
        const dispatchSpy = jest.fn((op) => {
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
        const result = Q.post(object, name, args);
        expect(result).toBe(true);
    });

    it("should return false with incorrect operation name", () => {
        const dispatchSpy = jest.fn((op) => {
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
        const result = QMutated.post(object, name, args);
        expect(result).toBe(false);
    });
});