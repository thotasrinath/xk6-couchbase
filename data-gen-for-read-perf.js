import xk6_couchbase from 'k6/x/couchbase';
import exec from 'k6/execution';
const client = xk6_couchbase.newClient('localhost', '<username>', '<password>');

export default () => {

    var docId= exec.scenario.iterationInTest;
    client.insert("test", "_default", "_default", docId.toString(), getRecord(docId.toString()));
}

function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}


function getRecord(id) {
    return {
        "docI1d": `${id}`,
        "tradeDate": `${randomDate(new Date(2000, 0, 1), new Date(2022, 0, 1), 0, 24).toISOString()}`,
        "meta": {
            "globalKey": "23f3fed9"
        },
        "trade": {
            "meta": {
                "globalKey": "23f3fed9"
            },
            "party": [
                {
                    "meta": {
                        "externalKey": "party1",
                        "globalKey": "33f59567",
                        "partyTradeDate": `${randomDate(new Date(2000, 0, 1), new Date(2022, 0, 1), 0, 24).toISOString()}`
                    },
                    "partyId": [
                        {
                            "identifier": {
                                "meta": {
                                    "scheme": "http://www.fpml.org/coding-scheme/dummy-party-id"
                                },
                                "value": "Party A"
                            },
                            "meta": {
                                "globalKey": "33f59567"
                            }
                        }
                    ]
                },
                {
                    "meta": {
                        "externalKey": "party2",
                        "globalKey": "33f59568",
                        "partyTradeDate": `${randomDate(new Date(2000, 0, 1), new Date(2022, 0, 1), 0, 24).toISOString()}`

                    },
                    "partyId": [
                        {
                            "identifier": {
                                "meta": {
                                    "scheme": "http://www.fpml.org/coding-scheme/dummy-party-id"
                                },
                                "value": "Party B"
                            },
                            "meta": {
                                "globalKey": "33f59568"
                            }
                        }
                    ]
                }
            ],
            "tradableProduct": {
                "counterparty": [
                    {
                        "partyReference": {
                            "externalReference": "party2",
                            "globalReference": "33f59568"
                        },
                        "role": "PARTY_1"
                    },
                    {
                        "partyReference": {
                            "externalReference": "party1",
                            "globalReference": "33f59567"
                        },
                        "role": "PARTY_2"
                    }
                ],
                "product": {
                    "contractualProduct": {
                        "productTaxonomy": [
                            {
                                "source": "ISDA",
                                "productQualifier": "InterestRate_CrossCurrency_FixedFloat"
                            }
                        ],
                        "economicTerms": {
                            "payout": {
                                "interestRatePayout": [
                                    {
                                        "payerReceiver": {
                                            "payer": "PARTY_1",
                                            "receiver": "PARTY_2"
                                        },
                                        "priceQuantity": {
                                            "meta": {
                                                "externalKey": "notionalScheduleJPY",
                                                "globalKey": "0"
                                            },
                                            "quantitySchedule": {
                                                "address": {
                                                    "scope": "DOCUMENT",
                                                    "value": "quantity-1"
                                                }
                                            }
                                        },
                                        "principalPayment": {
                                            "finalPayment": true,
                                            "initialPayment": true,
                                            "intermediatePayment": true,
                                            "meta": {
                                                "globalKey": "12a6ef"
                                            }
                                        },
                                        "calculationPeriodDates": {
                                            "calculationPeriodDatesAdjustments": {
                                                "businessCenters": {
                                                    "businessCenter": [
                                                        {
                                                            "value": "GBLO"
                                                        },
                                                        {
                                                            "value": "USNY"
                                                        },
                                                        {
                                                            "value": "JPTO"
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "81e56a96"
                                                    }
                                                },
                                                "businessDayConvention": "MODFOLLOWING",
                                                "meta": {
                                                    "globalKey": "58681de7"
                                                }
                                            },
                                            "calculationPeriodFrequency": {
                                                "meta": {
                                                    "globalKey": "28c86"
                                                },
                                                "period": "M",
                                                "periodMultiplier": 6,
                                                "rollConvention": "11"
                                            },
                                            "effectiveDate": {
                                                "adjustableDate": {
                                                    "dateAdjustments": {
                                                        "businessDayConvention": "NONE",
                                                        "meta": {
                                                            "globalKey": "24a738"
                                                        }
                                                    },
                                                    "meta": {
                                                        "globalKey": "eb7870c3"
                                                    },
                                                    "unadjustedDate": "2006-01-11"
                                                },
                                                "meta": {
                                                    "globalKey": "eb7870c3"
                                                }
                                            },
                                            "meta": {
                                                "externalKey": "fixedCalcPeriodDates",
                                                "globalKey": "30a986f2"
                                            },
                                            "terminationDate": {
                                                "adjustableDate": {
                                                    "dateAdjustments": {
                                                        "businessCenters": {
                                                            "businessCenter": [
                                                                {
                                                                    "value": "GBLO"
                                                                },
                                                                {
                                                                    "value": "USNY"
                                                                },
                                                                {
                                                                    "value": "JPTO"
                                                                }
                                                            ],
                                                            "meta": {
                                                                "globalKey": "81e56a96"
                                                            }
                                                        },
                                                        "businessDayConvention": "MODFOLLOWING",
                                                        "meta": {
                                                            "globalKey": "58681de7"
                                                        }
                                                    },
                                                    "meta": {
                                                        "globalKey": "46e069fc"
                                                    },
                                                    "unadjustedDate": "2011-01-11"
                                                },
                                                "meta": {
                                                    "globalKey": "46e069fc"
                                                }
                                            }
                                        },
                                        "cashflowRepresentation": {
                                            "cashflowsMatchParameters": true,
                                            "paymentCalculationPeriod": [
                                                {
                                                    "adjustedPaymentDate": "2006-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2006-07-11",
                                                            "adjustedStartDate": "2006-01-11",
                                                            "meta": {
                                                                "globalKey": "b6cc5a60"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 1000000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "917c0f75"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2003-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2007-01-11",
                                                            "adjustedStartDate": "2006-07-11",
                                                            "meta": {
                                                                "globalKey": "8bfc2d72"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 100000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "e3180c07"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2007-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2007-07-11",
                                                            "adjustedStartDate": "2007-01-11",
                                                            "meta": {
                                                                "globalKey": "ba8d5a60"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 1000000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "3c020775"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2008-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2008-01-11",
                                                            "adjustedStartDate": "2007-07-11",
                                                            "meta": {
                                                                "globalKey": "8fbd2d72"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 100000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "28b1e407"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2008-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2008-07-11",
                                                            "adjustedStartDate": "2008-01-11",
                                                            "meta": {
                                                                "globalKey": "be4e5a60"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 1000000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "e687ff75"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2009-01-13",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2009-01-13",
                                                            "adjustedStartDate": "2008-07-11",
                                                            "meta": {
                                                                "globalKey": "937f1630"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 100000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "d6a27603"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2009-07-13",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2009-07-13",
                                                            "adjustedStartDate": "2009-01-13",
                                                            "meta": {
                                                                "globalKey": "c2104aa0"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 1000000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "947898f3"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2010-01-12",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2010-01-12",
                                                            "adjustedStartDate": "2009-07-13",
                                                            "meta": {
                                                                "globalKey": "973fa953"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 100000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "7f732887"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2010-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2010-07-11",
                                                            "adjustedStartDate": "2010-01-12",
                                                            "meta": {
                                                                "globalKey": "c5d05e21"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 1000000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "3b93f336"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2011-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2011-01-11",
                                                            "adjustedStartDate": "2010-07-11",
                                                            "meta": {
                                                                "globalKey": "9b002d72"
                                                            },
                                                            "fixedRate": 0.01,
                                                            "notionalAmount": 100000000
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "2843cc07"
                                                    }
                                                }
                                            ]
                                        },
                                        "dayCountFraction": {
                                            "value": "ACT/365.FIXED"
                                        },
                                        "meta": {
                                            "globalKey": "b478c6c0"
                                        },
                                        "paymentDates": {
                                            "meta": {
                                                "globalKey": "e8a5aeec"
                                            },
                                            "payRelativeTo": "CALCULATION_PERIOD_END_DATE",
                                            "paymentDatesAdjustments": {
                                                "businessCenters": {
                                                    "businessCenter": [
                                                        {
                                                            "value": "GBLO"
                                                        },
                                                        {
                                                            "value": "USNY"
                                                        },
                                                        {
                                                            "value": "JPTO"
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "81e56a96"
                                                    }
                                                },
                                                "businessDayConvention": "MODFOLLOWING",
                                                "meta": {
                                                    "globalKey": "58681de7"
                                                }
                                            },
                                            "paymentFrequency": {
                                                "meta": {
                                                    "globalKey": "959"
                                                },
                                                "period": "M",
                                                "periodMultiplier": 6
                                            }
                                        },
                                        "rateSpecification": {
                                            "fixedRate": {
                                                "meta": {
                                                    "globalKey": "0"
                                                },
                                                "rateSchedule": {
                                                    "price": {
                                                        "address": {
                                                            "scope": "DOCUMENT",
                                                            "value": "price-1"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        "payerReceiver": {
                                            "payer": "PARTY_2",
                                            "receiver": "PARTY_1"
                                        },
                                        "priceQuantity": {
                                            "meta": {
                                                "globalKey": "98907a10"
                                            },
                                            "quantityMultiplier": {
                                                "fxLinkedNotionalSchedule": {
                                                    "fixingTime": {
                                                        "businessCenter": {
                                                            "value": "JPTO"
                                                        },
                                                        "hourMinuteTime": "17:00:00"
                                                    },
                                                    "fxSpotRateSource": {
                                                        "primarySource": {
                                                            "sourceProvider": {
                                                                "value": "BANK_OF_JAPAN"
                                                            }
                                                        }
                                                    },
                                                    "varyingNotionalCurrency": {
                                                        "value": "USD"
                                                    },
                                                    "varyingNotionalFixingDates": {
                                                        "meta": {
                                                            "globalKey": "da0eae22"
                                                        },
                                                        "period": "D",
                                                        "periodMultiplier": -2,
                                                        "dayType": "BUSINESS",
                                                        "businessCenters": {
                                                            "businessCenter": [
                                                                {
                                                                    "value": "USNY"
                                                                },
                                                                {
                                                                    "value": "JPTO"
                                                                }
                                                            ],
                                                            "meta": {
                                                                "globalKey": "4f79278"
                                                            }
                                                        },
                                                        "businessDayConvention": "NONE",
                                                        "dateRelativeTo": {
                                                            "externalReference": "floatingResetDates",
                                                            "globalReference": "58bd1f13"
                                                        }
                                                    },
                                                    "varyingNotionalInterimExchangePaymentDates": {
                                                        "meta": {
                                                            "globalKey": "6713b2c1"
                                                        },
                                                        "period": "D",
                                                        "periodMultiplier": 0,
                                                        "businessDayConvention": "NONE",
                                                        "dateRelativeTo": {
                                                            "externalReference": "floatingPaymentDates",
                                                            "globalReference": "e8a5aee9"
                                                        }
                                                    }
                                                }
                                            },
                                            "quantityReference": {
                                                "externalReference": "notionalScheduleJPY",
                                                "globalReference": "0"
                                            }
                                        },
                                        "principalPayment": {
                                            "finalPayment": true,
                                            "initialPayment": true,
                                            "intermediatePayment": true,
                                            "meta": {
                                                "globalKey": "12a6ef"
                                            }
                                        },
                                        "calculationPeriodDates": {
                                            "calculationPeriodDatesAdjustments": {
                                                "businessCenters": {
                                                    "businessCenter": [
                                                        {
                                                            "value": "GBLO"
                                                        },
                                                        {
                                                            "value": "USNY"
                                                        },
                                                        {
                                                            "value": "JPTO"
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "81e56a96"
                                                    }
                                                },
                                                "businessDayConvention": "MODFOLLOWING",
                                                "meta": {
                                                    "globalKey": "58681de7"
                                                }
                                            },
                                            "calculationPeriodFrequency": {
                                                "meta": {
                                                    "globalKey": "28c29"
                                                },
                                                "period": "M",
                                                "periodMultiplier": 3,
                                                "rollConvention": "11"
                                            },
                                            "effectiveDate": {
                                                "adjustableDate": {
                                                    "dateAdjustments": {
                                                        "businessDayConvention": "NONE",
                                                        "meta": {
                                                            "globalKey": "24a738"
                                                        }
                                                    },
                                                    "meta": {
                                                        "globalKey": "eb7870c3"
                                                    },
                                                    "unadjustedDate": "2006-01-11"
                                                },
                                                "meta": {
                                                    "globalKey": "eb7870c3"
                                                }
                                            },
                                            "meta": {
                                                "externalKey": "floatingCalcPeriodDates",
                                                "globalKey": "c7aa61af"
                                            },
                                            "terminationDate": {
                                                "adjustableDate": {
                                                    "dateAdjustments": {
                                                        "businessCenters": {
                                                            "businessCenter": [
                                                                {
                                                                    "value": "GBLO"
                                                                },
                                                                {
                                                                    "value": "USNY"
                                                                },
                                                                {
                                                                    "value": "JPTO"
                                                                }
                                                            ],
                                                            "meta": {
                                                                "globalKey": "81e56a96"
                                                            }
                                                        },
                                                        "businessDayConvention": "MODFOLLOWING",
                                                        "meta": {
                                                            "globalKey": "58681de7"
                                                        }
                                                    },
                                                    "meta": {
                                                        "globalKey": "46e069fc"
                                                    },
                                                    "unadjustedDate": "2011-01-11"
                                                },
                                                "meta": {
                                                    "globalKey": "46e069fc"
                                                }
                                            }
                                        },
                                        "cashflowRepresentation": {
                                            "cashflowsMatchParameters": true,
                                            "paymentCalculationPeriod": [
                                                {
                                                    "adjustedPaymentDate": "2006-04-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2006-04-11",
                                                            "adjustedStartDate": "2006-01-11",
                                                            "meta": {
                                                                "globalKey": "a6065bc1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2006-01-09",
                                                                        "meta": {
                                                                            "globalKey": "79758d8"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2006-01-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "51e6a716"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2006-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2006-07-11",
                                                            "adjustedStartDate": "2006-04-11",
                                                            "meta": {
                                                                "globalKey": "3bead301"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2006-04-07",
                                                                        "meta": {
                                                                            "globalKey": "7976fda"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2006-04-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "1edff596"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2006-10-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2006-04-11",
                                                            "adjustedStartDate": "2006-07-11",
                                                            "meta": {
                                                                "globalKey": "ce481"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2006-07-07",
                                                                        "meta": {
                                                                            "globalKey": "797871a"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2006-07-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "1a16de56"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2007-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2007-01-11",
                                                            "adjustedStartDate": "2006-10-11",
                                                            "meta": {
                                                                "globalKey": "cd96d6c1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2006-10-09",
                                                                        "meta": {
                                                                            "globalKey": "7979e98"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2006-10-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "8deb42d6"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2007-04-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2007-04-11",
                                                            "adjustedStartDate": "2007-01-11",
                                                            "meta": {
                                                                "globalKey": "e4ea5bc1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2007-01-09",
                                                                        "meta": {
                                                                            "globalKey": "79850d8"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2007-01-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "dc539f16"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2007-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2007-07-11",
                                                            "adjustedStartDate": "2007-04-11",
                                                            "meta": {
                                                                "globalKey": "7aced301"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2007-04-07",
                                                                        "meta": {
                                                                            "globalKey": "79867da"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2007-04-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "a94ced96"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2007-10-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2007-04-11",
                                                            "adjustedStartDate": "2007-07-11",
                                                            "meta": {
                                                                "globalKey": "3ef0e481"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2007-07-07",
                                                                        "meta": {
                                                                            "globalKey": "7987f1a"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2007-07-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "a483d656"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2008-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2008-01-11",
                                                            "adjustedStartDate": "2007-10-11",
                                                            "meta": {
                                                                "globalKey": "c7ad6c1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2007-10-09",
                                                                        "meta": {
                                                                            "globalKey": "7989698"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2007-10-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "18583ad6"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2008-04-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2008-04-11",
                                                            "adjustedStartDate": "2008-01-11",
                                                            "meta": {
                                                                "globalKey": "23ce5bc1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2008-01-09",
                                                                        "meta": {
                                                                            "globalKey": "79948d8"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2008-01-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "66c09716"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2008-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2008-07-11",
                                                            "adjustedStartDate": "2008-04-11",
                                                            "meta": {
                                                                "globalKey": "b9b2d301"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2008-04-07",
                                                                        "meta": {
                                                                            "globalKey": "7995fda"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2008-04-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "33b9e596"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2008-10-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2008-04-11",
                                                            "adjustedStartDate": "2008-07-11",
                                                            "meta": {
                                                                "globalKey": "7dd4e481"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2008-07-07",
                                                                        "meta": {
                                                                            "globalKey": "799771a"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2008-07-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "2ef0ce56"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2009-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2009-01-11",
                                                            "adjustedStartDate": "2008-10-11",
                                                            "meta": {
                                                                "globalKey": "4b5ed6c1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2008-10-09",
                                                                        "meta": {
                                                                            "globalKey": "7998e98"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2008-10-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "a2c532d6"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2009-04-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2009-04-11",
                                                            "adjustedStartDate": "2009-01-11",
                                                            "meta": {
                                                                "globalKey": "62b25bc1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2009-01-09",
                                                                        "meta": {
                                                                            "globalKey": "79a40d8"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2009-01-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "f12d8f16"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2009-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2009-07-11",
                                                            "adjustedStartDate": "2009-04-11",
                                                            "meta": {
                                                                "globalKey": "f896d301"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2009-04-07",
                                                                        "meta": {
                                                                            "globalKey": "79a57da"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2009-04-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "be26dd96"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2009-10-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2009-04-11",
                                                            "adjustedStartDate": "2009-07-11",
                                                            "meta": {
                                                                "globalKey": "bcb8e481"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2009-07-07",
                                                                        "meta": {
                                                                            "globalKey": "79a6f1a"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2009-07-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "b95dc656"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2010-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2010-01-11",
                                                            "adjustedStartDate": "2009-10-11",
                                                            "meta": {
                                                                "globalKey": "8a42d6c1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2009-10-09",
                                                                        "meta": {
                                                                            "globalKey": "79a8698"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2009-10-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "2d322ad6"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2010-04-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2010-04-11",
                                                            "adjustedStartDate": "2010-01-11",
                                                            "meta": {
                                                                "globalKey": "a1965bc1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2010-01-09",
                                                                        "meta": {
                                                                            "globalKey": "79b38d8"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2010-01-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "7b9a8716"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2010-07-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2010-07-11",
                                                            "adjustedStartDate": "2010-04-11",
                                                            "meta": {
                                                                "globalKey": "377ad301"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2010-04-07",
                                                                        "meta": {
                                                                            "globalKey": "79b4fda"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2010-04-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "4893d596"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2010-10-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2010-04-11",
                                                            "adjustedStartDate": "2010-07-11",
                                                            "meta": {
                                                                "globalKey": "fb9ce481"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2010-07-07",
                                                                        "meta": {
                                                                            "globalKey": "79b671a"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2010-07-07"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "43cabe56"
                                                    }
                                                },
                                                {
                                                    "adjustedPaymentDate": "2011-01-11",
                                                    "calculationPeriod": [
                                                        {
                                                            "adjustedEndDate": "2011-01-11",
                                                            "adjustedStartDate": "2010-10-11",
                                                            "meta": {
                                                                "globalKey": "c926d6c1"
                                                            },
                                                            "floatingRateDefinition": {
                                                                "rateObservation": [
                                                                    {
                                                                        "adjustedFixingDate": "2010-10-09",
                                                                        "meta": {
                                                                            "globalKey": "79b7e98"
                                                                        },
                                                                        "observationWeight": 1
                                                                    }
                                                                ]
                                                            },
                                                            "fxLinkedNotionalAmount": {
                                                                "adjustedFxSpotFixingDate": "2010-10-09"
                                                            }
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "b79f22d6"
                                                    }
                                                }
                                            ]
                                        },
                                        "dayCountFraction": {
                                            "value": "ACT/360"
                                        },
                                        "meta": {
                                            "globalKey": "33eb9f12"
                                        },
                                        "paymentDates": {
                                            "meta": {
                                                "externalKey": "floatingPaymentDates",
                                                "globalKey": "e8a5aee9"
                                            },
                                            "payRelativeTo": "CALCULATION_PERIOD_END_DATE",
                                            "paymentDatesAdjustments": {
                                                "businessCenters": {
                                                    "businessCenter": [
                                                        {
                                                            "value": "GBLO"
                                                        },
                                                        {
                                                            "value": "USNY"
                                                        },
                                                        {
                                                            "value": "JPTO"
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "81e56a96"
                                                    }
                                                },
                                                "businessDayConvention": "MODFOLLOWING",
                                                "meta": {
                                                    "globalKey": "58681de7"
                                                }
                                            },
                                            "paymentFrequency": {
                                                "meta": {
                                                    "globalKey": "956"
                                                },
                                                "period": "M",
                                                "periodMultiplier": 3
                                            }
                                        },
                                        "rateSpecification": {
                                            "floatingRate": {
                                                "meta": {
                                                    "globalKey": "0"
                                                },
                                                "rateOption": {
                                                    "address": {
                                                        "scope": "DOCUMENT",
                                                        "value": "rateOption-1"
                                                    }
                                                }
                                            }
                                        },
                                        "resetDates": {
                                            "calculationPeriodDatesReference": {
                                                "externalReference": "floatingCalcPeriodDates",
                                                "globalReference": "c7aa61af"
                                            },
                                            "fixingDates": {
                                                "meta": {
                                                    "globalKey": "20aefd48"
                                                },
                                                "period": "D",
                                                "periodMultiplier": -2,
                                                "dayType": "BUSINESS",
                                                "businessCenters": {
                                                    "businessCenter": [
                                                        {
                                                            "value": "GBLO"
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "21479e"
                                                    }
                                                },
                                                "businessDayConvention": "NONE",
                                                "dateRelativeTo": {
                                                    "externalReference": "floatingResetDates",
                                                    "globalReference": "58bd1f13"
                                                }
                                            },
                                            "meta": {
                                                "externalKey": "floatingResetDates",
                                                "globalKey": "58bd1f13"
                                            },
                                            "resetDatesAdjustments": {
                                                "businessCenters": {
                                                    "businessCenter": [
                                                        {
                                                            "value": "GBLO"
                                                        },
                                                        {
                                                            "value": "USNY"
                                                        },
                                                        {
                                                            "value": "JPTO"
                                                        }
                                                    ],
                                                    "meta": {
                                                        "globalKey": "81e56a96"
                                                    }
                                                },
                                                "businessDayConvention": "MODFOLLOWING",
                                                "meta": {
                                                    "globalKey": "58681de7"
                                                }
                                            },
                                            "resetFrequency": {
                                                "meta": {
                                                    "globalKey": "956"
                                                },
                                                "period": "M",
                                                "periodMultiplier": 3
                                            },
                                            "resetRelativeTo": "CALCULATION_PERIOD_START_DATE"
                                        }
                                    }
                                ],
                                "meta": {
                                    "globalKey": "6ef3052"
                                }
                            }
                        },
                        "meta": {
                            "globalKey": "6ef3052"
                        }
                    },
                    "meta": {
                        "globalKey": "6ef3052"
                    }
                },
                "tradeLot": [
                    {
                        "priceQuantity": [
                            {
                                "meta": {
                                    "globalKey": "d3ea5460"
                                },
                                "price": [
                                    {
                                        "meta": {
                                            "location": [
                                                {
                                                    "scope": "DOCUMENT",
                                                    "value": "price-1"
                                                }
                                            ]
                                        },
                                        "value": {
                                            "unit": {
                                                "currency": {
                                                    "value": "JPY"
                                                }
                                            },
                                            "value": 0.01,
                                            "perUnitOf": {
                                                "currency": {
                                                    "value": "JPY"
                                                }
                                            },
                                            "priceExpression": {
                                                "priceType": "INTEREST_RATE"
                                            }
                                        }
                                    }
                                ],
                                "quantity": [
                                    {
                                        "meta": {
                                            "location": [
                                                {
                                                    "scope": "DOCUMENT",
                                                    "value": "quantity-1"
                                                }
                                            ]
                                        },
                                        "value": {
                                            "unit": {
                                                "currency": {
                                                    "value": "JPY"
                                                }
                                            },
                                            "value": 1000000000
                                        }
                                    }
                                ]
                            },
                            {
                                "meta": {
                                    "globalKey": "f5c71eab"
                                },
                                "observable": {
                                    "meta": {
                                        "globalKey": "5f0c6d05"
                                    },
                                    "rateOption": {
                                        "meta": {
                                            "location": [
                                                {
                                                    "scope": "DOCUMENT",
                                                    "value": "rateOption-1"
                                                }
                                            ]
                                        },
                                        "value": {
                                            "floatingRateIndex": {
                                                "value": "USD-LIBOR-BBA"
                                            },
                                            "indexTenor": {
                                                "meta": {
                                                    "globalKey": "956"
                                                },
                                                "period": "M",
                                                "periodMultiplier": 3
                                            }
                                        }
                                    }
                                },
                                "quantity": [
                                    {
                                        "meta": {
                                            "location": [
                                                {
                                                    "scope": "DOCUMENT",
                                                    "value": "quantity-2"
                                                }
                                            ]
                                        },
                                        "value": {
                                            "unit": {
                                                "currency": {
                                                    "value": "USD"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "tradeDate": {
                "meta": {
                    "globalKey": "3e8849"
                },
                "value": "2001-01-09"
            },
            "tradeIdentifier": [
                {
                    "assignedIdentifier": [
                        {
                            "identifier": {
                                "meta": {
                                    "scheme": "http:/www.partyA.com/trade-id"
                                },
                                "value": "123"
                            }
                        }
                    ],
                    "issuerReference": {
                        "externalReference": "party1",
                        "globalReference": "33f59567"
                    },
                    "meta": {
                        "globalKey": "c7753bbd"
                    }
                },
                {
                    "assignedIdentifier": [
                        {
                            "identifier": {
                                "meta": {
                                    "scheme": "http:/www.partyB.com/trade-id"
                                },
                                "value": "123"
                            }
                        }
                    ],
                    "issuerReference": {
                        "externalReference": "party2",
                        "globalReference": "33f59568"
                    },
                    "meta": {
                        "globalKey": "c7753bbe"
                    }
                }
            ]
        },
        "customFields": {
            "testData": [
                {
                    "_id": {
                        "$oid": "595c2c59a7986c0872002043"
                    },
                    "mdate": "2017-05-24",
                    "author": [
                        "Injoon Hong",
                        "Seongwook Park",
                        "Junyoung Park",
                        "Hoi-Jun Yoo"
                    ],
                    "ee": "https://doi.org/10.1109/ASSCC.2015.7387453",
                    "booktitle": "A-SSCC",
                    "title": "A 1.9nJ/pixel embedded deep neural network processor for high speed visual attention in a mobile vision recognition SoC.",
                    "pages": "1-4",
                    "url": "db/conf/asscc/asscc2015.html#HongPPY15",
                    "year": "2015",
                    "type": "inproceedings",
                    "_key": "conf::asscc::HongPPY15",
                    "crossref": [
                        "conf::asscc::2015"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c8da7986c08721a8123"
                    },
                    "mdate": "2012-06-09",
                    "author": [
                        "Johanne Higgins"
                    ],
                    "_key": "homepages::78::11500",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {
                        "$oid": "595c2bfda7986c0872d9750e"
                    },
                    "ee": "http://doi.acm.org/10.1145/2696863",
                    "number": "1",
                    "year": "2015",
                    "mdate": "2015-01-27",
                    "author": [
                        "Ron Wakkary",
                        "Erik Stolterman"
                    ],
                    "type": "article",
                    "journal": "Interactions",
                    "volume": "22",
                    "pages": "5",
                    "url": "db/journals/interactions/interactions22.html#WakkaryS15",
                    "title": "WELCOME: HCI is everywhere.",
                    "_key": "journals::interactions::WakkaryS15"
                },
                {
                    "_id": {
                        "$oid": "595c2c14a7986c0872e30fbf"
                    },
                    "ee": "http://dx.doi.org/10.1007/s11276-014-0758-2",
                    "number": "8",
                    "year": "2014",
                    "mdate": "2014-10-17",
                    "author": [
                        "Changlong Chen",
                        "Min Song",
                        "Chunsheng Xin"
                    ],
                    "type": "article",
                    "journal": "Wireless Networks",
                    "volume": "20",
                    "pages": "2521-2528",
                    "url": "db/journals/winet/winet20.html#ChenSX14",
                    "title": "CoPD: a conjugate prior based detection scheme to countermeasure spectrum sensing data falsification attacks in cognitive radio networks.",
                    "_key": "journals::winet::ChenSX14"
                },
                {
                    "_id": {
                        "$oid": "595c2bfea7986c0872d9a283"
                    },
                    "ee": "http://doi.acm.org/10.1145/2967501",
                    "number": "3",
                    "year": "2016",
                    "mdate": "2016-08-19",
                    "author": [
                        "Jodi Tims",
                        "Stuart H. Zweben",
                        "Yan Timanovsky",
                        "Jane C. Prey"
                    ],
                    "type": "article",
                    "journal": "Inroads",
                    "volume": "7",
                    "pages": "50-63",
                    "url": "db/journals/inroads/inroads7.html#TimsZTP16",
                    "title": "ACM-NDC study 2015-2016: fourth annual study of non-doctoral-granting departments in computing.",
                    "_key": "journals::inroads::TimsZTP16"
                },
                {
                    "_id": {
                        "$oid": "595c2c43a7986c0872f6666f"
                    },
                    "mdate": "2017-05-23",
                    "author": [
                        "Krzysztof Sacha"
                    ],
                    "ee": "https://doi.org/10.1007/3-540-49646-7_26",
                    "booktitle": "SAFECOMP",
                    "title": "Safety Verification of Software Using Structured Petri Nets.",
                    "pages": "329-342",
                    "url": "db/conf/safecomp/safecomp98.html#Sacha98",
                    "year": "1998",
                    "type": "inproceedings",
                    "_key": "conf::safecomp::Sacha98",
                    "crossref": [
                        "conf::safecomp::1998"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c9ba7986c0872262e0c"
                    },
                    "mdate": "2013-01-14",
                    "author": [
                        "Simon Henrot"
                    ],
                    "_key": "homepages::124::2308",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {
                        "$oid": "595c2c37a7986c0872f266e7"
                    },
                    "mdate": "2014-07-15",
                    "author": [
                        "John Meyer"
                    ],
                    "ee": "http://www.ingentaconnect.com/content/ist/cgiv/2004/00002004/00000001/art00001",
                    "booktitle": "CGIV",
                    "title": "Color Science and Digital Color Reproduction: Delivering on the Promise.",
                    "pages": "1",
                    "url": "db/conf/cgiv/cgiv2004.html#Meyer04",
                    "year": "2004",
                    "type": "inproceedings",
                    "_key": "conf::cgiv::Meyer04",
                    "crossref": [
                        "conf::cgiv::2004"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c76a7986c08720c41ee"
                    },
                    "mdate": "2008-12-04",
                    "author": [
                        "Arindam Khaled",
                        "Bryant A. Julstrom"
                    ],
                    "ee": "http://doi.acm.org/10.1145/1389095.1389217",
                    "booktitle": "GECCO",
                    "title": "Greedy heuristics and evolutionary algorithms for the bounded minimum-label spanning tree problem.",
                    "pages": "611-612",
                    "url": "db/conf/gecco/gecco2008.html#KhaledJ08",
                    "year": "2008",
                    "type": "inproceedings",
                    "_key": "conf::gecco::KhaledJ08",
                    "crossref": [
                        "conf::gecco::2008"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c52a7986c0872fce4d3"
                    },
                    "mdate": "2017-05-25",
                    "author": [
                        "Joo Carreira",
                        "Erhan Ekmekcioglu",
                        "Ahmet M. Kondoz",
                        "Pedro A. Amado Assuno",
                        "S. Faria",
                        "D. Varuna S. X. De Silva"
                    ],
                    "ee": "https://doi.org/10.1109/ICIP.2014.7025497",
                    "booktitle": "ICIP",
                    "title": "Selective motion vector redundancies for improved error resilience in HEVC.",
                    "pages": "2457-2461",
                    "url": "db/conf/icip/icip2014.html#CarreiraEKAFS14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::icip::CarreiraEKAFS14",
                    "crossref": [
                        "conf::icip::2014"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c3ca7986c0872f3f926"
                    },
                    "mdate": "2017-05-24",
                    "author": [
                        "Otto Waltari",
                        "Jussi Kangasharju"
                    ],
                    "ee": "https://doi.org/10.1109/CCNC.2016.7444734",
                    "booktitle": "CCNC",
                    "title": "Content-Centric Networking in the Internet of Things.",
                    "pages": "73-78",
                    "url": "db/conf/ccnc/ccnc2016.html#WaltariK16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::ccnc::WaltariK16",
                    "crossref": [
                        "conf::ccnc::2016"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c48a7986c0872f8ba53"
                    },
                    "mdate": "2017-05-25",
                    "author": [
                        "Gabriele Moser",
                        "Michaela De Martino",
                        "Sebastiano B. Serpico"
                    ],
                    "ee": "https://doi.org/10.1109/IGARSS.2013.6723567",
                    "booktitle": "IGARSS",
                    "title": "A multiscale contextual approach to change detection in multisensor VHR remote sensing images.",
                    "pages": "3435-3438",
                    "url": "db/conf/igarss/igarss2013.html#MoserMS13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::igarss::MoserMS13",
                    "crossref": [
                        "conf::igarss::2013"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c18a7986c0872e4c54a"
                    },
                    "volume": "cs.LO/0301026",
                    "mdate": "2011-12-05",
                    "author": [
                        "Michael Beeson",
                        "Robert Veroff",
                        "Larry Wos"
                    ],
                    "ee": "http://arxiv.org/abs/cs.LO/0301026",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr0301.html#cs-LO-0301026",
                    "journal": "CoRR",
                    "title": "Double-Negation Elimination in Some Propositional Logics",
                    "year": "2003",
                    "type": "article",
                    "_key": "journals::corr::cs-LO-0301026"
                },
                {
                    "_id": {
                        "$oid": "595c2c2fa7986c0872ef17b0"
                    },
                    "volume": "2011",
                    "mdate": "2015-05-29",
                    "author": [
                        "Suresh Chittineni",
                        "A. N. S. Pradeep",
                        "Dinesh Godavarthi",
                        "Suresh Chandra Satapathy",
                        "S. Mohan Krishna",
                        "P. V. G. D. Prasad Reddy"
                    ],
                    "ee": "http://dx.doi.org/10.1155/2011/210918",
                    "title": "Design of Fixed and Ladder Mutation Factor-Based Clonal Selection Algorithm for Solving Unimodal and Multimodal Functions.",
                    "pages": "210918:1-210918:8",
                    "url": "db/journals/acisc/acisc2011.html#ChittineniPGSKR11",
                    "journal": "Applied Comp. Int. Soft Computing",
                    "year": "2011",
                    "type": "article",
                    "_key": "journals::acisc::ChittineniPGSKR11"
                },
                {
                    "_id": {
                        "$oid": "595c2c91a7986c08721e1cf5"
                    },
                    "mdate": "2009-06-10",
                    "author": [
                        "L. Ivrissimtzis"
                    ],
                    "_key": "homepages::84::5367",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {
                        "$oid": "595c2c87a7986c0872157a3b"
                    },
                    "mdate": "2014-01-11",
                    "author": [
                        "Vincent Faucher"
                    ],
                    "_key": "homepages::139::3982",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {
                        "$oid": "595c2c6fa7986c0872096044"
                    },
                    "mdate": "2017-05-23",
                    "author": [
                        "Martin Gaitzsch"
                    ],
                    "ee": "https://doi.org/10.1007/978-3-540-69962-0_23",
                    "booktitle": "KiVS",
                    "title": "Benutzerorientierte Leistungs- und Verfgbarkeitsbewertung von Internetdiensten am Beispiel des Portals hamburg.de.",
                    "pages": "267-274",
                    "url": "db/conf/kivs/kivs2007.html#Gaitzsch07",
                    "year": "2007",
                    "type": "inproceedings",
                    "_key": "conf::kivs::Gaitzsch07",
                    "crossref": [
                        "conf::kivs::2007"
                    ]
                },
                {
                    "_id": {
                        "$oid": "595c2c9ca7986c087226d3e9"
                    },
                    "mdate": "2015-07-30",
                    "author": [
                        "Yezhang Tu"
                    ],
                    "_key": "homepages::166::0268",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {
                        "$oid": "595c2c2aa7986c0872ecfff8"
                    },
                    "ee": "https://doi.org/10.1080/01449290500222009",
                    "number": "3",
                    "year": "2006",
                    "mdate": "2017-05-20",
                    "author": [
                        "Pei-Luen Patrick Rau",
                        "Jenwen Chen",
                        "Duye Chen"
                    ],
                    "type": "article",
                    "journal": "Behaviour & IT",
                    "volume": "25",
                    "pages": "253-261",
                    "url": "db/journals/behaviourIT/behaviourIT25.html#RauCC06",
                    "title": "A study of presentations of mobile web banners for location-based information and entertainment information websites.",
                    "_key": "journals::behaviourIT::RauCC06"
                },
                {
                    "_id": {
                        "$oid": "595c2c87a7986c087215a2ea"
                    },
                    "mdate": "2010-11-03",
                    "author": [
                        "M. V. Migueles"
                    ],
                    "_key": "homepages::05::8658",
                    "title": "Home Page",
                    "type": "www"
                }
            ]
        }
    };
}

