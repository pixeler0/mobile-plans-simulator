import React, { useState, useMemo } from 'react';
import {
  Smartphone,
  Wifi,
  Users,
  CreditCard,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Award,
  TrendingDown,
  Store,
  Globe,
  Tv,
  MessageCircle,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Sliders,
  RefreshCw,
  Info,
  ShieldCheck,
  Zap,
  Table,
  Plus,
  Trash2,
  Copy,
  Download,
  Upload,
  Link2,
  Search,
  Check
} from 'lucide-react';

const ALL_CARRIER_KEYS = [
  'docomo',
  'ahamo',
  'au',
  'uq',
  'povo',
  'softbank',
  'ymobile',
  'linemo',
  'rakuten'
];

const CARRIER_STYLES = {
  docomo: {
    name: 'NTT docomo',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    accent: 'border-rose-500',
    bar: 'bg-rose-600',
    lightBg: 'bg-rose-50/60',
    text: 'text-rose-600'
  },
  ahamo: {
    name: 'ahamo (docomo)',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    accent: 'border-purple-500',
    bar: 'bg-purple-600',
    lightBg: 'bg-purple-50/60',
    text: 'text-purple-600'
  },
  au: {
    name: 'au (KDDI)',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    accent: 'border-orange-500',
    bar: 'bg-orange-500',
    lightBg: 'bg-orange-50/60',
    text: 'text-orange-600'
  },
  uq: {
    name: 'UQ mobile (KDDI)',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    accent: 'border-sky-500',
    bar: 'bg-sky-500',
    lightBg: 'bg-sky-50/60',
    text: 'text-sky-600'
  },
  povo: {
    name: 'povo2.0 (KDDI)',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    accent: 'border-amber-500',
    bar: 'bg-amber-500',
    lightBg: 'bg-amber-50/60',
    text: 'text-amber-700'
  },
  softbank: {
    name: 'SoftBank',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
    accent: 'border-slate-500',
    bar: 'bg-slate-600',
    lightBg: 'bg-slate-50/60',
    text: 'text-slate-700'
  },
  ymobile: {
    name: 'Y!mobile',
    badgeBg: 'bg-red-100 text-red-800 border-red-200',
    accent: 'border-red-500',
    bar: 'bg-red-500',
    lightBg: 'bg-red-50/60',
    text: 'text-red-600'
  },
  linemo: {
    name: 'LINEMO (SoftBank)',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    accent: 'border-emerald-500',
    bar: 'bg-emerald-500',
    lightBg: 'bg-emerald-50/60',
    text: 'text-emerald-600'
  },
  rakuten: {
    name: '楽天モバイル',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
    accent: 'border-pink-600',
    bar: 'bg-pink-600',
    lightBg: 'bg-pink-50/60',
    text: 'text-pink-600'
  }
};

const PRESETS = [
  {
    id: 'single_heavy',
    label: '単身・固定回線なし・ギガ無制限',
    desc: '自宅Wi-Fiなし・動画を毎月100GB以上使う方',
    state: {
      dataGB: 100,
      ageGroup: 'adult',
      broadband: 'none',
      denki: 'none',
      docomoYears: 'none',
      familyCarrier: 'none',
      familyCount: 1,
      card: 'rakuten',
      callType: 'short',
      allowAppCall: true,
      monthlySpend: 50000,
      currentBill: 7500,
      needs: {
        storeSupport: false,
        lineFree: false,
        overseas: false,
        dazn: false,
        unext: false
      }
    }
  },
  {
    id: 'docomo_family_light',
    label: 'ドコモ光＋dカード・月3GBライト層',
    desc: '自宅はドコモ光で外出先の通信が少ない方',
    state: {
      dataGB: 3,
      ageGroup: 'adult',
      broadband: 'docomo',
      denki: 'docomo',
      docomoYears: '20plus',
      familyCarrier: 'docomo',
      familyCount: 3,
      card: 'dcard_gold',
      callType: 'none',
      allowAppCall: false,
      monthlySpend: 80000,
      currentBill: 5500,
      needs: {
        storeSupport: true,
        lineFree: false,
        overseas: false,
        dazn: false,
        unext: false
      }
    }
  },
  {
    id: 'sb_middle',
    label: 'SB光＋PayPay経済圏・月25GB',
    desc: 'SNSや動画をしっかり使い店舗サポートも欲しい方',
    state: {
      dataGB: 25,
      ageGroup: 'adult',
      broadband: 'softbank',
      denki: 'softbank',
      docomoYears: 'none',
      familyCarrier: 'softbank',
      familyCount: 3,
      card: 'paypay_gold',
      callType: 'short',
      allowAppCall: false,
      monthlySpend: 60000,
      currentBill: 6800,
      needs: {
        storeSupport: true,
        lineFree: false,
        overseas: false,
        dazn: false,
        unext: false
      }
    }
  },
  {
    id: 'senior_talk',
    label: '65歳以上シニア・24時間かけ放題＆店舗重視',
    desc: '通話をたくさん使い、ショップで相談したい方',
    state: {
      dataGB: 4,
      ageGroup: 'senior65',
      broadband: 'au',
      denki: 'au',
      docomoYears: 'none',
      familyCarrier: 'au',
      familyCount: 2,
      card: 'aupay',
      callType: 'unlimited',
      allowAppCall: false,
      monthlySpend: 30000,
      currentBill: 6000,
      needs: {
        storeSupport: true,
        lineFree: false,
        overseas: false,
        dazn: false,
        unext: false
      }
    }
  },
  {
    id: 'student_20gb',
    label: '高校生（18歳以下）・月15GB＆LINE重視',
    desc: '学割を活用して20GB前後を安く使いたい学生',
    state: {
      dataGB: 15,
      ageGroup: 'u18',
      broadband: 'au',
      denki: 'au',
      docomoYears: 'none',
      familyCarrier: 'au',
      familyCount: 3,
      card: 'aupay',
      callType: 'none',
      allowAppCall: true,
      monthlySpend: 10000,
      currentBill: 4500,
      needs: {
        storeSupport: false,
        lineFree: true,
        overseas: false,
        dazn: false,
        unext: false
      }
    }
  }
];

// スプレッドシートの初期マスタデータ（1行＝1プランまたは1容量段階）
const INITIAL_SPREADSHEET_ROWS = [
  {
    id: 'docomo_max_1gb',
    enabled: true,
    planGroup: 'docomo_max',
    carrierKey: 'docomo',
    category: '無制限',
    name: 'ドコモ MAX（〜1GB段階）',
    dataLabel: '〜1GB（3段階制・最大無制限）',
    minData: 0,
    maxData: 1,
    ageCondition: 'all',
    basePrice: 5698,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'docomo',
    famDiscount2: 550,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 110,
    longTerm20Discount: 220,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモ MAX 60歳以上割',
    limitedAmount: 2970,
    limitedPeriod: '最大3カ月間',
    limitedAgeCondition: 'senior60',
    limitedNote: '60歳以上は最大3カ月間 -2,970円割引',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: true,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'DAZN見放題（月額4,200円相当）が追加料金なしで標準付帯|海外ローミングが30GBまで追加料金なし|長期利用割（最大-220円）＆ドコモでんき割（-110円）対応',
    warningText: ''
  },
  {
    id: 'docomo_max_3gb',
    enabled: true,
    planGroup: 'docomo_max',
    carrierKey: 'docomo',
    category: '無制限',
    name: 'ドコモ MAX（1〜3GB段階）',
    dataLabel: '1GB超〜3GB（3段階制・最大無制限）',
    minData: 2,
    maxData: 3,
    ageCondition: 'all',
    basePrice: 6798,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'docomo',
    famDiscount2: 550,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 110,
    longTerm20Discount: 220,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモ MAX 60歳以上割',
    limitedAmount: 2970,
    limitedPeriod: '最大3カ月間',
    limitedAgeCondition: 'senior60',
    limitedNote: '60歳以上は最大3カ月間 -2,970円割引',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: true,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'DAZN見放題（月額4,200円相当）が追加料金なしで標準付帯|海外ローミングが30GBまで追加料金なし|長期利用割（最大-220円）＆ドコモでんき割（-110円）対応',
    warningText: ''
  },
  {
    id: 'docomo_max_u22_28gb',
    enabled: true,
    planGroup: 'docomo_max_u22',
    carrierKey: 'docomo',
    category: '学割・無制限',
    name: 'ドコモ MAX（ドコモU22割：〜28GB）',
    dataLabel: '〜28GB（通常1GB＋ボーナス27GB・最大7カ月）',
    minData: 0,
    maxData: 28,
    ageCondition: 'u22',
    basePrice: 5698,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'docomo',
    famDiscount2: 550,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 110,
    longTerm20Discount: 220,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモU22割（+27GB＆割引）',
    limitedAmount: 2728,
    limitedPeriod: '最大7カ月間',
    limitedAgeCondition: 'u22',
    limitedNote: '22歳以下対象！毎月27GB進呈＆-2,728円割引（光・家族3人・dカードGOLD併用で7カ月間0円）',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: true,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '22歳以下なら最大7カ月間「毎月27GBボーナス進呈」で28GBまで基本5,698円段階のまま利用可能！|ドコモU22割(-2,728円)＋ドコモ光(-1,210円)＋家族3回線(-1,210円)＋dカードGOLD(-550円)で最大7カ月間は月額0円！|DAZN見放題＆海外ローミング30GB無料も標準付帯',
    warningText: '8カ月目以降は27GBボーナスとU22割が終了し、4GB以上使う場合は無制限段階（基本8,448円）に移行します（U22割適用中はでんき割・長期割は対象外となり8カ月目から適用）'
  },
  {
    id: 'docomo_max_u22_30gb',
    enabled: true,
    planGroup: 'docomo_max_u22',
    carrierKey: 'docomo',
    category: '学割・無制限',
    name: 'ドコモ MAX（ドコモU22割：28〜30GB）',
    dataLabel: '28〜30GB（通常3GB＋ボーナス27GB・最大7カ月）',
    minData: 29,
    maxData: 30,
    ageCondition: 'u22',
    basePrice: 6798,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'docomo',
    famDiscount2: 550,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 110,
    longTerm20Discount: 220,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモU22割（+27GB＆割引）',
    limitedAmount: 3828,
    limitedPeriod: '最大7カ月間',
    limitedAgeCondition: 'u22',
    limitedNote: '22歳以下対象！毎月27GB進呈＆-3,828円割引（光・家族3人・dカードGOLD併用で7カ月間0円）',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: true,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '22歳以下なら最大7カ月間「毎月27GBボーナス進呈」＋「-3,828円割引」で30GBまで実質2,970円（セット割なし時）！|ドコモ光＋家族3回線＋dカードGOLD併用なら30GBまで最大7カ月間は月額0円！|DAZN見放題＆海外ローミング30GB無料も標準付帯',
    warningText: '8カ月目以降は27GBボーナスとU22割が終了し、4GB以上使う場合は無制限段階（基本8,448円）に移行します（U22割適用中はでんき割・長期割は対象外となり8カ月目から適用）'
  },
  {
    id: 'docomo_max_unlim',
    enabled: true,
    planGroup: 'docomo_max',
    carrierKey: 'docomo',
    category: '無制限',
    name: 'ドコモ MAX（無制限）',
    dataLabel: 'データ無制限（3段階制）',
    minData: 4,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 8448,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'docomo',
    famDiscount2: 550,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 110,
    longTerm20Discount: 220,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモU22割（無制限段階）',
    limitedAmount: 550,
    limitedPeriod: '最大7カ月間',
    limitedAgeCondition: 'u22',
    limitedNote: '22歳以下は30GB超（無制限）利用時も最大7カ月間-550円割引（フル割引時4,928円）',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: true,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'DAZN見放題（月額4,200円相当）が標準付帯|海外ローミング30GBまで無料|22歳以下は「ドコモU22割」で無制限時も7カ月間-550円（通常時は光・家族・カード・でんき・長期割で5,148円）',
    warningText: ''
  },
  {
    id: 'docomo_poikatsu_max',
    enabled: true,
    planGroup: 'docomo_poikatsu_max',
    carrierKey: 'docomo',
    category: '無制限・ポイ活',
    name: 'ドコモ ポイ活 MAX',
    dataLabel: 'データ無制限',
    minData: 0,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 11748,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'docomo',
    famDiscount2: 550,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 110,
    longTerm20Discount: 220,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: true,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 5,
    poikatsuRateGold: 10,
    poikatsuCap: 5000,
    reasonsText: 'dカード決済で毎月最大5,000ptのポイント還元|DAZN見放題＆海外30GB無料が標準付帯|長期利用割（最大-220円）＆ドコモでんき割（-110円）対応',
    warningText: 'dカード以外の決済ではポイント還元メリットが小さくなります'
  },
  {
    id: 'docomo_mini_4gb',
    enabled: true,
    planGroup: 'docomo_mini',
    carrierKey: 'docomo',
    category: 'ミニプラン',
    name: 'ドコモ mini（4GB）',
    dataLabel: '4GB',
    minData: 0,
    maxData: 4,
    ageCondition: 'all',
    basePrice: 2750,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 550,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 0,
    zouryoFee: 0,
    zouryoFreeMonths: 0,
    reasonsText: 'ドコモ光＋dカード＋ドコモでんき適用で月額880円から維持可能|全国のドコモショップでサポート対応',
    warningText: '光回線やdカードがない場合は割高になりやすいプランです'
  },
  {
    id: 'docomo_mini_10gb',
    enabled: true,
    planGroup: 'docomo_mini',
    carrierKey: 'docomo',
    category: 'ミニプラン',
    name: 'ドコモ mini（10GB）',
    dataLabel: '10GB',
    minData: 5,
    maxData: 10,
    ageCondition: 'all',
    basePrice: 3850,
    bbTarget: 'docomo',
    bbDiscount: 1210,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 550,
    cardDiscountGold: 550,
    denkiTarget: 'docomo',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 0,
    zouryoFee: 0,
    zouryoFreeMonths: 0,
    reasonsText: 'ドコモ光＋dカード＋ドコモでんき適用で10GB 月額1,980円|全国のドコモショップでサポート対応',
    warningText: '光回線やdカードがない場合はahamo等の方が安くなります'
  },
  {
    id: 'ahamo_30gb',
    enabled: true,
    planGroup: 'ahamo',
    carrierKey: 'ahamo',
    category: 'オンライン',
    name: 'ahamo（30GB）',
    dataLabel: '30GB',
    minData: 0,
    maxData: 30,
    ageCondition: 'all',
    basePrice: 2970,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 0,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: false,
    callDefaultNote: '1回5分以内国内通話無料が標準付帯',
    hasStoreSupport: false,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 0,
    zouryoFee: 0,
    zouryoFreeMonths: 0,
    reasonsText: '光回線や家族割がなくても単身で2,970円のシンプル設計|1回5分以内の国内通話無料＆海外30GB無料が標準付帯',
    warningText: ''
  },
  {
    id: 'ahamo_110gb',
    enabled: true,
    planGroup: 'ahamo',
    carrierKey: 'ahamo',
    category: 'オンライン',
    name: 'ahamo 大盛り（110GB）',
    dataLabel: '110GB',
    minData: 31,
    maxData: 110,
    ageCondition: 'all',
    basePrice: 4950,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 0,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: false,
    callDefaultNote: '1回5分以内国内通話無料が標準付帯',
    hasStoreSupport: false,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '110GBの大容量をセット割なしで4,950円|1回5分以内の国内通話無料が標準付帯',
    warningText: ''
  },
  {
    id: 'docomo_u15_5gb',
    enabled: true,
    planGroup: 'docomo_u15_debut',
    carrierKey: 'docomo',
    category: '学割・デビュー',
    name: 'スマホデビュープラン U15（〜5GB）',
    dataLabel: '〜5GB（2段階制・最大20GB）',
    minData: 0,
    maxData: 5,
    ageCondition: 'u15',
    basePrice: 2508,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモ 親子割(U15)',
    limitedAmount: 1100,
    limitedPeriod: '最大12カ月間',
    limitedAgeCondition: 'u15',
    limitedNote: '5〜15歳のお子様および家族の条件適用で',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '5〜15歳限定！最大20GB対応の2段階制スマホデビュープラン|親子割で1年目は大幅割引',
    warningText: ''
  },
  {
    id: 'docomo_u15_20gb',
    enabled: true,
    planGroup: 'docomo_u15_debut',
    carrierKey: 'docomo',
    category: '学割・デビュー',
    name: 'スマホデビュープラン U15（5〜20GB）',
    dataLabel: '5GB〜20GB（2段階制）',
    minData: 6,
    maxData: 20,
    ageCondition: 'u15',
    basePrice: 3278,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'dcard',
    cardDiscountNormal: 220,
    cardDiscountGold: 550,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ドコモ 親子割(U15)',
    limitedAmount: 1870,
    limitedPeriod: '最大12カ月間',
    limitedAgeCondition: 'u15',
    limitedNote: '5〜15歳のお子様および家族の条件適用で',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '5〜15歳限定！最大20GB対応の2段階制スマホデビュープラン|親子割で1年目は大幅割引',
    warningText: ''
  },
  {
    id: 'au_valuelink_1gb',
    enabled: true,
    planGroup: 'au_valuelink',
    carrierKey: 'au',
    category: '無制限',
    name: 'auバリューリンクプラン（〜1GB時）',
    dataLabel: '〜1GB自動割引時（最大無制限）',
    minData: 0,
    maxData: 1,
    ageCondition: 'all',
    basePrice: 6358,
    bbTarget: 'au',
    bbDiscount: 1100,
    famTarget: 'au',
    famDiscount2: 660,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '月1GB以下の月は自動で1,650円割引（割引後3,828円）|Pontaパス（月額548円相当）・au Starlink Direct・au海外放題が標準セット|auスマートバリュー＋家族割プラス＋カード割で最大2,530円割引',
    warningText: ''
  },
  {
    id: 'au_valuelink_unlim',
    enabled: true,
    planGroup: 'au_valuelink',
    carrierKey: 'au',
    category: '無制限',
    name: 'auバリューリンクプラン',
    dataLabel: 'データ無制限（Pontaパス・海外放題付）',
    minData: 2,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 8008,
    bbTarget: 'au',
    bbDiscount: 1100,
    famTarget: 'au',
    famDiscount2: 660,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'au U18バリューリンク割 / 親子割',
    limitedAmount: 1650,
    limitedPeriod: '最大1年間（12カ月）',
    limitedAgeCondition: 'u18',
    limitedNote: '18歳以下および家族の条件適用時',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'Pontaパス（月額548円相当）・au Starlink Direct・au海外放題（月15日分）が標準セット|スマートバリュー＋家族割プラス＋カード割で毎月最大2,530円割引（割引後5,478円）',
    warningText: ''
  },
  {
    id: 'au_u12_value',
    enabled: true,
    planGroup: 'au_u12_value',
    carrierKey: 'au',
    category: '学割・キッズ',
    name: 'au U12バリュープラン',
    dataLabel: '〜1GB（最大300kbps・あんしん通信）',
    minData: 0,
    maxData: 1,
    ageCondition: 'u12',
    basePrice: 1870,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'au',
    famDiscount2: 1100,
    famDiscount3: 1100,
    bbFamExclusive: false,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 0,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: false,
    callDefaultNote: '1回5分以内国内通話無料＆家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '5〜12歳限定！家族割プラス(-1,100円)＋au PAYカード割(-220円)で月額550円|1回5分以内の国内通話無料が標準付帯＆送受信最大300kbpsで使いすぎ防止',
    warningText: '通信速度が最大300kbpsに制限されるため動画視聴等には不向きです'
  },
  {
    id: 'au_u18_value_3gb',
    enabled: true,
    planGroup: 'au_u18_value',
    carrierKey: 'au',
    category: '学割',
    name: 'au U18バリュープラン（〜3GB）',
    dataLabel: '〜3GB（2段階制）',
    minData: 0,
    maxData: 3,
    ageCondition: 'u18',
    basePrice: 2398,
    bbTarget: 'au',
    bbDiscount: 550,
    famTarget: 'au',
    famDiscount2: 220,
    famDiscount3: 550,
    bbFamExclusive: false,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '1年限りではなく22歳になるまでずっと学割料金が継続！',
    warningText: ''
  },
  {
    id: 'au_u18_value_20gb',
    enabled: true,
    planGroup: 'au_u18_value',
    carrierKey: 'au',
    category: '学割',
    name: 'au U18バリュープラン（3〜20GB）',
    dataLabel: '3GB〜20GB（2段階制）',
    minData: 4,
    maxData: 20,
    ageCondition: 'u18',
    basePrice: 4048,
    bbTarget: 'au',
    bbDiscount: 550,
    famTarget: 'au',
    famDiscount2: 220,
    famDiscount3: 550,
    bbFamExclusive: false,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'au親子応援割 (U18)',
    limitedAmount: 1650,
    limitedPeriod: '最大1年間（12カ月）',
    limitedAgeCondition: 'u18',
    limitedNote: '5〜18歳および家族の条件適用で1年間さらに割引',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '1年限りではなく22歳になるまでずっと学割料金が継続！|スマートバリュー＋家族割3人＋カード割で通常時も2,728円',
    warningText: ''
  },
  {
    id: 'au_senior_value',
    enabled: true,
    planGroup: 'au_senior_value',
    carrierKey: 'au',
    category: 'シニア',
    name: 'au シニアバリュープラン（5GB）',
    dataLabel: '5GB',
    minData: 0,
    maxData: 5,
    ageCondition: 'senior60',
    basePrice: 4048,
    bbTarget: 'au',
    bbDiscount: 1100,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 0,
    callUnlimitedFee: 880,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '5分かけ放題＋迷惑電話撃退＋留守電EXが標準付帯',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '60歳以上限定！5分かけ放題・迷惑電話対策・留守電EXが標準セット|全国のauショップで対面サポート対応',
    warningText: ''
  },
  {
    id: 'uq_tokutoku2_5gb',
    enabled: true,
    planGroup: 'uq_tokutoku2',
    carrierKey: 'uq',
    category: 'サブブランド',
    name: 'UQ mobile トクトクプラン2（〜5GB）',
    dataLabel: '〜5GB（段階制・繰越可）',
    minData: 0,
    maxData: 5,
    ageCondition: 'all',
    basePrice: 2948,
    bbTarget: 'au',
    bbDiscount: 1100,
    famTarget: 'au',
    famDiscount2: 550,
    famDiscount3: 550,
    bbFamExclusive: true,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'au',
    denkiDiscount: 1100,
    denkiExclusive: true,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 0,
    zouryoFee: 0,
    zouryoFreeMonths: 0,
    reasonsText: 'auひかり等のネット回線または「auでんき」で自宅セット割（-1,100円）適用|自宅セット割＋カード割で月額1,628円',
    warningText: ''
  },
  {
    id: 'uq_tokutoku2_30gb',
    enabled: true,
    planGroup: 'uq_tokutoku2',
    carrierKey: 'uq',
    category: 'サブブランド',
    name: 'UQ mobile トクトクプラン2（〜30GB）',
    dataLabel: '〜30GB（段階制・繰越可）',
    minData: 6,
    maxData: 30,
    ageCondition: 'all',
    basePrice: 4048,
    bbTarget: 'au',
    bbDiscount: 1100,
    famTarget: 'au',
    famDiscount2: 550,
    famDiscount3: 550,
    bbFamExclusive: true,
    cardTarget: 'aupay',
    cardDiscountNormal: 220,
    cardDiscountGold: 220,
    denkiTarget: 'au',
    denkiDiscount: 1100,
    denkiExclusive: true,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'UQ親子応援割',
    limitedAmount: 1650,
    limitedPeriod: '最大1年間（12カ月）',
    limitedAgeCondition: 'u18',
    limitedNote: '18歳以下およびその家族なら誰でも適用',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 5,
    zouryoFee: 550,
    zouryoFreeMonths: 7,
    reasonsText: 'auひかり等のネット回線または「auでんき」で自宅セット割（-1,100円）適用|増量オプションⅡ（7カ月無料）適用時は最大35GBまで利用可能',
    warningText: ''
  },
  {
    id: 'uq_komikomi_value',
    enabled: true,
    planGroup: 'uq_komikomi_value',
    carrierKey: 'uq',
    category: 'サブブランド',
    name: 'UQ mobile コミコミプランバリュー（35GB）',
    dataLabel: '35GB（繰越可）＋Pontaパス付',
    minData: 0,
    maxData: 35,
    ageCondition: 'all',
    basePrice: 3828,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'UQコミコミおトク割',
    limitedAmount: 660,
    limitedPeriod: '最大13カ月間',
    limitedAgeCondition: 'all',
    limitedNote: '光回線不要！プラン加入で誰でも適用',
    callShortFee: 0,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '1回10分以内の国内通話無料が標準付帯',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 5,
    zouryoFee: 550,
    zouryoFreeMonths: 7,
    reasonsText: '光回線セット割なしで誰でも定額（「コミコミおトク割」で最大13カ月間は月額3,168円！）|増量オプションⅡ（7カ月無料）で最大40GBまで対応',
    warningText: ''
  },
  {
    id: 'povo2_3gb',
    enabled: true,
    planGroup: 'povo2',
    carrierKey: 'povo',
    category: 'オンライン',
    name: 'povo2.0（3GB / 30日間）',
    dataLabel: '3GB（30日間トッピング）',
    minData: 0,
    maxData: 3,
    ageCondition: 'all',
    basePrice: 990,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 550,
    callUnlimitedFee: 1650,
    callSeniorUnlimitedFee: 1650,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: false,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '基本料0円で固定回線や家族割がなくても単身で最安クラスのトッピング制|5分かけ放題トッピングも月額550円と割安',
    warningText: '180日間有料トッピング購入がない場合は利用停止となります'
  },
  {
    id: 'povo2_20gb',
    enabled: true,
    planGroup: 'povo2',
    carrierKey: 'povo',
    category: 'オンライン',
    name: 'povo2.0（20GB相当）',
    dataLabel: '20GB（まとめ買い月換算）',
    minData: 4,
    maxData: 20,
    ageCondition: 'all',
    basePrice: 2160,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 550,
    callUnlimitedFee: 1650,
    callSeniorUnlimitedFee: 1650,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: false,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '基本料0円で固定回線や家族割がなくても単身で最安クラスのトッピング制',
    warningText: '180日間有料トッピング購入がない場合は利用停止となります'
  },
  {
    id: 'povo2_30gb',
    enabled: true,
    planGroup: 'povo2',
    carrierKey: 'povo',
    category: 'オンライン',
    name: 'povo2.0（30GB / 30日間）',
    dataLabel: '30GB（30日間トッピング）',
    minData: 21,
    maxData: 30,
    ageCondition: 'all',
    basePrice: 2780,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 550,
    callUnlimitedFee: 1650,
    callSeniorUnlimitedFee: 1650,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: false,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '基本料0円で固定回線や家族割がなくても単身で最安クラスのトッピング制',
    warningText: '180日間有料トッピング購入がない場合は利用停止となります'
  },
  {
    id: 'sb_teigaku',
    enabled: true,
    planGroup: 'sb_teigaku',
    carrierKey: 'softbank',
    category: '無制限',
    name: 'SoftBank テイガク無制限',
    dataLabel: 'データ無制限',
    minData: 0,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 8008,
    bbTarget: 'softbank',
    bbDiscount: 1100,
    famTarget: 'softbank',
    famDiscount2: 660,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'paypay',
    cardDiscountNormal: 187,
    cardDiscountGold: 550,
    denkiTarget: 'softbank',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 200,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '毎月200ptのPayPayポイント付与＋海外データ放題対応|おうち割 光セット＋家族割＋カード割＋おうち割 でんきセット（-110円）対応',
    warningText: ''
  },
  {
    id: 'sb_peitoku2',
    enabled: true,
    planGroup: 'sb_peitoku2',
    carrierKey: 'softbank',
    category: '無制限・ポイ活',
    name: 'SoftBank ペイトク2',
    dataLabel: 'データ無制限',
    minData: 0,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 10538,
    bbTarget: 'softbank',
    bbDiscount: 1100,
    famTarget: 'softbank',
    famDiscount2: 660,
    famDiscount3: 1210,
    bbFamExclusive: false,
    cardTarget: 'paypay',
    cardDiscountNormal: 187,
    cardDiscountGold: 550,
    denkiTarget: 'softbank',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 1980,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 5,
    poikatsuRateGold: 8,
    poikatsuCap: 4000,
    reasonsText: 'PayPay決済で毎月最大4,000ptのポイント還元|おうち割 でんきセット（-110円）併用可',
    warningText: ''
  },
  {
    id: 'sb_debut_light_4gb',
    enabled: true,
    planGroup: 'sb_debut',
    carrierKey: 'softbank',
    category: '学割・デビュー',
    name: 'SoftBank スマホデビュープラン＋ ライト（4GB）',
    dataLabel: '4GB',
    minData: 0,
    maxData: 4,
    ageCondition: 'u22',
    basePrice: 2453,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'paypay',
    cardDiscountNormal: 187,
    cardDiscountGold: 187,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '1年おトク割＋',
    limitedAmount: 1188,
    limitedPeriod: '1年間（12カ月間）',
    limitedAgeCondition: 'all',
    limitedNote: '5〜22歳の新規またはガラケーからののりかえで1年間割引',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '5〜22歳のスマホデビュー（またはガラケーからの乗換）で1年間は月額1,078円（PayPayカード割適用時）|全国のソフトバンクショップで対面サポート対応',
    warningText: '光セット割や新みんな家族割の割引額は対象外（家族回線数のカウント対象には含まれます）'
  },
  {
    id: 'sb_debut_basic_20gb',
    enabled: true,
    planGroup: 'sb_debut',
    carrierKey: 'softbank',
    category: '学割・デビュー',
    name: 'SoftBank スマホデビュープラン＋ ベーシック（20GB）',
    dataLabel: '20GB',
    minData: 5,
    maxData: 20,
    ageCondition: 'u22',
    basePrice: 4103,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'paypay',
    cardDiscountNormal: 187,
    cardDiscountGold: 187,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '1年おトク割＋ ＆ デビュー特典(割引)',
    limitedAmount: 2838,
    limitedPeriod: '最大6カ月間（7〜12カ月目は-1,188円）',
    limitedAgeCondition: 'u18',
    limitedNote: '1年おトク割＋(-1,188円×12カ月)＋5〜18歳デビュー特典(-1,650円×6カ月)',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '家族間通話無料',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '5〜18歳のデビュー特典適用で最初の6カ月間は20GBが月額1,078円！（7〜12カ月目は2,728円、2年目以降3,916円）|親がソフトバンクなら「デビュー特典（セット割）」で親の料金も1年間-1,078円',
    warningText: ''
  },
  {
    id: 'ymobile_simple3_s',
    enabled: true,
    planGroup: 'ymobile_simple3',
    carrierKey: 'ymobile',
    category: 'サブブランド',
    name: 'Y!mobile シンプル3 S（5GB）',
    dataLabel: '5GB（翌月繰越対応）',
    minData: 0,
    maxData: 5,
    ageCondition: 'all',
    basePrice: 3278,
    bbTarget: 'softbank',
    bbDiscount: 1650,
    famTarget: 'softbank',
    famDiscount2: 1100,
    famDiscount3: 1100,
    bbFamExclusive: true,
    cardTarget: 'paypay',
    cardDiscountNormal: 330,
    cardDiscountGold: 550,
    denkiTarget: 'softbank',
    denkiDiscount: 110,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 2,
    zouryoFee: 550,
    zouryoFreeMonths: 7,
    reasonsText: '全国のワイモバイルショップで対面サポート対応＆LINE年齢認証・LYPプレミアム特典付帯|データ増量オプション（7カ月無料）で最大7GBまで利用可能',
    warningText: 'おうち割や家族割がない場合はLINEMOやpovoの方が安くなります'
  },
  {
    id: 'ymobile_simple3_m',
    enabled: true,
    planGroup: 'ymobile_simple3',
    carrierKey: 'ymobile',
    category: 'サブブランド',
    name: 'Y!mobile シンプル3 M（30GB）',
    dataLabel: '30GB（翌月繰越対応）',
    minData: 6,
    maxData: 30,
    ageCondition: 'all',
    basePrice: 4378,
    bbTarget: 'softbank',
    bbDiscount: 1650,
    famTarget: 'softbank',
    famDiscount2: 1100,
    famDiscount3: 1100,
    bbFamExclusive: true,
    cardTarget: 'paypay',
    cardDiscountNormal: 330,
    cardDiscountGold: 550,
    denkiTarget: 'softbank',
    denkiDiscount: 1100,
    denkiExclusive: true,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ワイモバイル 超！おトク割',
    limitedAmount: 1100,
    limitedPeriod: '1年間（12カ月間）',
    limitedAgeCondition: 'all',
    limitedNote: 'シンプル3 M/L加入で誰でも適用（光・家族・でんき割と排他）',
    callShortFee: 880,
    callUnlimitedFee: 1980,
    callSeniorUnlimitedFee: 880,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 5,
    zouryoFee: 550,
    zouryoFreeMonths: 7,
    reasonsText: 'おうち割 光セット(-1,650円)または「おうち割 でんきセット(E)(-1,100円)」に対応|データ増量オプション（7カ月無料）で最大35GBまで対応',
    warningText: ''
  },
  {
    id: 'ymobile_simple3_l',
    enabled: true,
    planGroup: 'ymobile_simple3',
    carrierKey: 'ymobile',
    category: 'サブブランド',
    name: 'Y!mobile シンプル3 L（35GB）',
    dataLabel: '35GB（翌月繰越対応）',
    minData: 31,
    maxData: 35,
    ageCondition: 'all',
    basePrice: 5478,
    bbTarget: 'softbank',
    bbDiscount: 1650,
    famTarget: 'softbank',
    famDiscount2: 1100,
    famDiscount3: 1100,
    bbFamExclusive: true,
    cardTarget: 'paypay',
    cardDiscountNormal: 330,
    cardDiscountGold: 550,
    denkiTarget: 'softbank',
    denkiDiscount: 1100,
    denkiExclusive: true,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: 'ワイモバイル 超！おトク割',
    limitedAmount: 1100,
    limitedPeriod: '1年間（12カ月間）',
    limitedAgeCondition: 'all',
    limitedNote: 'シンプル3 M/L加入で誰でも適用（光・家族・でんき割と排他）',
    callShortFee: 0,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 0,
    useRakutenLink: false,
    callDefaultNote: '1回10分以内の国内通話無料が標準付帯',
    hasStoreSupport: true,
    hasOverseasFree: false,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    zouryoAddGB: 5,
    zouryoFee: 550,
    zouryoFreeMonths: 7,
    reasonsText: '10分かけ放題が標準付帯（60歳以上は24時間かけ放題が無料！）|データ増量オプション（7カ月無料）で最大40GBまで対応',
    warningText: ''
  },
  {
    id: 'linemo_best_3gb',
    enabled: true,
    planGroup: 'linemo_best',
    carrierKey: 'linemo',
    category: 'オンライン',
    name: 'LINEMO ベストプラン（〜3GB）',
    dataLabel: '3GB ＋ LINEギガフリー',
    minData: 0,
    maxData: 3,
    ageCondition: 'all',
    basePrice: 990,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 550,
    callUnlimitedFee: 1650,
    callSeniorUnlimitedFee: 1650,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: false,
    hasOverseasFree: false,
    hasLineFree: true,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'LINEのトーク・音声通話・ビデオ通話のギガ消費がゼロ（LINEギガフリー）|ソフトバンク品質をセット割なしで月額990円',
    warningText: ''
  },
  {
    id: 'linemo_best_10gb',
    enabled: true,
    planGroup: 'linemo_best',
    carrierKey: 'linemo',
    category: 'オンライン',
    name: 'LINEMO ベストプラン（〜10GB）',
    dataLabel: '10GB ＋ LINEギガフリー',
    minData: 4,
    maxData: 10,
    ageCondition: 'all',
    basePrice: 2090,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 550,
    callUnlimitedFee: 1650,
    callSeniorUnlimitedFee: 1650,
    useRakutenLink: false,
    callDefaultNote: '従量制 (22円/30秒)',
    hasStoreSupport: false,
    hasOverseasFree: false,
    hasLineFree: true,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'LINEのトーク・通話のギガ消費がゼロ（LINEギガフリー）|ソフトバンク品質をセット割なしで格安利用',
    warningText: ''
  },
  {
    id: 'linemo_best_v',
    enabled: true,
    planGroup: 'linemo_best',
    carrierKey: 'linemo',
    category: 'オンライン',
    name: 'LINEMO ベストプランV（30GB）',
    dataLabel: '30GB ＋ LINEギガフリー',
    minData: 11,
    maxData: 30,
    ageCondition: 'all',
    basePrice: 2970,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'none',
    famDiscount2: 0,
    famDiscount3: 0,
    bbFamExclusive: false,
    cardTarget: 'none',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 0,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: false,
    callDefaultNote: '1回5分以内の国内通話無料が標準付帯',
    hasStoreSupport: false,
    hasOverseasFree: false,
    hasLineFree: true,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '30GB＋5分通話無料＋LINEギガフリーがセット割なしで月額2,970円',
    warningText: ''
  },
  {
    id: 'rakuten_saikyo_3gb',
    enabled: true,
    planGroup: 'rakuten_saikyo',
    carrierKey: 'rakuten',
    category: 'ミニプラン・段階制',
    name: 'Rakuten最強プラン（〜3GB段階）',
    dataLabel: '〜3GB（自動3段階）',
    minData: 0,
    maxData: 3,
    ageCondition: 'all',
    basePrice: 1078,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'rakuten',
    famDiscount2: 110,
    famDiscount3: 110,
    bbFamExclusive: false,
    cardTarget: 'rakuten',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 440,
    youthDiscountU22: 110,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 1100,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: true,
    callDefaultNote: 'Rakuten Linkアプリ利用で国内通話24時間無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '光回線セット割なしで誰でも〜3GB 1,078円|Rakuten Linkアプリで国内通話24時間無料|全国ショップ対応',
    warningText: ''
  },
  {
    id: 'rakuten_saikyo_20gb',
    enabled: true,
    planGroup: 'rakuten_saikyo',
    carrierKey: 'rakuten',
    category: 'ミニプラン・段階制',
    name: 'Rakuten最強プラン（3〜20GB段階）',
    dataLabel: '3〜20GB（自動3段階）',
    minData: 4,
    maxData: 20,
    ageCondition: 'all',
    basePrice: 2178,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'rakuten',
    famDiscount2: 110,
    famDiscount3: 110,
    bbFamExclusive: false,
    cardTarget: 'rakuten',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 110,
    youthDiscountU22: 110,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 1100,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: true,
    callDefaultNote: 'Rakuten Linkアプリ利用で国内通話24時間無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '光回線セット割なしで20GBまで2,178円|Rakuten Linkアプリで国内通話24時間無料|全国ショップ対応',
    warningText: ''
  },
  {
    id: 'rakuten_saikyo_unlim',
    enabled: true,
    planGroup: 'rakuten_saikyo',
    carrierKey: 'rakuten',
    category: '無制限',
    name: 'Rakuten最強プラン（無制限）',
    dataLabel: 'データ無制限（20GB超）',
    minData: 21,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 3278,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'rakuten',
    famDiscount2: 110,
    famDiscount3: 110,
    bbFamExclusive: false,
    cardTarget: 'rakuten',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 110,
    youthDiscountU22: 110,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 1100,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: true,
    callDefaultNote: 'Rakuten Linkアプリ利用で国内通話24時間無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: false,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: '光回線セット割なしでデータ無制限3,278円！|Rakuten Linkアプリで国内通話24時間無料|全国ショップ対応',
    warningText: ''
  },
  {
    id: 'rakuten_unext',
    enabled: true,
    planGroup: 'rakuten_unext',
    carrierKey: 'rakuten',
    category: '無制限・エンタメ',
    name: 'Rakuten最強U-NEXT',
    dataLabel: 'データ無制限 ＋ U-NEXT見放題',
    minData: 0,
    maxData: 999,
    ageCondition: 'all',
    basePrice: 4378,
    bbTarget: 'none',
    bbDiscount: 0,
    famTarget: 'rakuten',
    famDiscount2: 110,
    famDiscount3: 110,
    bbFamExclusive: false,
    cardTarget: 'rakuten',
    cardDiscountNormal: 0,
    cardDiscountGold: 0,
    denkiTarget: 'none',
    denkiDiscount: 0,
    denkiExclusive: false,
    longTerm10Discount: 0,
    longTerm20Discount: 0,
    youthDiscountU12: 0,
    youthDiscountU22: 0,
    limitedName: '',
    limitedAmount: 0,
    limitedPeriod: '',
    limitedAgeCondition: 'all',
    limitedNote: '',
    callShortFee: 1100,
    callUnlimitedFee: 1100,
    callSeniorUnlimitedFee: 1100,
    useRakutenLink: true,
    callDefaultNote: 'Rakuten Linkで国内通話無料',
    hasStoreSupport: true,
    hasOverseasFree: true,
    hasLineFree: false,
    includesDazn: false,
    includesUnext: true,
    fixedBonusPoint: 0,
    poikatsuRateNormal: 0,
    poikatsuRateGold: 0,
    poikatsuCap: 0,
    reasonsText: 'ギガ無制限とU-NEXT（月額2,189円相当）がセットで4,378円（実質2,189円相当で無制限通信）',
    warningText: ''
  }
];

