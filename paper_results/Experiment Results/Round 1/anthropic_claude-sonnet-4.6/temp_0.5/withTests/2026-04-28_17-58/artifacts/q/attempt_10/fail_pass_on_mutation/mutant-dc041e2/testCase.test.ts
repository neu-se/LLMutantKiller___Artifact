import * as fs from "fs";
import * as path from "path";

describe("Q ses.ok() condition", () => {
  it("should set window.Q when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf-8");

    const mockWindow: any = {};
    let sesCallCount = 0;
    const sesObj = { ok: () => false };
    
    const sesHolder: any = { window: mockWindow };
    Object.defineProperty(sesHolder, 'ses', {
      get() {
        sesCallCount++;
        if (sesCallCount === 1) return undefined;
        return sesObj;
      },
      configurable: true,
      enumerable: true,
    });
    
    const fn = new Function(
      'sesHolder', '_process', '_setTimeout', '_clearTimeout', '_setImmediate',
      [
        'var self = undefined;',
        'var bootstrap = undefined;',
        'var exports = undefined;',
        'var module = undefined;',
        'var define = undefined;',
        'var process = _process;',
        'var setTimeout = _setTimeout;',
        'var clearTimeout = _clearTimeout;',
        'var setImmediate = _setImmediate;',
        'with(sesHolder) {',
        qSource,
        '}'
      ].join('\n')
    );
    
    fn(sesHolder, process, setTimeout, clearTimeout, setImmediate);
    
    // Original: if (!ses.ok()) => !false => true => window.Q IS set
    // Mutated:  if (ses.ok())  => false  => window.Q NOT set
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});