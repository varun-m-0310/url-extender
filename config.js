export const APPS = {
  "Loyalty-New": "loyalty/ui/",
  "Loyalty-Old": "loyaltyProgram/index",
  "Loyalty-Promotions": "loyalty/ui/promotions/list",
  "Loyalty-Bulk-Config": "loyalty/ui/bulk-configurations/list",
  Campaigns: "campaigns/ui/list",
  Coupons: "coupons/ui/",
  Journeys: "journey/ui/",
  "Audience-Manager": "audience-manager/list",
  Creatives: "creatives/ui/v2",
  "Insights+": "analytics/v2/",
  Workbench: "businessProcesses/index",
};

export const SONAR_QUBE = {
  SONAR_QUBE: "https://sonarqube.cc-tooling.cctools.capillarytech.com/",
};

export const ENV_PREFIX_MAP = {
  IN: "incrm",
  SG: "sgcrm",
  EU: "eucrm",
  TATA: "tatacrm",
  Nightly: "crm-nightly-new",
  Staging: "crm-staging-new",
  CN: "ningxia-crm",
};

const ENV_SUFFIX_MAP = {
  CN: "cn.",
};

export const PRODUCT_MAP = {
  WETTY: "wetty.",
  RMQ: "rmq-intouch-direct.",
  ROCKMONGO: "rockmongo.",
  ELASTICHQ: "elastichq.",
  GRAFANA: "grafana.",
  KIBANA: "kibana.",
  PMA: "rockmongo.",
};

export const URLGenerator = (env, product, app) =>
  `https://${PRODUCT_MAP[product] || ""}${ENV_PREFIX_MAP[env]}.cc${
    product ? "tools" : ""
  }.capillarytech.${ENV_SUFFIX_MAP[env] || ""}com/${APPS[app] || ""}`;