// 年齢条件の判定ヘルパー
function checkAgeCondition(cond, ageGroup) {
  if (!cond || cond === 'all') return true;
  const isU12 = ageGroup === 'u12';
  const isU15 = isU12 || ageGroup === 'u15';
  const isU18 = isU15 || ageGroup === 'u18';
  const isU22 = isU18 || ageGroup === 'u22';
  const isSenior60 = ageGroup === 'senior60' || ageGroup === 'senior65';
  const isSenior65 = ageGroup === 'senior65';

  if (cond === 'u12') return isU12;
  if (cond === 'u15') return isU15;
  if (cond === 'u18') return isU18;
  if (cond === 'u22') return isU22;
  if (cond === 'senior60') return isSenior60;
  if (cond === 'senior65') return isSenior65;
  return true;
}

// スプレッドシートの行データからプラン評価を算出する汎用エンジン
function evaluatePlansFromSpreadsheet(rows, inputs) {
  const {
    dataGB,
    ageGroup,
    broadband,
    denki,
    docomoYears,
    familyCarrier,
    familyCount,
    card,
    callType,
    allowAppCall,
    monthlySpend,
    needs,
    zouryoMode = 'auto'
  } = inputs;

  const isU12 = ageGroup === 'u12';
  const isU22 = isU12 || ageGroup === 'u15' || ageGroup === 'u18' || ageGroup === 'u22';
  const isSenior60 = ageGroup === 'senior60' || ageGroup === 'senior65';
  const isSenior65 = ageGroup === 'senior65';

  // 1. 有効かつ年齢条件・データ容量条件（増量オプション考慮）を満たす行を抽出
  const activeRows = rows.filter((r) => {
    if (!r.enabled) return false;
    if (!checkAgeCondition(r.ageCondition, ageGroup)) return false;
    if (r.id === 'rakuten_unext' && !needs.unext && dataGB <= 20) return false;

    const minD = Number(r.minData) || 0;
    const maxD = Number(r.maxData) || 0;
    const addGB = Number(r.zouryoAddGB) || 0;
    const effectiveMaxD = zouryoMode !== 'off' ? maxD + addGB : maxD;

    return dataGB >= minD && dataGB <= effectiveMaxD;
  });

  const evaluated = activeRows.map((row) => {
    const basePrice = Number(row.basePrice) || 0;
    const discounts = [];

    // 増量オプションの適用判定
    const maxD = Number(row.maxData) || 0;
    const addGB = Number(row.zouryoAddGB) || 0;
    const zouryoFeeVal = Number(row.zouryoFee) || 0;
    const zouryoFreeMonthsVal = Number(row.zouryoFreeMonths) || 0;
    const needsZouryoForCapacity = dataGB > maxD && dataGB <= maxD + addGB;
    const isZouryoApplied =
      addGB > 0 &&
      (needsZouryoForCapacity || (zouryoMode === 'always' && zouryoFeeVal > 0));

    // 光セット割の判定
    const hasBBMatch =
      row.bbTarget && row.bbTarget !== 'none' && broadband === row.bbTarget;
    const bbDiscAmount = hasBBMatch ? Number(row.bbDiscount) || 0 : 0;

    // 家族割の判定
    const hasFamMatch =
      row.famTarget && row.famTarget !== 'none' && familyCarrier === row.famTarget;
    let famDiscAmount = 0;
    if (hasFamMatch) {
      if (familyCount >= 3) famDiscAmount = Number(row.famDiscount3) || 0;
      else if (familyCount === 2) famDiscAmount = Number(row.famDiscount2) || 0;
    }

    // でんきセット割の判定
    const hasDenkiMatch =
      row.denkiTarget && row.denkiTarget !== 'none' && denki === row.denkiTarget;
    const denkiDiscAmount = hasDenkiMatch ? Number(row.denkiDiscount) || 0 : 0;

    // 排他制御（UQ自宅セット割やY!mobileおうち割のように光・でんき・家族割が重複しないケース）
    if (row.bbFamExclusive) {
      if (row.denkiExclusive) {
        if (bbDiscAmount >= denkiDiscAmount && bbDiscAmount >= famDiscAmount && bbDiscAmount > 0) {
          discounts.push({ name: '自宅・光セット割', amount: bbDiscAmount });
          // Y!mobileで光セット割(-1,650円)適用時におうちでんきもある場合はおうち割でんきセット(A)(-110円)を加算
          if (row.carrierKey === 'ymobile' && hasDenkiMatch) {
            discounts.push({ name: 'おうち割 でんきセット(A)', amount: 110 });
          }
        } else if (denkiDiscAmount >= famDiscAmount && denkiDiscAmount > 0) {
          discounts.push({
            name:
              row.carrierKey === 'uq'
                ? '自宅セット割(でんきコース)'
                : 'おうち割 でんきセット(E)',
            amount: denkiDiscAmount
          });
        } else if (famDiscAmount > 0) {
          discounts.push({ name: '家族セット割', amount: famDiscAmount });
        }
      } else {
        if (bbDiscAmount >= famDiscAmount && bbDiscAmount > 0) {
          discounts.push({ name: '自宅・光セット割', amount: bbDiscAmount });
        } else if (famDiscAmount > 0) {
          discounts.push({ name: '家族セット割', amount: famDiscAmount });
        }
        if (denkiDiscAmount > 0) {
          discounts.push({ name: 'でんきセット割', amount: denkiDiscAmount });
        }
      }
    } else {
      if (bbDiscAmount > 0) {
        discounts.push({ name: '光回線セット割', amount: bbDiscAmount });
      }
      if (famDiscAmount > 0) {
        discounts.push({
          name: `家族割(${familyCount >= 3 ? '3回線+' : '2回線'})`,
          amount: famDiscAmount
        });
      }
      if (denkiDiscAmount > 0) {
        discounts.push({
          name:
            row.denkiTarget === 'docomo'
              ? 'ドコモでんきセット割'
              : row.denkiTarget === 'softbank'
              ? 'おうち割 でんきセット'
              : 'でんきセット割',
          amount: denkiDiscAmount
        });
      }
    }

    // クレジットカード割の判定
    if (row.cardTarget && row.cardTarget !== 'none') {
      const isGold =
        card === `${row.cardTarget}_gold` ||
        (row.cardTarget === 'aupay' && card === 'aupay_gold');
      const isNormal = card === row.cardTarget || isGold;
      if (isGold && Number(row.cardDiscountGold) > 0) {
        discounts.push({
          name: 'カード割(ゴールド)',
          amount: Number(row.cardDiscountGold)
        });
      } else if (isNormal && Number(row.cardDiscountNormal) > 0) {
        discounts.push({
          name: 'カードお支払割',
          amount: Number(row.cardDiscountNormal)
        });
      }
    }

    // ドコモ長期利用割の判定
    if (row.carrierKey === 'docomo') {
      if (docomoYears === '20plus' && Number(row.longTerm20Discount) > 0) {
        discounts.push({
          name: '長期利用割(20年以上)',
          amount: Number(row.longTerm20Discount)
        });
      } else if (docomoYears === '10plus' && Number(row.longTerm10Discount) > 0) {
        discounts.push({
          name: '長期利用割(10年以上)',
          amount: Number(row.longTerm10Discount)
        });
      }
    }

    // 若年層恒久割（楽天こども割 / 青春割など）
    if (isU12 && Number(row.youthDiscountU12) > 0) {
      discounts.push({
        name: 'こども割(12歳以下)',
        amount: Number(row.youthDiscountU12)
      });
    } else if (isU22 && Number(row.youthDiscountU22) > 0) {
      discounts.push({
        name: '青春・学割(22歳以下)',
        amount: Number(row.youthDiscountU22)
      });
    }

    // 期間限定割引の判定（Y!mobile 超！おトク割は光・家族・でんき割(E)適用時は重複しないよう制御）
    const limitedDiscounts = [];
    const hasYmobileExclusiveBaseDisc =
      row.carrierKey === 'ymobile' &&
      (bbDiscAmount > 0 || famDiscAmount > 0 || (row.denkiExclusive && denkiDiscAmount > 0));

    if (
      row.limitedName &&
      Number(row.limitedAmount) > 0 &&
      checkAgeCondition(row.limitedAgeCondition, ageGroup) &&
      !hasYmobileExclusiveBaseDisc
    ) {
      limitedDiscounts.push({
        name: row.limitedName,
        amount: Number(row.limitedAmount),
        period: row.limitedPeriod || '期間限定',
        condition: row.limitedNote || '条件適用時'
      });
    }

    // 通話料の計算
    let callFee = 0;
    let callNote = row.callDefaultNote || '従量制 (22円/30秒)';
    if (row.useRakutenLink && allowAppCall) {
      callFee = 0;
      callNote = 'Rakuten Linkアプリ利用で国内通話24時間無料';
    } else if (callType === 'short') {
      callFee = Number(row.callShortFee) || 0;
      callNote =
        callFee === 0
          ? row.callDefaultNote || '短時間通話無料が標準付帯'
          : `準定額・短時間かけ放題 (+${callFee.toLocaleString()}円)`;
    } else if (callType === 'unlimited') {
      callFee = isSenior60
        ? Number(row.callSeniorUnlimitedFee ?? row.callUnlimitedFee) || 0
        : Number(row.callUnlimitedFee) || 0;
      callNote =
        isSenior60 && callFee < Number(row.callUnlimitedFee)
          ? `60歳以上通話割で24時間かけ放題 (+${callFee.toLocaleString()}円)`
          : `24時間かけ放題OP (+${callFee.toLocaleString()}円)`;
    }

    // 特典・ポイント還元額の計算
    let perkValue = Number(row.fixedBonusPoint) || 0;
    const perkNotes = [];
    if (perkValue > 0) {
      perkNotes.push(`毎月${perkValue}pt付与`);
    }

    // ポイ活還元
    if (Number(row.poikatsuCap) > 0) {
      const isGoldCard =
        card === `${row.cardTarget}_gold` || card === 'dcard_gold' || card === 'paypay_gold';
      const hasTargetCard =
        card === row.cardTarget || isGoldCard;
      const ratePct = isGoldCard
        ? Number(row.poikatsuRateGold)
        : hasTargetCard
        ? Number(row.poikatsuRateNormal)
        : Math.max(1, Math.floor(Number(row.poikatsuRateNormal) / 2));
      const earned = Math.min(
        Number(row.poikatsuCap),
        Math.floor((monthlySpend * ratePct) / 100)
      );
      if (earned > 0) {
        perkValue += earned;
        perkNotes.push(`ポイ活還元(約${earned.toLocaleString()}pt/月)`);
      }
    }

    if (needs.dazn && row.includesDazn) {
      perkValue += 4200;
      perkNotes.push('DAZN見放題(4,200円相当)');
    }
    if (needs.unext && row.includesUnext) {
      perkValue += 2189;
      perkNotes.push('U-NEXT見放題(2,189円相当)');
    } else if (row.includesUnext) {
      perkValue += 500;
      perkNotes.push('U-NEXT見放題付帯');
    }
    if (needs.overseas && row.hasOverseasFree) {
      perkValue += row.carrierKey === 'rakuten' ? 500 : 980;
      perkNotes.push('海外ローミング無料特典');
    }
    if (needs.lineFree && row.hasLineFree) {
      perkValue += 300;
      perkNotes.push('LINEギガフリー節約効果');
    }
    if (row.carrierKey === 'rakuten' && isSenior65) {
      perkValue += 110;
      perkNotes.push('最強シニアプログラム110pt還元');
    }
    if (row.carrierKey === 'rakuten' && card === 'rakuten') {
      perkValue += 100;
      perkNotes.push('楽天市場SPU優遇');
    }

    const reasons = row.reasonsText
      ? String(row.reasonsText)
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const warnings = row.warningText
      ? String(row.warningText)
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    if (needs.storeSupport && !row.hasStoreSupport) {
      warnings.push('オンライン専用プランのため店舗での対面サポートは非対応（または有償）です');
    }

    if (isZouryoApplied) {
      reasons.unshift(
        `増量オプション（+${addGB}GB・月額${zouryoFeeVal}円）適用で最大${maxD + addGB}GBまで対応（初月〜${zouryoFreeMonthsVal}カ月間は無料！）`
      );
    }

    // ドコモU22割適用時の特殊処理（1〜7カ月目はでんき割・長期割が排他、8カ月目以降はボーナス27GB終了に伴い4GB以上は無制限段階8,448円へ移行）
    const isDocomoU22Applied =
      limitedDiscounts.some((ld) => ld.name.includes('ドコモU22割'));
    const u22ExcludedDiscount = isDocomoU22Applied
      ? discounts
          .filter(
            (d) =>
              d.name.includes('でんき') || d.name.includes('長期利用割')
          )
          .reduce((acc, d) => acc + d.amount, 0)
      : 0;
    const afterBonusBasePrice =
      (row.id === 'docomo_max_u22_28gb' || row.id === 'docomo_max_u22_30gb') &&
      dataGB > 3
        ? 8448
        : basePrice;

    const entry = createPlanEntry({
      id: row.id,
      carrierKey: row.carrierKey in CARRIER_STYLES ? row.carrierKey : 'docomo',
      category: row.category,
      name: isZouryoApplied ? `${row.name}＋増量OP` : row.name,
      dataLabel: isZouryoApplied
        ? `${row.dataLabel}（増量OPで${maxD + addGB}GB）`
        : row.dataLabel,
      maxData: isZouryoApplied ? maxD + addGB : maxD,
      basePrice,
      afterBonusBasePrice,
      u22ExcludedDiscount,
      discounts,
      limitedDiscounts,
      callFee,
      callNote,
      zouryoApplied: isZouryoApplied,
      zouryoAddGB: isZouryoApplied ? addGB : 0,
      zouryoFee: isZouryoApplied ? zouryoFeeVal : 0,
      zouryoFreeMonths: isZouryoApplied ? zouryoFreeMonthsVal : 0,
      perkValue,
      perkNote: perkNotes.length ? perkNotes.join('＋') : null,
      hasStoreSupport: Boolean(row.hasStoreSupport),
      hasOverseasFree: Boolean(row.hasOverseasFree),
      hasLineFree: Boolean(row.hasLineFree),
      reasons,
      warnings
    });

    let penalty = 0;
    const unmetNeeds = [];
    if (needs.storeSupport && !entry.hasStoreSupport) {
      penalty += 2500;
      unmetNeeds.push('対面ショップサポート非対応（オンライン専用）');
    }
    if (needs.lineFree && !entry.hasLineFree) penalty += 400;
    if (needs.overseas && !entry.hasOverseasFree) {
      penalty += 800;
      unmetNeeds.push('海外ローミング無料特典なし（別料金）');
    }

    const rankingCost = entry.effectivePrice + penalty;
    const matchScore = Math.max(
      45,
      Math.min(99, Math.round(100 - rankingCost / 110))
    );

    return {
      ...entry,
      unmetNeeds,
      rankingCost,
      matchScore
    };
  });

  return evaluated.sort((a, b) => a.rankingCost - b.rankingCost);
}

