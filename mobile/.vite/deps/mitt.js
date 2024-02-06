import {
  init_define_process_env_UNI_STAT_TITLE_JSON
} from "./chunk-H3GGUTKQ.js";

// dep:mitt
init_define_process_env_UNI_STAT_TITLE_JSON();

// ../../../../Users/86153/Documents/kawaedu/项目/信产教学平台/xinchanedu/mobile/node_modules/mitt/dist/mitt.mjs
init_define_process_env_UNI_STAT_TITLE_JSON();
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// dep:mitt
var mitt_default2 = mitt_default;
export {
  mitt_default2 as default
};
//# sourceMappingURL=mitt.js.map
