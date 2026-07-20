import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should define QReturnValue when ReturnValue is not defined", () => {
        var originalReturnValue = global.ReturnValue;
        delete global.ReturnValue;
        expect(Q.QReturnValue).toBeDefined();
        global.ReturnValue = originalReturnValue;
    });

    it("should define QReturnValue as ReturnValue when ReturnValue is defined", () => {
        var originalReturnValue = global.ReturnValue;
        global.ReturnValue = function(value) {
            this.value = value;
        };
        expect(Q.QReturnValue).toBe(global.ReturnValue);
        global.ReturnValue = originalReturnValue;
    });
});