// スプレッドシートのカラム定義
const SPREADSHEET_COLUMNS = [
  { key: 'enabled', label: '有効', type: 'boolean', width: 'w-14' },
  { key: 'carrierKey', label: 'キャリア', type: 'select', options: ALL_CARRIER_KEYS, width: 'w-28' },
  { key: 'category', label: 'カテゴリ', type: 'text', width: 'w-32' },
  { key: 'planGroup', label: 'グループID', type: 'text', width: 'w-36' },
  { key: 'name', label: 'プラン表示名', type: 'text', width: 'w-56' },
  { key: 'dataLabel', label: '容量ラベル', type: 'text', width: 'w-48' },
  { key: 'minData', label: '最小GB', type: 'number', width: 'w-20' },
  { key: 'maxData', label: '最大GB', type: 'number', width: 'w-20' },
  {
    key: 'ageCondition',
    label: '対象年齢',
    type: 'select',
    options: ['all', 'u12', 'u15', 'u18', 'u22', 'senior60', 'senior65'],
    width: 'w-28'
  },
  { key: 'basePrice', label: '基本料金(円)', type: 'number', width: 'w-28' },
  {
    key: 'bbTarget',
    label: '光割対象',
    type: 'select',
    options: ['none', 'docomo', 'au', 'softbank', 'rakuten'],
    width: 'w-28'
  },
  { key: 'bbDiscount', label: '光割額(円)', type: 'number', width: 'w-24' },
  {
    key: 'famTarget',
    label: '家族割対象',
    type: 'select',
    options: ['none', 'docomo', 'au', 'softbank', 'rakuten'],
    width: 'w-28'
  },
  { key: 'famDiscount2', label: '家族割2人', type: 'number', width: 'w-24' },
  { key: 'famDiscount3', label: '家族割3人+', type: 'number', width: 'w-24' },
  { key: 'bbFamExclusive', label: '光/家族排他', type: 'boolean', width: 'w-24' },
  {
    key: 'cardTarget',
    label: 'カード対象',
    type: 'select',
    options: ['none', 'dcard', 'aupay', 'paypay', 'rakuten'],
    width: 'w-28'
  },
  { key: 'cardDiscountNormal', label: '通常カード割', type: 'number', width: 'w-28' },
  { key: 'cardDiscountGold', label: 'GOLDカード割', type: 'number', width: 'w-28' },
  {
    key: 'denkiTarget',
    label: 'でんき対象',
    type: 'select',
    options: ['none', 'docomo', 'au', 'softbank'],
    width: 'w-28'
  },
  { key: 'denkiDiscount', label: 'でんき割額', type: 'number', width: 'w-24' },
  { key: 'denkiExclusive', label: 'でんき排他', type: 'boolean', width: 'w-24' },
  { key: 'longTerm10Discount', label: '長期割(10年+)', type: 'number', width: 'w-28' },
  { key: 'longTerm20Discount', label: '長期割(20年+)', type: 'number', width: 'w-28' },
  { key: 'limitedName', label: '期間限定割名称', type: 'text', width: 'w-48' },
  { key: 'limitedAmount', label: '期間割額(円)', type: 'number', width: 'w-24' },
  { key: 'limitedPeriod', label: '期間割期間', type: 'text', width: 'w-32' },
  {
    key: 'limitedAgeCondition',
    label: '期間割年齢',
    type: 'select',
    options: ['all', 'u12', 'u15', 'u18', 'u22', 'senior60', 'senior65'],
    width: 'w-28'
  },
  { key: 'zouryoAddGB', label: '増量OP(+GB)', type: 'number', width: 'w-24' },
  { key: 'zouryoFee', label: '増量OP料金', type: 'number', width: 'w-24' },
  { key: 'zouryoFreeMonths', label: '増量無料月数', type: 'number', width: 'w-28' },
  { key: 'callShortFee', label: '短時間通話OP', type: 'number', width: 'w-28' },
  { key: 'callUnlimitedFee', label: '24hかけ放題OP', type: 'number', width: 'w-28' },
  { key: 'callSeniorUnlimitedFee', label: 'シニア24hOP', type: 'number', width: 'w-28' },
  { key: 'hasStoreSupport', label: '店舗対応', type: 'boolean', width: 'w-20' },
  { key: 'hasOverseasFree', label: '海外無料', type: 'boolean', width: 'w-20' },
  { key: 'hasLineFree', label: 'LINE無料', type: 'boolean', width: 'w-20' },
  { key: 'includesDazn', label: 'DAZN付', type: 'boolean', width: 'w-20' },
  { key: 'includesUnext', label: 'U-NEXT付', type: 'boolean', width: 'w-20' },
  { key: 'reasonsText', label: 'おすすめ理由(|区切り)', type: 'text', width: 'w-64' }
];

