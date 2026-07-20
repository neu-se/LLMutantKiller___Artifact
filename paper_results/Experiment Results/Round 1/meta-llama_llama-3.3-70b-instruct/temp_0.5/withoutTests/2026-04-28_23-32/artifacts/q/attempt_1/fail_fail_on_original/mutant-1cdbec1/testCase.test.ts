import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should create a global Q object when executed as a script", () => {
        const originalQ = globalThis.Q;
        delete globalThis.Q;
        const script = document.createElement("script");
        script.src = "q.js";
        document.head.appendChild(script);
        script.onload = () => {
            expect(globalThis.Q).toBeDefined();
            globalThis.Q = originalQ;
            document.head.removeChild(script);
        };
    });
});