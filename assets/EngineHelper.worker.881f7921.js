(function() {
    "use strict";
    var i = null;
    const t = "/engine/main_20240816v7";
    self.onmessage = function(e) {
        if (e.data.command != null)
            i.sendCommand(e.data.command);
        else if (e.data.wasm_type != null) {
            let n = e.data.wasm_type
              , a = e.data.origin;
            console.log("Try to load: " + a + t + "/" + n + "/pikafish.js"),
            self.importScripts(a + t + "/" + n + "/pikafish.js"),
            self.Pikafish({
                onReceiveStdout: s=>self.postMessage({
                    stdout: s
                }),
                onExit: s=>self.postMessage({
                    exit: s
                }),
                locateFile: s=>s === "pikafish.data" ? a + t + s : a + t + "/" + n + "/" + s,
                setStatus: s=>{
                    self.postMessage({
                        download: s
                    })
                }
            }).then(s=>{
                i = s,
                self.postMessage({
                    ready: !0
                })
            }
            )
        }
    }
}
)();
