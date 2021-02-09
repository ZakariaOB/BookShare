import {City} from './city';
export interface Country {
  id:              number;
  name:            string;
  iso3:            string;
  iso2:            string;
  phone_code:      string;
  capital:         string;
  currency:        string;
  currency_symbol: string;
  native:          string;
  region:          string;
  subregion:       string;
  timezones:       Timezone[];
  translations:    Translations;
  latitude:        string;
  longitude:       string;
  emoji:           string;
  emojiU:          string;
  cities:          City[];
}

export interface Timezone {
  zoneName:      string;
  gmtOffset:     number;
  gmtOffsetName: string;
  abbreviation:  string;
  tzName:        string;
}

export interface Translations {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
}
