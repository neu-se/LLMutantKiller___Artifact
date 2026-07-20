import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with Q and have a working Q.return', () => {
        const Q = q.default || q;
        try {
            Q.return(10);
        } catch (e) {
            if (e instanceof Error && e.message.includes("Q.return is not a function")) {
                throw new Error("Q.return is not a function");
            }
        }
    });
});