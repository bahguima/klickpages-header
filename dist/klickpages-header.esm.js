import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cookie from 'js-cookie';
import axios from 'axios';

var url = {};

var validLocales = ['en', 'es', 'pt-BR'];

var isLocaleValid = function (locale) { return validLocales.includes(locale); };

var getFirstPath = function (path) {
  var paths = path.split('/');
  var i = 0;

  while (!paths[i] && i < paths.length) { i += 1; }
  return paths[i];
};

url.getLocale = function (path) {
  var locale = getFirstPath(path);

  if (isLocaleValid(locale)) {
    return locale;
  }

  return null;
};

url.hasLocale = function (path) { return !!url.getLocale(path); };

var config = {
  LOCALE_KEY: 'klickpages_locale',
  DEFAULT_LOCALE: 'pt-BR',
};

var getLocale = function () { return cookie.get(config.LOCALE_KEY); };

Vue.use(VueI18n);

var getDefinedLocale = function () {
  var urlLocale = url.getLocale(window.location.pathname);
  var cookieLocale = getLocale();

  return urlLocale || cookieLocale || config.DEFAULT_LOCALE;
};

var i18n = new VueI18n({
  locale: getDefinedLocale(),
});

var instance;

function instance$1 (klickartUrl) {
  if (instance) { return instance; }

  instance = axios.create({ baseURL: klickartUrl });

  return instance;
}

var configRequest = function () { return ({
  withCredentials: true,
}); };

var Klickart = function Klickart(config) {
  if ( config === void 0 ) config = {};

  this.path = config.path;
  this.axios = instance$1(config.klickartUrl);
};

Klickart.prototype.get = function get (resource, config) {
    if ( resource === void 0 ) resource = '';
    if ( config === void 0 ) config = {};

  return this.axios.get(((this.path) + "/" + resource), Object.assign({}, configRequest(), config));
};

Klickart.prototype.put = function put (resource, data, config) {
    if ( resource === void 0 ) resource = '';
    if ( config === void 0 ) config = {};

  return this.axios.put(((this.path) + "/" + resource), data, Object.assign({}, configRequest(), config));
};

Klickart.prototype.post = function post (resource, data, config) {
    if ( resource === void 0 ) resource = '';
    if ( config === void 0 ) config = {};

  return this.axios.post(((this.path) + "/" + resource), data, Object.assign({}, configRequest(), config));
};

Klickart.prototype.delete = function delete$1 (resource, config) {
    if ( resource === void 0 ) resource = '';
    if ( config === void 0 ) config = {};

  return this.axios.delete(((this.path) + "/" + resource), Object.assign({}, configRequest(), config));
};

var TopBar = /*@__PURE__*/(function (Klickart) {
  function TopBar(config) {
    if ( config === void 0 ) config = {};

    config.path = (i18n.locale) + "/partials/top_bar";
    Klickart.call(this, config);
  }

  if ( Klickart ) TopBar.__proto__ = Klickart;
  TopBar.prototype = Object.create( Klickart && Klickart.prototype );
  TopBar.prototype.constructor = TopBar;

  return TopBar;
}(Klickart));

//

var script = {
  name: 'KlickpagesHeader',
  props: {
    klickartUrl: String,
  },
  mounted: function mounted() {
    var this$1 = this;

    var topBarRequest = new TopBar({
      klickartUrl: this.klickartUrl,
    });

    topBarRequest.get().then(function (response) {
      var html = response.data;
      this$1.$el.innerHTML = html;
    });
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div")
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('KlickpagesHeader', __vue_component__);
}

var plugin = {
  install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };