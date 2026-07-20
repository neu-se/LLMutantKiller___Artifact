const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should correctly handle function application with proper dispatch operation", async () => {
        const testObj = {
            value: 10,
            getValue: function() {
                return this.value;
            }
        };
        const result = await Q.fcall(testObj.getValue.bind(testObj));
        expect(result).toBe(10);
    });
});