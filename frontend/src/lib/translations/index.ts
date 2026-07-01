// Static Translations Aggregator
import { translations as en } from "./en";
import { translations as hi } from "./hi";
import { translations as mr } from "./mr";
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
import { translations as tr } from "./tr";
import { translations as nl } from "./nl";
import { translations as id } from "./id";
import { translations as vi } from "./vi";
import { translations as th } from "./th";
import { translations as pl } from "./pl";

import { StaticTranslations, LanguageCode } from "../translations";

export const staticTranslations: Record<LanguageCode, StaticTranslations> = {
  en,
  hi,
  mr,
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
  tr,
  nl,
  id,
  vi,
  th,
  pl,
};
