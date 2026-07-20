import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf shim", () => {
    it("finds element at index 0 when native indexOf is unavailable", async () => {
        const savedIndexOf = Array.prototype.indexOf;
        delete (Array.prototype as any).indexOf;
        
        jest.resetModules();
        const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
        
        Array.prototype.indexOf = savedIndexOf;
        
        QFresh.resetUnhandledRejections();
        
        const err = new Error("test");
        const p = QFresh.reject(err);
        
        await p.then(null, () => {});
        await new Promise(r => setTimeout(r, 50));
        
        expect(QFresh.getUnhandledReasons().length).toBe(0);
    });
});