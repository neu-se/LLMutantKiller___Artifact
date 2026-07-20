import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("QReturnValue", () => {
    it("should be defined when ReturnValue is not defined", () => {
        var originalReturnValue = global.ReturnValue;
        delete global.ReturnValue;
        var QReturnValue = Q.QReturnValue;
        expect(QReturnValue).toBeDefined();
        global.ReturnValue = originalReturnValue;
    });

    it("should be equal to ReturnValue when ReturnValue is defined", () => {
        var originalReturnValue = global.ReturnValue;
        global.ReturnValue = function(value) {
            this.value = value;
        };
        var QReturnValue = Q.QReturnValue;
        expect(QReturnValue).toBe(global.ReturnValue);
        global.ReturnValue = originalReturnValue;
    });
});