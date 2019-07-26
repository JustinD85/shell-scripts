(ns clojure_fullschtack.server-components.http-server
  (:require
    [clojure_fullschtack.server-components.config :refer [config]]
    [clojure_fullschtack.server-components.middleware :refer [middleware]]
    [mount.core :refer [defstate]]
    [clojure.pprint :refer [pprint]]
    [org.httpkit.server :as http-kit]
    [taoensso.timbre :as log]))

(defstate http-server
  :start
  (let [cfg (::http-kit/config config)]
    (log/info "Starting HTTP Server with config " (with-out-str (pprint cfg)))
    (http-kit/run-server middleware cfg))
  :stop (http-server))