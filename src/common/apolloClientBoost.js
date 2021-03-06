/* eslint-disable */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('apollo-client'), require('apollo-link'), require('apollo-cache-inmemory'), require('apollo-link-http'), require('apollo-link-state'), require('apollo-link-error'), require('graphql-tag')) :
      typeof define === 'function' && define.amd ? define(['exports', 'apollo-client', 'apollo-link', 'apollo-cache-inmemory', 'apollo-link-http', 'apollo-link-state', 'apollo-link-error', 'graphql-tag'], factory) :
          (global = global || self, factory((global.apollo = global.apollo || {}, global.apollo.boost = {}), global.apollo.core, global.apolloLink.core, global.apolloCacheInMemory, global.apolloLinkHttp, global.apolloLinkState, global.apolloLinkError, global.graphqlTag));
}(this, function(exports, ApolloClient, apolloLink, apolloCacheInmemory, apolloLinkHttp, apolloLinkState, apolloLinkError, graphqlTag) {
  'use strict';

  var ApolloClient__default = 'default' in ApolloClient ? ApolloClient['default'] : ApolloClient;
  graphqlTag = graphqlTag && graphqlTag.hasOwnProperty('default') ? graphqlTag['default'] : graphqlTag;

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function(d, b) {
          d.__proto__ = b;
        }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return extendStatics(d, b);
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
    __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };

  var PRESET_CONFIG_KEYS = [
    'request',
    'response',
    'uri',
    'credentials',
    'headers',
    'fetch',
    'fetchOptions',
    'clientState',
    'onError',
    'cacheRedirects',
    'cache',
    'name',
    'version',
  ];
  var DefaultClient = (function(_super) {
    __extends(DefaultClient, _super);

    function DefaultClient(config) {
      if (config === void 0) {
        config = {};
      }
      var _this = this;
      if (config) {
        var diff = Object.keys(config).filter(function(key) {
          return PRESET_CONFIG_KEYS.indexOf(key) === -1;
        });
        if (diff.length > 0) {
          console.warn('ApolloBoost was initialized with unsupported options: ' +
              ("" + diff.join(' ')));
        }
      }
      var request = config.request, response = config.response, uri = config.uri, credentials = config.credentials,
          headers = config.headers,
          fetch = config.fetch, fetchOptions = config.fetchOptions, clientState = config.clientState,
          cacheRedirects = config.cacheRedirects, errorCallback = config.onError, name = config.name,
          version = config.version;
      var cache = config.cache;
      if (cache && cacheRedirects) {
        throw new Error('Incompatible cache configuration. If providing `cache` then ' +
            'configure the provided instance with `cacheRedirects` instead.');
      }
      if (!cache) {
        cache = cacheRedirects
            ? new apolloCacheInmemory.InMemoryCache({ cacheRedirects: cacheRedirects })
            : new apolloCacheInmemory.InMemoryCache();
      }
      var stateLink = clientState
          ? apolloLinkState.withClientState(__assign({}, clientState, { cache: cache }))
          : false;
      var errorLink = errorCallback
          ? apolloLinkError.onError(errorCallback)
          : apolloLinkError.onError(function(_a) {
            var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError;
            if (graphQLErrors) {
              graphQLErrors.map(function(_a) {
                var message = _a.message, locations = _a.locations, path = _a.path;
                return console.log("[GraphQL error]: Message: " + message + ", Location: " +
                    (locations + ", Path: " + path));
              });
            }
            if (networkError) {
              console.log("[Network error]: " + networkError);
            }
          });
      var requestHandler = request
          ? new apolloLink.ApolloLink(function(operation, forward) {
            return new apolloLink.Observable(function(observer) {
              var handle;
              Promise.resolve(operation)
                  .then(function(oper) {
                    return request(oper);
                  })
                  .then(function() {
                    handle = forward(operation).subscribe({
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    });
                  })
                  .catch(observer.error.bind(observer));
              return function() {
                if (handle) {
                  handle.unsubscribe();
                }
              };
            });
          })
          : false;
      var responseHandler = response
          ? new apolloLink.ApolloLink(function(operation, forward) {
            return forward(operation).map(res => {
              response(res, operation)
              return res
            })
          })
          : false;
      var httpLink = new apolloLinkHttp.HttpLink({
        uri: uri || '/graphql',
        fetch: fetch,
        fetchOptions: fetchOptions || {},
        credentials: credentials || 'same-origin',
        headers: headers || {},
      });
      var link = apolloLink.ApolloLink.from([
        errorLink,
        requestHandler,
        responseHandler,
        stateLink,
        httpLink,
      ].filter(function(x) {
        return !!x;
      }));
      _this = _super.call(this, { cache: cache, link: link, name: name, version: version }) || this;
      return _this;
    }

    return DefaultClient;
  }(ApolloClient__default));

  Object.keys(ApolloClient).forEach(function(key) {
    exports[key] = ApolloClient[key];
  });
  Object.keys(apolloLink).forEach(function(key) {
    exports[key] = apolloLink[key];
  });
  Object.keys(apolloCacheInmemory).forEach(function(key) {
    exports[key] = apolloCacheInmemory[key];
  });
  exports.HttpLink = apolloLinkHttp.HttpLink;
  exports.gql = graphqlTag;
  exports.default = DefaultClient;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
