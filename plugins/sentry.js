import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

Sentry.init({
  dsn:
    "https://2cbf1b74001d4540955cea8020e2685f@o384138.ingest.sentry.io/5215002",
  integrations: [new VueIntegration({ Vue, attachProps: true })]
});
