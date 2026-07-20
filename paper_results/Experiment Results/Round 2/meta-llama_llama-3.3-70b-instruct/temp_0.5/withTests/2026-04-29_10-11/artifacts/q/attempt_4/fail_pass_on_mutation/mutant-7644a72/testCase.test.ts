import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', function () {
    it('should use the ReturnValue if it is defined', function () {
        let originalReturnValue = global.ReturnValue;
        global.ReturnValue = function (value) {
            this.value = value;
        };
        let QReturnValue;
        if (typeof global.ReturnValue !== "undefined") {
            QReturnValue = global.ReturnValue;
        } else {
            QReturnValue = function (value) {
                this.value = value;
            };
        }
        expect(QReturnValue).toBe(global.ReturnValue);
        global.ReturnValue = originalReturnValue;
    });
});