// CSV文字列への変換
function rowsToCSV(rows) {
  const headers = SPREADSHEET_COLUMNS.map((c) => c.key);
  const escapeCell = (val) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const lines = [
    headers.join(','),
    ...rows.map((r) => headers.map((h) => escapeCell(r[h])).join(','))
  ];
  return lines.join('\n');
}

// CSVまたはTSV文字列から行配列へのパース
function parseCSVOrTSV(text, fallbackRows) {
  const trimmed = text.trim();
  if (!trimmed) return fallbackRows;
  const delimiter = trimmed.split('\n')[0].includes('\t') ? '\t' : ',';

  const parseLine = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === delimiter && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  };

  const rawLines = trimmed.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (rawLines.length < 2) return fallbackRows;

  const headers = parseLine(rawLines[0]).map((h) => h.trim());
  const colTypeMap = {};
  SPREADSHEET_COLUMNS.forEach((c) => {
    colTypeMap[c.key] = c.type;
  });

  return rawLines.slice(1).map((line, idx) => {
    const vals = parseLine(line);
    const obj = {
      ...INITIAL_SPREADSHEET_ROWS[0],
      id: `custom_row_${Date.now()}_${idx}`,
      limitedNote: '',
      warningText: '',
      youthDiscountU12: 0,
      youthDiscountU22: 0,
      fixedBonusPoint: 0,
      poikatsuRateNormal: 0,
      poikatsuRateGold: 0,
      poikatsuCap: 0,
      zouryoAddGB: 0,
      zouryoFee: 0,
      zouryoFreeMonths: 0,
      useRakutenLink: false,
      callDefaultNote: '従量制 (22円/30秒)'
    };
    headers.forEach((key, i) => {
      if (vals[i] === undefined) return;
      const rawVal = vals[i].trim();
      const type = colTypeMap[key];
      if (type === 'number') {
        obj[key] = Number(rawVal) || 0;
      } else if (type === 'boolean') {
        obj[key] =
          rawVal.toLowerCase() === 'true' || rawVal === '1' || rawVal === 'TRUE';
      } else {
        obj[key] = rawVal;
      }
    });
    if (obj.carrierKey === 'rakuten') {
      obj.useRakutenLink = true;
    }
    return obj;
  });
}

