# PDF.js

Vendored from `pdfjs-dist` version **6.5.438**, published by Mozilla under Apache-2.0.

Source package: https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-6.5.438.tgz

Included files: the minified renderer and matching worker from `build/`, standard fonts, and their licenses. The slide viewer uses local assets and disables WebAssembly and dynamic font loading.

To update, replace the renderer, worker, standard fonts, and licenses together from a pinned `pdfjs-dist` release. Verify the package integrity against the npm registry and test slide navigation and rendering after updating.
