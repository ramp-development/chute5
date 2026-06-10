import "./chunk-JCVR2ZN6.js";

// src/index.ts
window.Webflow ||= [];
window.Webflow.push(async () => {
  const [{ components }, { animation }, { utils }] = await Promise.all([
    import("./components-FPSJDE4T.js"),
    import("./animation-WC4QHR7W.js"),
    import("./utils-MMIOS746.js")
  ]);
  await Promise.all([components(), animation(), utils()]);
});
//# sourceMappingURL=index.js.map