// Googleスプレッドシートの共有URLを公開CSV用URLへ変換
function normalizeGoogleSheetCsvUrl(inputUrl) {
  const url = inputUrl.trim();
  if (!url) return '';
  if (url.includes('output=csv') || url.endsWith('.csv')) return url;
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const gidMatch = url.match(/gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv${gidParam}`;
  }
  return url;
}

function createPlanEntry({
  id,
  carrierKey,
  category,
  name,
  dataLabel,
  maxData,
  basePrice,
  afterBonusBasePrice,
  u22ExcludedDiscount = 0,
  discounts,
  limitedDiscounts = [],
  callFee,
  callNote,
  zouryoApplied = false,
  zouryoAddGB = 0,
  zouryoFee = 0,
  zouryoFreeMonths = 0,
  perkValue,
  perkNote,
  hasStoreSupport,
  hasOverseasFree,
  hasLineFree,
  reasons,
  warnings
}) {
  const totalDiscount = discounts.reduce((acc, d) => acc + d.amount, 0);
  const totalLimitedDiscount = limitedDiscounts.reduce((acc, d) => acc + d.amount, 0);
  const is7MonthLimited = limitedDiscounts.some(
    (ld) => ld.period && ld.period.includes('7カ月')
  );

  // 通常時（2年目以降・すべての期間限定割＆増量無料期間・ボーナスパケット終了後）の支払額
  const normalBase = afterBonusBasePrice ?? basePrice;
  const planAfterDiscount = Math.max(0, normalBase - totalDiscount);
  const monthlyPayment = planAfterDiscount + callFee + (zouryoApplied ? zouryoFee : 0);
  const effectivePrice = Math.max(0, monthlyPayment - perkValue);

  // ① 1〜7カ月目（期間限定割あり ＋ 増量オプション無料期間中 ※ドコモU22割適用中はでんき割・長期割を除外）
  const activeFirst7Discounts = Math.max(0, totalDiscount - u22ExcludedDiscount);
  const firstYearPlanPrice = Math.max(
    0,
    basePrice - activeFirst7Discounts - totalLimitedDiscount
  );
  const first7MonthsPayment = firstYearPlanPrice + callFee;
  const first7MonthsEffective = Math.max(0, first7MonthsPayment - perkValue);

  // ② 8〜12カ月目（7カ月間の期間限定割は終了し通常料金へ移行、12カ月割は継続 ＋ 増量オプション有料化後）
  const months8To12PlanPrice = is7MonthLimited
    ? planAfterDiscount
    : firstYearPlanPrice;
  const months8To12Payment =
    months8To12PlanPrice + callFee + (zouryoApplied ? zouryoFee : 0);
  const months8To12Effective = Math.max(0, months8To12Payment - perkValue);

  return {
    id,
    carrierKey,
    carrierStyle: CARRIER_STYLES[carrierKey] || CARRIER_STYLES.docomo,
    category,
    name,
    dataLabel,
    maxData,
    basePrice,
    discounts,
    limitedDiscounts,
    totalDiscount,
    totalLimitedDiscount,
    planAfterDiscount,
    callFee,
    callNote,
    zouryoApplied,
    zouryoAddGB,
    zouryoFee,
    zouryoFreeMonths,
    monthlyPayment,
    firstYearPayment: first7MonthsPayment,
    months8To12Payment,
    perkValue,
    perkNote,
    effectivePrice,
    firstYearEffectivePrice: first7MonthsEffective,
    months8To12Effective,
    hasStoreSupport,
    hasOverseasFree,
    hasLineFree,
    reasons,
    warnings
  };
}

export default function MobilePlanSimulator() {
  // 画面モード切り替え ('simulator' | 'spreadsheet')
  const [activeTab, setActiveTab] = useState('simulator');

  // スプレッドシートマスタ状態
  const [sheetRows, setSheetRows] = useState(INITIAL_SPREADSHEET_ROWS);
  const [sheetSearch, setSheetSearch] = useState('');
  const [sheetCarrierFilter, setSheetCarrierFilter] = useState('all');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [syncStatus, setSyncStatus] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');

  const [dataGB, setDataGB] = useState(15);
  const [ageGroup, setAgeGroup] = useState('adult');
  const [broadband, setBroadband] = useState('none');
  const [denki, setDenki] = useState('none');
  const [docomoYears, setDocomoYears] = useState('none');
  const [familyCarrier, setFamilyCarrier] = useState('none');
  const [familyCount, setFamilyCount] = useState(1);
  const [card, setCard] = useState('none');
  const [callType, setCallType] = useState('short');
  const [allowAppCall, setAllowAppCall] = useState(true);
  const [monthlySpend, setMonthlySpend] = useState(50000);
  const [currentBill, setCurrentBill] = useState(6500);
  const [needs, setNeeds] = useState({
    storeSupport: false,
    lineFree: false,
    overseas: false,
    dazn: false,
    unext: false
  });

  const [sortBy, setSortBy] = useState('recommended');
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  const [activePreset, setActivePreset] = useState(null);
  const [filterStoreOnly, setFilterStoreOnly] = useState(false);

  const [excludedCarriers, setExcludedCarriers] = useState([]);
  const [includeLimitedDiscount, setIncludeLimitedDiscount] = useState(true);
  const [zouryoMode, setZouryoMode] = useState('auto');

  // スプレッドシートのセル更新ハンドラ
  const updateSheetCell = (rowId, colKey, value) => {
    setSheetRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [colKey]: value } : row))
    );
  };

  // 行の追加
  const addNewSheetRow = () => {
    const newRow = {
      ...INITIAL_SPREADSHEET_ROWS[6],
      id: `custom_${Date.now()}`,
      enabled: true,
      planGroup: `custom_group_${Date.now()}`,
      carrierKey: sheetCarrierFilter !== 'all' ? sheetCarrierFilter : 'docomo',
      category: 'カスタム',
      name: '新規カスタムプラン（30GB）',
      dataLabel: '30GB',
      minData: 0,
      maxData: 30,
      basePrice: 2970,
      limitedName: '新規キャンペーン割',
      limitedAmount: 550,
      limitedPeriod: '1年間',
      reasonsText: 'スプレッドシートから追加されたカスタムプラン'
    };
    setSheetRows((prev) => [newRow, ...prev]);
    setSyncStatus({
      type: 'success',
      message: '新しいプラン行を先頭に追加しました。セルを直接編集できます。'
    });
  };

  // 行の複製
  const duplicateSheetRow = (targetRow) => {
    const copy = {
      ...targetRow,
      id: `${targetRow.id}_copy_${Date.now()}`,
      name: `${targetRow.name}（コピー）`
    };
    setSheetRows((prev) => {
      const idx = prev.findIndex((r) => r.id === targetRow.id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  // 行の削除
  const deleteSheetRow = (rowId) => {
    setSheetRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  // GoogleスプレッドシートURLからのフェッチ同期
  const handleSyncFromGoogleSheet = async () => {
    const csvUrl = normalizeGoogleSheetCsvUrl(googleSheetUrl);
    if (!csvUrl) {
      setSyncStatus({
        type: 'error',
        message: 'GoogleスプレッドシートのURLを入力してください。'
      });
      return;
    }
    setSyncStatus({ type: 'loading', message: 'スプレッドシートからデータを取得中...' });
    try {
      const res = await fetch(csvUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const csvText = await res.text();
      const parsed = parseCSVOrTSV(csvText, sheetRows);
      setSheetRows(parsed);
      setSyncStatus({
        type: 'success',
        message: `スプレッドシートから ${parsed.length} 件のプランデータを同期しました！`
      });
    } catch (err) {
      setSyncStatus({
        type: 'error',
        message:
          '取得に失敗しました。Googleスプレッドシートの「ファイル ＞ 共有 ＞ ウェブに公開（CSV）」または「リンクを知っている全員が閲覧可」に設定されているか確認してください。'
      });
    }
  };

  // CSVコピー出力
  const handleCopyCSV = () => {
    const csv = rowsToCSV(sheetRows);
    const textarea = document.createElement('textarea');
    textarea.value = csv;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setSyncStatus({
      type: 'success',
      message: '全プランのCSVデータをクリップボードにコピーしました！GoogleスプレッドシートやExcelにそのまま貼り付けできます。'
    });
  };

  // CSVファイルダウンロード
  const handleDownloadCSV = () => {
    const csv = rowsToCSV(sheetRows);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mobile_plans_master.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // フィルタ済みスプレッドシート行
  const filteredSheetRows = useMemo(() => {
    return sheetRows.filter((r) => {
      if (sheetCarrierFilter !== 'all' && r.carrierKey !== sheetCarrierFilter) {
        return false;
      }
      if (sheetSearch.trim()) {
        const q = sheetSearch.toLowerCase();
        return (
          String(r.name).toLowerCase().includes(q) ||
          String(r.category).toLowerCase().includes(q) ||
          String(r.limitedName).toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [sheetRows, sheetCarrierFilter, sheetSearch]);

  const toggleCarrierExclusion = (carrierKey) => {
    setExcludedCarriers((prev) =>
      prev.includes(carrierKey)
        ? prev.filter((k) => k !== carrierKey)
        : [...prev, carrierKey]
    );
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    const s = preset.state;
    setDataGB(s.dataGB);
    setAgeGroup(s.ageGroup);
    setBroadband(s.broadband);
    setDenki(s.denki || 'none');
    setDocomoYears(s.docomoYears || 'none');
    setFamilyCarrier(s.familyCarrier);
    setFamilyCount(s.familyCount);
    setCard(s.card);
    setCallType(s.callType);
    setAllowAppCall(s.allowAppCall);
    setMonthlySpend(s.monthlySpend);
    setCurrentBill(s.currentBill);
    setNeeds(s.needs);
  };

  const resetConditions = () => {
    setActivePreset(null);
    setDataGB(10);
    setAgeGroup('adult');
    setBroadband('none');
    setDenki('none');
    setDocomoYears('none');
    setFamilyCarrier('none');
    setFamilyCount(1);
    setCard('none');
    setCallType('none');
    setAllowAppCall(true);
    setMonthlySpend(50000);
    setCurrentBill(6000);
    setExcludedCarriers([]);
    setIncludeLimitedDiscount(true);
    setZouryoMode('auto');
    setNeeds({
      storeSupport: false,
      lineFree: false,
      overseas: false,
      dazn: false,
      unext: false
    });
  };

  const toggleNeed = (key) => {
    setActivePreset(null);
    setNeeds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const evaluatedPlans = useMemo(() => {
    const raw = evaluatePlansFromSpreadsheet(sheetRows, {
      dataGB,
      ageGroup,
      broadband,
      denki,
      docomoYears,
      familyCarrier,
      familyCount,
      card,
      callType,
      allowAppCall,
      monthlySpend,
      needs,
      zouryoMode
    });

    let filtered = raw.filter((p) => !excludedCarriers.includes(p.carrierKey));

    if (filterStoreOnly) {
      filtered = filtered.filter((p) => p.hasStoreSupport);
    }

    const mapped = filtered.map((p) => {
      const activePayment = includeLimitedDiscount
        ? p.firstYearPayment
        : p.monthlyPayment;
      const activeEffective = includeLimitedDiscount
        ? p.firstYearEffectivePrice
        : p.effectivePrice;
      const zouryoSaving =
        includeLimitedDiscount && p.zouryoApplied ? p.zouryoFee : 0;
      const activeRankingCost =
        p.rankingCost -
        (includeLimitedDiscount ? p.totalLimitedDiscount + zouryoSaving : 0);
      const activeMatchScore = Math.max(
        45,
        Math.min(99, Math.round(100 - activeRankingCost / 110))
      );

      return {
        ...p,
        activePayment,
        activeEffective,
        activeRankingCost,
        activeMatchScore
      };
    });

    return mapped.sort((a, b) => {
      if (sortBy === 'payment') return a.activePayment - b.activePayment;
      if (sortBy === 'effective') return a.activeEffective - b.activeEffective;
      return a.activeRankingCost - b.activeRankingCost;
    });
  }, [
    sheetRows,
    dataGB,
    ageGroup,
    broadband,
    denki,
    docomoYears,
    familyCarrier,
    familyCount,
    card,
    callType,
    allowAppCall,
    monthlySpend,
    needs,
    sortBy,
    filterStoreOnly,
    excludedCarriers,
    includeLimitedDiscount,
    zouryoMode
  ]);

  const bestPlan = evaluatedPlans[0];
  const top3Plans = evaluatedPlans.slice(0, 3);
  const annualSavings = bestPlan
    ? Math.max(0, (currentBill - bestPlan.activeEffective) * 12)
    : 0;

  const quickDataSteps = [
    { label: '1GB', value: 1 },
    { label: '3GB', value: 3 },
    { label: '5GB', value: 5 },
    { label: '10GB', value: 10 },
    { label: '20GB', value: 20 },
    { label: '30GB', value: 30 },
    { label: '50GB', value: 50 },
    { label: '無制限(100GB+)', value: 120 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                スプレッドシート連動型・4大キャリア完全対応
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                携帯プラン最適診断シミュレーター
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                プラン料金や割引額・期間限定キャンペーンをスプレッドシート形式でいつでも自在に編集＆即時反映できます
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
              {/* View Switcher Tabs */}
              <div className="inline-flex rounded-xl bg-slate-950/60 p-1 border border-white/15">
                <button
                  onClick={() => setActiveTab('simulator')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeTab === 'simulator'
                      ? 'bg-indigo-500 text-white shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  診断シミュレーター
                </button>
                <button
                  onClick={() => setActiveTab('spreadsheet')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeTab === 'spreadsheet'
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Table className="w-3.5 h-3.5" />
                  スプレッドシート編集 ({sheetRows.length}行)
                </button>
              </div>

              <button
                onClick={resetConditions}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition border border-white/15 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                条件リセット
              </button>
            </div>
          </div>

          {/* One-click Presets */}
          {activeTab === 'simulator' && (
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="text-xs font-semibold text-indigo-200 mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                よくある利用パターンからワンクリック診断：
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`text-left px-3 py-2 rounded-xl text-xs transition border cursor-pointer ${
                      activePreset === preset.id
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-md'
                        : 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10'
                    }`}
                  >
                    <div>{preset.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'spreadsheet' ? (
          <div className="space-y-5">
            {/* Top Controls & Google Sheets Sync Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Table className="w-5 h-5 text-emerald-600" />
                    プラン・割引マスタ スプレッドシート
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    表のセルを直接書き換えると、即座に「診断シミュレーター」の計算結果に反映されます。GoogleスプレッドシートとのCSV連携にも対応しています。
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={addNewSheetRow}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    新規プラン行を追加
                  </button>
                  <button
                    onClick={handleCopyCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    CSVをコピー
                  </button>
                  <button
                    onClick={handleDownloadCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    CSV出力
                  </button>
                  <button
                    onClick={() => {
                      setImportText(rowsToCSV(sheetRows));
                      setShowImportModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    CSV/TSV貼付インポート
                  </button>
                  <button
                    onClick={() => {
                      setSheetRows(INITIAL_SPREADSHEET_ROWS);
                      setSyncStatus({
                        type: 'info',
                        message: '初期マスタデータにリセットしました。'
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    初期値に戻す
                  </button>
                </div>
              </div>

              {/* Google Spreadsheet URL Sync Box */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0">
                  <Link2 className="w-4 h-4 text-emerald-600" />
                  <span>GoogleスプレッドシートURL同期：</span>
                </div>
                <input
                  type="text"
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/... （共有URLまたはウェブに公開したCSV URL）"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSyncFromGoogleSheet}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shrink-0 cursor-pointer"
                >
                  スプレッドシートから読み込む
                </button>
              </div>

              {syncStatus && (
                <div
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                    syncStatus.type === 'error'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : syncStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    {syncStatus.message}
                  </span>
                  <button
                    onClick={() => setSyncStatus(null)}
                    className="text-[11px] underline ml-4 cursor-pointer"
                  >
                    閉じる
                  </button>
                </div>
              )}

              {/* Filter & Search Bar for Spreadsheet */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSheetCarrierFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      sheetCarrierFilter === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    すべて ({sheetRows.length})
                  </button>
                  {ALL_CARRIER_KEYS.map((key) => {
                    const count = sheetRows.filter((r) => r.carrierKey === key).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setSheetCarrierFilter(key)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          sheetCarrierFilter === key
                            ? CARRIER_STYLES[key].badgeBg
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {CARRIER_STYLES[key].name} ({count})
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={sheetSearch}
                    onChange={(e) => setSheetSearch(e.target.value)}
                    placeholder="プラン名・割引名で検索..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Paste CSV/TSV Modal */}
            {showImportModal && (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-600 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    CSV / TSV データの一括貼り付け（Excel・Googleスプレッドシート対応）
                  </h3>
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    ✕ 閉じる
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  GoogleスプレッドシートやExcelからコピーした表（1行目がヘッダー）をそのまま下に貼り付けて「反映する」を押してください。
                </p>
                <textarea
                  rows={8}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-mono text-[11px] bg-slate-50 focus:outline-none focus:border-indigo-600"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => {
                      const parsed = parseCSVOrTSV(importText, sheetRows);
                      setSheetRows(parsed);
                      setShowImportModal(false);
                      setSyncStatus({
                        type: 'success',
                        message: `${parsed.length} 件の行データをインポートして反映しました！`
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                  >
                    この内容でスプレッドシートに反映する
                  </button>
                </div>
              </div>
            )}

            {/* Editable Spreadsheet Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto max-h-[650px]">
                <table className="w-max min-w-full border-collapse text-xs">
                  <thead className="bg-slate-800 text-white sticky top-0 z-10">
                    <tr>
                      <th className="px-2.5 py-2.5 text-left font-bold border-r border-slate-700 w-20">
                        操作
                      </th>
                      {SPREADSHEET_COLUMNS.map((col) => (
                        <th
                          key={col.key}
                          className={`px-2.5 py-2.5 text-left font-bold border-r border-slate-700 ${col.width}`}
                        >
                          <div>{col.label}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-normal">
                            {col.key}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredSheetRows.map((row, rIdx) => (
                      <tr
                        key={row.id}
                        className={`${
                          !row.enabled
                            ? 'bg-slate-100/80 opacity-60'
                            : rIdx % 2 === 0
                            ? 'bg-white'
                            : 'bg-slate-50/50'
                        } hover:bg-indigo-50/40 transition`}
                      >
                        <td className="px-2 py-1.5 border-r border-slate-200 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => duplicateSheetRow(row)}
                              title="この行を複製"
                              className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteSheetRow(row.id)}
                              title="この行を削除"
                              className="p-1 rounded hover:bg-rose-100 text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        {SPREADSHEET_COLUMNS.map((col) => {
                          const val = row[col.key];
                          return (
                            <td
                              key={col.key}
                              className={`p-1 border-r border-slate-200 ${col.width}`}
                            >
                              {col.type === 'boolean' ? (
                                <div className="flex justify-center">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(val)}
                                    onChange={(e) =>
                                      updateSheetCell(row.id, col.key, e.target.checked)
                                    }
                                    className="rounded text-indigo-600 cursor-pointer w-4 h-4"
                                  />
                                </div>
                              ) : col.type === 'select' ? (
                                <select
                                  value={val || ''}
                                  onChange={(e) =>
                                    updateSheetCell(row.id, col.key, e.target.value)
                                  }
                                  className="w-full px-1.5 py-1 rounded bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-indigo-500 text-xs"
                                >
                                  {col.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              ) : col.type === 'number' ? (
                                <input
                                  type="number"
                                  value={val ?? 0}
                                  onChange={(e) =>
                                    updateSheetCell(
                                      row.id,
                                      col.key,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full px-2 py-1 rounded bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-indigo-500 text-right font-mono text-xs"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={val ?? ''}
                                  onChange={(e) =>
                                    updateSheetCell(row.id, col.key, e.target.value)
                                  }
                                  className="w-full px-2 py-1 rounded bg-transparent hover:bg-white focus:bg-white border border-transparent focus:border-indigo-500 text-xs"
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Conditions */}
          <section className="lg:col-span-5 space-y-5">
            {/* Step 0: Carrier Filter & Limited Discount Toggle */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  診断対象キャリア・期間限定割の設定
                </h2>
                {excludedCarriers.length > 0 && (
                  <button
                    onClick={() => setExcludedCarriers([])}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    すべて含める（解除）
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>タップして特定のキャリア（ブランド）を除外できます：</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() =>
                        setExcludedCarriers(['rakuten', 'povo', 'linemo'])
                      }
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold transition cursor-pointer"
                    >
                      🚫 取り扱い無しキャリアを除外 (楽天/povo/LINEMO)
                    </button>
                    <button
                      onClick={() =>
                        setExcludedCarriers(['ahamo', 'povo', 'linemo'])
                      }
                      className="text-[11px] px-2.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                    >
                      オンライン専用を除外
                    </button>
                    <button
                      onClick={() =>
                        setExcludedCarriers(['docomo', 'au', 'softbank'])
                      }
                      className="text-[11px] px-2.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                    >
                      3大メインを除外
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_CARRIER_KEYS.map((key) => {
                    const style = CARRIER_STYLES[key];
                    const isExcluded = excludedCarriers.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleCarrierExclusion(key)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                          isExcluded
                            ? 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-70'
                            : `${style.badgeBg} shadow-xs`
                        }`}
                      >
                        <span>{style.name}</span>
                        <span className="text-[10px]">
                          {isExcluded ? '✕除外中' : '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Limited Discount Mode Toggle */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-50/80 border border-amber-200 rounded-xl p-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLimitedDiscount}
                    onChange={(e) => setIncludeLimitedDiscount(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <div>
                    <div className="font-bold text-amber-950">
                      期間限定割引（1年間割引・増量OP 7カ月無料）を最安計算に含める
                    </div>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      UQ「コミコミおトク割（-660円×13カ月）」やY!mobile「超！おトク割（-1,100円×12カ月）」、増量オプション7カ月無料を反映します（OFFにすると期間終了後の通常料金で比較）
                    </div>
                  </div>
                </label>

                {/* UQ / Y!mobile Data Augmentation Option Mode */}
                <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-sky-950 mb-1.5 flex items-center justify-between">
                    <span>UQ・Y!mobile「データ増量オプション（550円/月・7カ月無料）」の扱い</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-extrabold">
                      S:+2GB / M・L・UQ:+5GB
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    {[
                      {
                        id: 'auto',
                        label: '容量超過時のみ自動',
                        desc: '6〜7GBや31〜35GB時に適用'
                      },
                      {
                        id: 'always',
                        label: '常に加入で計算',
                        desc: '7カ月無料特典をフル活用'
                      },
                      {
                        id: 'off',
                        label: '利用しない',
                        desc: '標準データ容量のみで判定'
                      }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setZouryoMode(m.id)}
                        className={`p-2 rounded-lg text-left border transition cursor-pointer ${
                          zouryoMode === m.id
                            ? 'bg-sky-600 border-sky-600 text-white font-bold shadow-xs'
                            : 'bg-white border-sky-200/80 text-slate-700 hover:bg-sky-100/50'
                        }`}
                      >
                        <div className="text-[11px] font-bold">{m.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            zouryoMode === m.id ? 'text-sky-100' : 'text-slate-500'
                          }`}
                        >
                          {m.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Data & Age */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  1. 毎月のデータ容量・年齢
                </h2>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-sm">
                  {dataGB >= 100 ? '無制限 (100GB+)' : `月 ${dataGB} GB`}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="120"
                value={dataGB}
                onChange={(e) => {
                  setActivePreset(null);
                  setDataGB(Number(e.target.value));
                }}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="flex flex-wrap gap-1.5 mt-3">
                {quickDataSteps.map((step) => (
                  <button
                    key={step.value}
                    onClick={() => {
                      setActivePreset(null);
                      setDataGB(step.value);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      dataGB === step.value
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              {/* Age Category */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  利用者の年齢区分（学割・U15/U18・シニア割の自動判定）
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'adult', label: '23〜59歳 (一般)' },
                    { id: 'u22', label: '19〜22歳 (学生/青春割)' },
                    { id: 'u18', label: '16〜18歳 (高校生/U18)' },
                    { id: 'u15', label: '13〜15歳 (中学生/U15)' },
                    { id: 'u12', label: '12歳以下 (こども/U12)' },
                    { id: 'senior60', label: '60〜64歳 (シニア割)' },
                    { id: 'senior65', label: '65歳以上 (シニア優遇)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePreset(null);
                        setAgeGroup(item.id);
                      }}
                      className={`px-2.5 py-2 rounded-xl text-xs font-medium border text-left transition cursor-pointer ${
                        ageGroup === item.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Docomo Long-term Usage Discount */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  ドコモの継続利用期間（ドコモ MAX / ポイ活 MAX「長期利用割」判定）
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: '10年未満 / なし', sub: '割引なし' },
                    { id: '10plus', label: '10年以上', sub: '-110円/月' },
                    { id: '20plus', label: '20年以上', sub: '-220円/月' }
                  ].map((lt) => (
                    <button
                      key={lt.id}
                      onClick={() => {
                        setActivePreset(null);
                        setDocomoYears(lt.id);
                      }}
                      className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                        docomoYears === lt.id
                          ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{lt.label}</div>
                      <div className="text-[11px] text-slate-500">{lt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Broadband, Denki, Family & Credit Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-indigo-600" />
                2. 自宅のネット回線・でんき・家族割・クレカ
              </h2>

              {/* Broadband */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-indigo-600" />
                  自宅のインターネット（ドコモ光、ホームルーター以外は固定電話必須）
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'none', label: 'なし / 他社回線', sub: 'セット割なし' },
                    {
                      id: 'docomo',
                      label: 'ドコモ光 / home 5G',
                      sub: 'ドコモ -1,210円'
                    },
                    {
                      id: 'au',
                      label: 'auひかり / WiMAX / nifty光/ ケーブルテレビ/ TCOM光',
                      sub: 'au・UQ -1,100円'
                    },
                    {
                      id: 'softbank',
                      label: 'SoftBank 光 / Air/ NURO光',
                      sub: 'SB -1,100円 / Y! -1,650円'
                    },
                    {
                      id: 'rakuten',
                      label: '楽天ひかり / Turbo',
                      sub: 'SPUポイント優遇'
                    }
                  ].map((bb) => (
                    <button
                      key={bb.id}
                      onClick={() => {
                        setActivePreset(null);
                        setBroadband(bb.id);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        broadband === bb.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{bb.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{bb.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Electricity Set Discount */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  自宅の電力会社（でんきセット割の判定：ドコモ・UQ・SB・Y!対応）
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    {
                      id: 'none',
                      label: '指定なし / 地域電力など',
                      sub: 'でんき割なし'
                    },
                    {
                      id: 'docomo',
                      label: 'ドコモでんき',
                      sub: 'ドコモ MAX / mini 等 -110円/月'
                    },
                    {
                      id: 'au',
                      label: 'auでんき',
                      sub: 'UQ 自宅セット割(でんき) -1,100円/月'
                    },
                    {
                      id: 'softbank',
                      label: 'おうちでんき (SB / YM)',
                      sub: 'SB -110円 / YM シンプル3 M・L -1,100円(Sは-110円)'
                    }
                  ].map((dk) => (
                    <button
                      key={dk.id}
                      onClick={() => {
                        setActivePreset(null);
                        setDenki(dk.id);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        denki === dk.id
                          ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{dk.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{dk.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Family Discount */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  家族が利用している携帯キャリア（家族割の判定）
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: '家族割なし (単身)' },
                    { id: 'docomo', label: 'ドコモ' },
                    { id: 'au', label: 'au / UQ mobile' },
                    { id: 'softbank', label: 'SoftBank / Y!mobile' },
                    { id: 'rakuten', label: '楽天モバイル' }
                  ].map((fc) => (
                    <button
                      key={fc.id}
                      onClick={() => {
                        setActivePreset(null);
                        setFamilyCarrier(fc.id);
                        if (fc.id !== 'none' && familyCount < 2) {
                          setFamilyCount(3);
                        } else if (fc.id === 'none') {
                          setFamilyCount(1);
                        }
                      }}
                      className={`px-2.5 py-2 rounded-xl text-xs font-medium border text-left transition cursor-pointer ${
                        familyCarrier === fc.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {fc.label}
                    </button>
                  ))}
                </div>

                {familyCarrier !== 'none' && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700">
                      自分を含めた家族の回線数：
                    </span>
                    <div className="flex gap-1.5">
                      {[
                        { count: 2, label: '2回線 (2人)' },
                        { count: 3, label: '3回線以上 (3人〜)' }
                      ].map((c) => (
                        <button
                          key={c.count}
                          onClick={() => {
                            setActivePreset(null);
                            setFamilyCount(c.count);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            familyCount === c.count
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Credit Card */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                  お支払いに使えるクレジットカード（カードお支払割・ポイ活判定）
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'none', label: '指定なし（他社カード・口座振替）' },
                    { id: 'dcard', label: 'dカード（通常）' },
                    { id: 'dcard_gold', label: 'dカード GOLD / PLATINUM' },
                    { id: 'aupay', label: 'au PAY カード（通常）' },
                    { id: 'aupay_gold', label: 'au PAY ゴールドカード' },
                    { id: 'paypay', label: 'PayPayカード（通常）' },
                    { id: 'paypay_gold', label: 'PayPayカード ゴールド' },
                    { id: 'rakuten', label: '楽天カード' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActivePreset(null);
                        setCard(c.id);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition cursor-pointer ${
                        card === c.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Calls, Poikatsu & Perks */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-indigo-600" />
                3. 通話スタイル・重視する特典・現在の料金
              </h2>

              {/* Call Style */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  国内通話の利用頻度（かけ放題オプション）
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'ほぼしない', sub: 'LINE通話メイン' },
                    { id: 'short', label: '5分/10分かけ放題', sub: '短い通話が多い' },
                    { id: 'unlimited', label: '24時間かけ放題', sub: '長電話・仕事用' }
                  ].map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => {
                        setActivePreset(null);
                        setCallType(ct.id);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                        callType === ct.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{ct.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{ct.sub}</div>
                    </button>
                  ))}
                </div>

                <label className="mt-2.5 flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowAppCall}
                    onChange={(e) => setAllowAppCall(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span>
                    楽天モバイルは「Rakuten Link」アプリ通話（無料）を利用する
                  </span>
                </label>
              </div>

              {/* Needs Checkboxes */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  欲しいサービス・こだわり条件（複数選択可）
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    {
                      key: 'storeSupport',
                      label: '全国の店舗で対面サポート',
                      icon: Store
                    },
                    {
                      key: 'lineFree',
                      label: 'LINEギガ消費ゼロ重視',
                      icon: MessageCircle
                    },
                    {
                      key: 'overseas',
                      label: '海外ローミング無料特典',
                      icon: Globe
                    },
                    {
                      key: 'dazn',
                      label: 'DAZNでスポーツ観戦',
                      icon: Tv
                    },
                    {
                      key: 'unext',
                      label: 'U-NEXTで映画・アニメ',
                      icon: Tv
                    }
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = needs[item.key];
                    return (
                      <button
                        key={item.key}
                        onClick={() => toggleNeed(item.key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition cursor-pointer ${
                          active
                            ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Spend & Current Bill */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    クレカ・コード決済の月間利用額
                  </label>
                  <div className="text-[11px] text-slate-500 mb-2">
                    ポイ活プランのポイント還元計算に使用
                  </div>
                  <select
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                  >
                    <option value={10000}>月 1万円程度</option>
                    <option value={30000}>月 3万円程度</option>
                    <option value={50000}>月 5万円程度</option>
                    <option value={80000}>月 8万円程度</option>
                    <option value={100000}>月 10万円以上</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    現在の毎月スマホ料金（目安）
                  </label>
                  <div className="text-[11px] text-slate-500 mb-2">
                    乗り換え後の年間節約額を算出
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="500"
                      min="0"
                      value={currentBill}
                      onChange={(e) => setCurrentBill(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
                    />
                    <span className="text-xs font-bold text-slate-600 shrink-0">
                      円/月
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Panel: Diagnosis Results */}
          <section className="lg:col-span-7 space-y-6">
            {bestPlan ? (
              <>
                {/* Best Match Hero Card */}
                <div className="bg-white rounded-3xl shadow-md border-2 border-indigo-600 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-amber-300 shrink-0" />
                      <div>
                        <div className="text-[11px] font-semibold text-indigo-100">
                          あなたの条件に最もおすすめの最適プラン
                        </div>
                        <div className="text-lg font-extrabold tracking-tight">
                          第1位：{bestPlan.name}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-xs">
                      マッチ度 {bestPlan.activeMatchScore}%
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${bestPlan.carrierStyle.badgeBg}`}
                          >
                            {bestPlan.carrierStyle.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {bestPlan.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                            容量：{bestPlan.dataLabel}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          通話：{bestPlan.callNote}
                        </div>
                      </div>

                      <div className="text-left sm:text-right bg-indigo-50/70 px-4 py-3 rounded-2xl border border-indigo-100 shrink-0">
                        <div className="text-[11px] font-bold text-indigo-700">
                          {includeLimitedDiscount &&
                          (bestPlan.totalLimitedDiscount > 0 || bestPlan.zouryoApplied)
                            ? '初月〜7カ月目（期間限定・増量無料時）実質月額'
                            : '割引・特典考慮後の実質月額'}
                        </div>
                        <div className="text-3xl font-extrabold text-indigo-950">
                          {bestPlan.activeEffective.toLocaleString()}
                          <span className="text-sm font-bold ml-1">円/月</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          実際の支払額：{bestPlan.activePayment.toLocaleString()}円/月
                          {(bestPlan.totalLimitedDiscount > 0 || bestPlan.zouryoApplied) &&
                            includeLimitedDiscount && (
                              <span className="ml-1 text-slate-600">
                                （2年目以降：{bestPlan.monthlyPayment.toLocaleString()}円）
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* 3-Stage Payment Timeline when Limited Discount or Zouryo Option applies */}
                    {(bestPlan.totalLimitedDiscount > 0 || bestPlan.zouryoApplied) && (
                      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5">
                        <div className="text-xs font-extrabold text-amber-950 mb-2 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-600" />
                          時期別の毎月支払額推移（増量オプション7カ月無料・期間限定割の反映）
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-white rounded-xl p-2.5 border border-amber-200">
                            <div className="text-[10px] font-bold text-rose-600">
                              ① 1〜7カ月目
                            </div>
                            <div className="text-base font-extrabold text-slate-900 mt-0.5">
                              {bestPlan.firstYearPayment.toLocaleString()}円
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {bestPlan.zouryoApplied ? '増量OP 0円' : '期間割適用'}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-2.5 border border-amber-200">
                            <div className="text-[10px] font-bold text-amber-700">
                              ② 8〜12カ月目
                            </div>
                            <div className="text-base font-extrabold text-slate-900 mt-0.5">
                              {bestPlan.months8To12Payment.toLocaleString()}円
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {bestPlan.zouryoApplied
                                ? `増量OP +${bestPlan.zouryoFee}円`
                                : '期間割継続'}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-2.5 border border-amber-200">
                            <div className="text-[10px] font-bold text-slate-600">
                              ③ 2年目以降（通常）
                            </div>
                            <div className="text-base font-extrabold text-slate-900 mt-0.5">
                              {bestPlan.monthlyPayment.toLocaleString()}円
                            </div>
                            <div className="text-[10px] text-slate-500">
                              期間終了後
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Savings Banner */}
                    {annualSavings > 0 && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div className="text-xs text-emerald-950">
                            現在のスマホ代（月{currentBill.toLocaleString()}円）から乗り換えると
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-extrabold text-emerald-700 shrink-0">
                          年間 約{annualSavings.toLocaleString()}円 おトク！
                        </div>
                      </div>
                    )}

                    {/* Applied Discounts & Limited Discounts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                        <div className="font-bold text-slate-700 mb-2">
                          料金の内訳（税込）
                        </div>
                        <div className="space-y-1 text-slate-600">
                          <div className="flex justify-between">
                            <span>基本料金：</span>
                            <span className="font-semibold">
                              {bestPlan.basePrice.toLocaleString()}円
                            </span>
                          </div>
                          {bestPlan.discounts.map((d, i) => (
                            <div
                              key={i}
                              className="flex justify-between text-emerald-700 font-medium"
                            >
                              <span>・{d.name}：</span>
                              <span>-{d.amount.toLocaleString()}円</span>
                            </div>
                          ))}
                          {includeLimitedDiscount &&
                            bestPlan.limitedDiscounts.map((ld, i) => (
                              <div
                                key={i}
                                className="flex justify-between text-rose-600 font-bold"
                              >
                                <span>
                                  ★{ld.name}（{ld.period}）：
                                </span>
                                <span>-{ld.amount.toLocaleString()}円</span>
                              </div>
                            ))}
                          {bestPlan.callFee > 0 && (
                            <div className="flex justify-between text-slate-700">
                              <span>＋通話オプション：</span>
                              <span>+{bestPlan.callFee.toLocaleString()}円</span>
                            </div>
                          )}
                          {bestPlan.perkValue > 0 && (
                            <div className="flex justify-between text-indigo-600 font-semibold">
                              <span>★ポイント還元・特典価値：</span>
                              <span>-{bestPlan.perkValue.toLocaleString()}円相当</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                        <div className="font-bold text-slate-700 mb-2">
                          おすすめの理由・メリット
                        </div>
                        <ul className="space-y-1.5 text-slate-600">
                          {bestPlan.reasons.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                          {bestPlan.perkNote && (
                            <li className="flex items-start gap-1.5 text-indigo-700 font-medium">
                              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{bestPlan.perkNote}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top 3 Comparison Cards */}
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    上位おすすめプラン TOP 3 比較
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {top3Plans.map((plan, idx) => (
                      <div
                        key={plan.id}
                        className={`bg-white rounded-2xl p-4 border shadow-xs flex flex-col justify-between ${
                          idx === 0
                            ? 'border-indigo-500 ring-1 ring-indigo-500/30'
                            : 'border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-xs font-extrabold text-indigo-600">
                              #{idx + 1} おすすめ
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${plan.carrierStyle.badgeBg}`}
                            >
                              {plan.carrierStyle.name}
                            </span>
                          </div>
                          <div className="font-bold text-sm text-slate-900 line-clamp-2">
                            {plan.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            {plan.dataLabel}
                          </div>

                          {plan.limitedDiscounts.length > 0 && (
                            <div className="mt-2 inline-block px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
                              ★{plan.limitedDiscounts[0].name} (-
                              {plan.limitedDiscounts[0].amount}円)
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <div className="text-[10px] text-slate-500">
                            実質月額（支払額 {plan.activePayment.toLocaleString()}円）
                          </div>
                          <div className="text-xl font-extrabold text-slate-900">
                            {plan.activeEffective.toLocaleString()}
                            <span className="text-xs font-normal ml-0.5">円/月</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Plans Ranking List */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-800">
                        条件を満たす全プラン一覧（{evaluatedPlans.length}件）
                      </h3>
                      <p className="text-xs text-slate-500">
                        各プランをクリックすると割引内訳の確認やスプレッドシートでの編集が行えます
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer mr-2">
                        <input
                          type="checkbox"
                          checked={filterStoreOnly}
                          onChange={(e) => setFilterStoreOnly(e.target.checked)}
                          className="rounded text-indigo-600 cursor-pointer"
                        />
                        <span>店舗サポート対応のみ</span>
                      </label>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700"
                      >
                        <option value="recommended">おすすめ順（総合スコア）</option>
                        <option value="effective">実質月額が安い順</option>
                        <option value="payment">毎月支払額が安い順</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {evaluatedPlans.map((plan, index) => {
                      const isExpanded = expandedPlanId === plan.id;
                      return (
                        <div
                          key={plan.id}
                          className="rounded-2xl border border-slate-200 hover:border-indigo-300 transition overflow-hidden"
                        >
                          <div
                            onClick={() =>
                              setExpandedPlanId(isExpanded ? null : plan.id)
                            }
                            className="p-4 bg-white hover:bg-slate-50/70 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-xs font-extrabold text-slate-400 mr-1">
                                  {index + 1}.
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${plan.carrierStyle.badgeBg}`}
                                >
                                  {plan.carrierStyle.name}
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-medium">
                                  {plan.category}
                                </span>
                                {plan.hasStoreSupport ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                    店舗対応
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-600">
                                    Web専用
                                  </span>
                                )}
                                {plan.limitedDiscounts.length > 0 && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                                    ★{plan.limitedDiscounts[0].name}
                                  </span>
                                )}
                                {plan.zouryoApplied && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                                    ＋増量OP({plan.zouryoFreeMonths}カ月0円)
                                  </span>
                                )}
                              </div>
                              <div className="font-extrabold text-sm sm:text-base text-slate-900">
                                {plan.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                容量：{plan.dataLabel} ／ 通話：{plan.callNote}
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                              <div className="text-right">
                                <div className="text-[11px] text-slate-500">
                                  実質月額（支払 {plan.activePayment.toLocaleString()}円）
                                </div>
                                <div className="text-xl font-extrabold text-indigo-950">
                                  {plan.activeEffective.toLocaleString()}
                                  <span className="text-xs font-normal ml-0.5">
                                    円/月
                                  </span>
                                </div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-100 text-xs space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                                  <div className="font-bold text-slate-700 mb-1">
                                    計算明細
                                  </div>
                                  <div className="flex justify-between">
                                    <span>基本料金：</span>
                                    <span>{plan.basePrice.toLocaleString()}円</span>
                                  </div>
                                  {plan.discounts.map((d, i) => (
                                    <div
                                      key={i}
                                      className="flex justify-between text-emerald-700"
                                    >
                                      <span>・{d.name}：</span>
                                      <span>-{d.amount.toLocaleString()}円</span>
                                    </div>
                                  ))}
                                  {plan.limitedDiscounts.map((ld, i) => (
                                    <div
                                      key={i}
                                      className="flex justify-between text-rose-600 font-bold"
                                    >
                                      <span>
                                        ★{ld.name}（{ld.period}）：
                                      </span>
                                      <span>-{ld.amount.toLocaleString()}円</span>
                                    </div>
                                  ))}
                                  {plan.zouryoApplied && (
                                    <div className="flex justify-between text-sky-700 font-bold">
                                      <span>
                                        ＋データ増量OP（+{plan.zouryoAddGB}GB）：
                                      </span>
                                      <span>
                                        1〜{plan.zouryoFreeMonths}カ月目 0円（以降+
                                        {plan.zouryoFee}円）
                                      </span>
                                    </div>
                                  )}
                                  {plan.callFee > 0 && (
                                    <div className="flex justify-between">
                                      <span>＋通話オプション：</span>
                                      <span>+{plan.callFee.toLocaleString()}円</span>
                                    </div>
                                  )}
                                  {plan.perkValue > 0 && (
                                    <div className="flex justify-between text-indigo-600 font-semibold">
                                      <span>★ポイント・特典価値：</span>
                                      <span>
                                        -{plan.perkValue.toLocaleString()}円相当
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                                  <div className="font-bold text-slate-700 mb-1">
                                    特徴・注意点
                                  </div>
                                  {plan.reasons.map((r, i) => (
                                    <div
                                      key={i}
                                      className="text-slate-600 flex items-start gap-1.5"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                      <span>{r}</span>
                                    </div>
                                  ))}
                                  {plan.warnings.map((w, i) => (
                                    <div
                                      key={i}
                                      className="text-amber-800 flex items-start gap-1.5"
                                    >
                                      <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                      <span>{w}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <button
                                  onClick={() => {
                                    setSheetSearch(plan.name);
                                    setSheetCarrierFilter('all');
                                    setActiveTab('spreadsheet');
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition cursor-pointer"
                                >
                                  <Table className="w-3.5 h-3.5" />
                                  このプランの数値をスプレッドシートで編集する
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <Info className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-base font-bold text-slate-800">
                  条件に合致するプランが見つかりませんでした
                </div>
                <p className="text-xs text-slate-500">
                  除外しているキャリアを解除するか、「条件リセット」ボタンを押してください。
                </p>
                <button
                  onClick={resetConditions}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                >
                  条件をリセットする 
                </button>
              </div>
            )}
          </section>
        </div>
        )}
      </main>
    </div>
  );
}