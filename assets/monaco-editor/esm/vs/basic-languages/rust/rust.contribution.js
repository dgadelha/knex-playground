/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.44.0(3e047efd345ff102c8c61b5398fb30845aaac166)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/rust/rust.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "rust",
  extensions: [".rs", ".rlib"],
  aliases: ["Rust", "rust"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/rust/rust"], resolve, reject);
      });
    } else {
      return import("./rust.js");
    }
  }
});
