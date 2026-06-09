// Static Translations Aggregator
import { translations as en } from "./en";
import { translations as hi } from "./hi";
import { translations as mr } from "./mr";
import { translations as sa } from "./sa";
import { translations as es } from "./es";
import { translations as fr } from "./fr";
import { translations as de } from "./de";
import { translations as it } from "./it";
import { translations as pt } from "./pt";
import { translations as ru } from "./ru";
import { translations as zh } from "./zh";
import { translations as ja } from "./ja";
import { translations as ko } from "./ko";
import { translations as ar } from "./ar";
import { translations as bn } from "./bn";
import { translations as ta } from "./ta";
import { translations as te } from "./te";
import { translations as ml } from "./ml";
import { translations as kn } from "./kn";
import { translations as gu } from "./gu";
import { translations as pa } from "./pa";
import { translations as tr } from "./tr";
import { translations as nl } from "./nl";

import { StaticTranslations, LanguageCode } from "../translations";

export const staticTranslations: Record<LanguageCode, StaticTranslations> = {
  en,
  hi,
  mr,
  sa,
  es,
  fr,
  de,
  it,
  pt,
  ru,
  zh,
  ja,
  ko,
  ar,
  bn,
  ta,
  te,
  ml,
  kn,
  gu,
  pa,
  tr,
  nl,
};
