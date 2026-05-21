import "./chunk-JCVR2ZN6.js";

// src/index.ts
window.Webflow ||= [];
window.Webflow.push(async () => {
  const [{ components }, { animation }, { utils }] = await Promise.all([
    import("./components-G2ENPTEY.js"),
    import("./animation-XXPBME75.js"),
    import("./utils-MMIOS746.js")
  ]);
  await Promise.all([components(), animation(), utils()]);
});
//# sourceMappingURL=index.js.map
