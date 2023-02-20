import xk6_couchbase from 'k6/x/couchbase';


const client = xk6_couchbase.newClient('localhost', 'Administrator', 'omsairam');

const batchsize = 50;

export default () => {

    var docobjs = {};

    for (var i = 0; i < batchsize; i++) {
        docobjs[makeId(15)] = getRecord();
    }

    client.insertBatch("test", "_default", "_default", docobjs);
}

function getRecord() {
    return {
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
                        "globalKey": "33f59567"
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
                        "globalKey": "33f59568"
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
                    "_id": {"$oid": "595c2c59a7986c0872002043"},
                    "mdate": "2017-05-24",
                    "author": ["Injoon Hong", "Seongwook Park", "Junyoung Park", "Hoi-Jun Yoo"],
                    "ee": "https://doi.org/10.1109/ASSCC.2015.7387453",
                    "booktitle": "A-SSCC",
                    "title": "A 1.9nJ/pixel embedded deep neural network processor for high speed visual attention in a mobile vision recognition SoC.",
                    "pages": "1-4",
                    "url": "db/conf/asscc/asscc2015.html#HongPPY15",
                    "year": "2015",
                    "type": "inproceedings",
                    "_key": "conf::asscc::HongPPY15",
                    "crossref": ["conf::asscc::2015"]
                },
                {
                    "_id": {"$oid": "595c2c8da7986c08721a8123"},
                    "mdate": "2012-06-09",
                    "author": ["Johanne Higgins"],
                    "_key": "homepages::78::11500",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2bfda7986c0872d9750e"},
                    "ee": "http://doi.acm.org/10.1145/2696863",
                    "number": "1",
                    "year": "2015",
                    "mdate": "2015-01-27",
                    "author": ["Ron Wakkary", "Erik Stolterman"],
                    "type": "article",
                    "journal": "Interactions",
                    "volume": "22",
                    "pages": "5",
                    "url": "db/journals/interactions/interactions22.html#WakkaryS15",
                    "title": "WELCOME: HCI is everywhere.",
                    "_key": "journals::interactions::WakkaryS15"
                },
                {
                    "_id": {"$oid": "595c2c14a7986c0872e30fbf"},
                    "ee": "http://dx.doi.org/10.1007/s11276-014-0758-2",
                    "number": "8",
                    "year": "2014",
                    "mdate": "2014-10-17",
                    "author": ["Changlong Chen", "Min Song", "Chunsheng Xin"],
                    "type": "article",
                    "journal": "Wireless Networks",
                    "volume": "20",
                    "pages": "2521-2528",
                    "url": "db/journals/winet/winet20.html#ChenSX14",
                    "title": "CoPD: a conjugate prior based detection scheme to countermeasure spectrum sensing data falsification attacks in cognitive radio networks.",
                    "_key": "journals::winet::ChenSX14"
                },
                {
                    "_id": {"$oid": "595c2bfea7986c0872d9a283"},
                    "ee": "http://doi.acm.org/10.1145/2967501",
                    "number": "3",
                    "year": "2016",
                    "mdate": "2016-08-19",
                    "author": ["Jodi Tims", "Stuart H. Zweben", "Yan Timanovsky", "Jane C. Prey"],
                    "type": "article",
                    "journal": "Inroads",
                    "volume": "7",
                    "pages": "50-63",
                    "url": "db/journals/inroads/inroads7.html#TimsZTP16",
                    "title": "ACM-NDC study 2015-2016: fourth annual study of non-doctoral-granting departments in computing.",
                    "_key": "journals::inroads::TimsZTP16"
                },
                {
                    "_id": {"$oid": "595c2c43a7986c0872f6666f"},
                    "mdate": "2017-05-23",
                    "author": ["Krzysztof Sacha"],
                    "ee": "https://doi.org/10.1007/3-540-49646-7_26",
                    "booktitle": "SAFECOMP",
                    "title": "Safety Verification of Software Using Structured Petri Nets.",
                    "pages": "329-342",
                    "url": "db/conf/safecomp/safecomp98.html#Sacha98",
                    "year": "1998",
                    "type": "inproceedings",
                    "_key": "conf::safecomp::Sacha98",
                    "crossref": ["conf::safecomp::1998"]
                },
                {
                    "_id": {"$oid": "595c2c9ba7986c0872262e0c"},
                    "mdate": "2013-01-14",
                    "author": ["Simon Henrot"],
                    "_key": "homepages::124::2308",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c37a7986c0872f266e7"},
                    "mdate": "2014-07-15",
                    "author": ["John Meyer"],
                    "ee": "http://www.ingentaconnect.com/content/ist/cgiv/2004/00002004/00000001/art00001",
                    "booktitle": "CGIV",
                    "title": "Color Science and Digital Color Reproduction: Delivering on the Promise.",
                    "pages": "1",
                    "url": "db/conf/cgiv/cgiv2004.html#Meyer04",
                    "year": "2004",
                    "type": "inproceedings",
                    "_key": "conf::cgiv::Meyer04",
                    "crossref": ["conf::cgiv::2004"]
                },
                {
                    "_id": {"$oid": "595c2c76a7986c08720c41ee"},
                    "mdate": "2008-12-04",
                    "author": ["Arindam Khaled", "Bryant A. Julstrom"],
                    "ee": "http://doi.acm.org/10.1145/1389095.1389217",
                    "booktitle": "GECCO",
                    "title": "Greedy heuristics and evolutionary algorithms for the bounded minimum-label spanning tree problem.",
                    "pages": "611-612",
                    "url": "db/conf/gecco/gecco2008.html#KhaledJ08",
                    "year": "2008",
                    "type": "inproceedings",
                    "_key": "conf::gecco::KhaledJ08",
                    "crossref": ["conf::gecco::2008"]
                },
                {
                    "_id": {"$oid": "595c2c52a7986c0872fce4d3"},
                    "mdate": "2017-05-25",
                    "author": ["Joo Carreira", "Erhan Ekmekcioglu", "Ahmet M. Kondoz", "Pedro A. Amado Assuno", "S. Faria", "D. Varuna S. X. De Silva"],
                    "ee": "https://doi.org/10.1109/ICIP.2014.7025497",
                    "booktitle": "ICIP",
                    "title": "Selective motion vector redundancies for improved error resilience in HEVC.",
                    "pages": "2457-2461",
                    "url": "db/conf/icip/icip2014.html#CarreiraEKAFS14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::icip::CarreiraEKAFS14",
                    "crossref": ["conf::icip::2014"]
                },
                {
                    "_id": {"$oid": "595c2c3ca7986c0872f3f926"},
                    "mdate": "2017-05-24",
                    "author": ["Otto Waltari", "Jussi Kangasharju"],
                    "ee": "https://doi.org/10.1109/CCNC.2016.7444734",
                    "booktitle": "CCNC",
                    "title": "Content-Centric Networking in the Internet of Things.",
                    "pages": "73-78",
                    "url": "db/conf/ccnc/ccnc2016.html#WaltariK16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::ccnc::WaltariK16",
                    "crossref": ["conf::ccnc::2016"]
                },
                {
                    "_id": {"$oid": "595c2c48a7986c0872f8ba53"},
                    "mdate": "2017-05-25",
                    "author": ["Gabriele Moser", "Michaela De Martino", "Sebastiano B. Serpico"],
                    "ee": "https://doi.org/10.1109/IGARSS.2013.6723567",
                    "booktitle": "IGARSS",
                    "title": "A multiscale contextual approach to change detection in multisensor VHR remote sensing images.",
                    "pages": "3435-3438",
                    "url": "db/conf/igarss/igarss2013.html#MoserMS13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::igarss::MoserMS13",
                    "crossref": ["conf::igarss::2013"]
                },
                {
                    "_id": {"$oid": "595c2c18a7986c0872e4c54a"},
                    "volume": "cs.LO/0301026",
                    "mdate": "2011-12-05",
                    "author": ["Michael Beeson", "Robert Veroff", "Larry Wos"],
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
                    "_id": {"$oid": "595c2c2fa7986c0872ef17b0"},
                    "volume": "2011",
                    "mdate": "2015-05-29",
                    "author": ["Suresh Chittineni", "A. N. S. Pradeep", "Dinesh Godavarthi", "Suresh Chandra Satapathy", "S. Mohan Krishna", "P. V. G. D. Prasad Reddy"],
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
                    "_id": {"$oid": "595c2c91a7986c08721e1cf5"},
                    "mdate": "2009-06-10",
                    "author": ["L. Ivrissimtzis"],
                    "_key": "homepages::84::5367",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c87a7986c0872157a3b"},
                    "mdate": "2014-01-11",
                    "author": ["Vincent Faucher"],
                    "_key": "homepages::139::3982",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c6fa7986c0872096044"},
                    "mdate": "2017-05-23",
                    "author": ["Martin Gaitzsch"],
                    "ee": "https://doi.org/10.1007/978-3-540-69962-0_23",
                    "booktitle": "KiVS",
                    "title": "Benutzerorientierte Leistungs- und Verfgbarkeitsbewertung von Internetdiensten am Beispiel des Portals hamburg.de.",
                    "pages": "267-274",
                    "url": "db/conf/kivs/kivs2007.html#Gaitzsch07",
                    "year": "2007",
                    "type": "inproceedings",
                    "_key": "conf::kivs::Gaitzsch07",
                    "crossref": ["conf::kivs::2007"]
                },
                {
                    "_id": {"$oid": "595c2c9ca7986c087226d3e9"},
                    "mdate": "2015-07-30",
                    "author": ["Yezhang Tu"],
                    "_key": "homepages::166::0268",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c2aa7986c0872ecfff8"},
                    "ee": "https://doi.org/10.1080/01449290500222009",
                    "number": "3",
                    "year": "2006",
                    "mdate": "2017-05-20",
                    "author": ["Pei-Luen Patrick Rau", "Jenwen Chen", "Duye Chen"],
                    "type": "article",
                    "journal": "Behaviour & IT",
                    "volume": "25",
                    "pages": "253-261",
                    "url": "db/journals/behaviourIT/behaviourIT25.html#RauCC06",
                    "title": "A study of presentations of mobile web banners for location-based information and entertainment information websites.",
                    "_key": "journals::behaviourIT::RauCC06"
                },
                {
                    "_id": {"$oid": "595c2c87a7986c087215a2ea"},
                    "mdate": "2010-11-03",
                    "author": ["M. V. Migueles"],
                    "_key": "homepages::05::8658",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c76a7986c08720c6206"},
                    "mdate": "2017-05-24",
                    "author": ["Koichi Kurumatani", "Azuma Ohuchi"],
                    "ee": "https://doi.org/10.1007/3-540-45548-5_23",
                    "booktitle": "JSAI Workshops",
                    "title": "World Trade League as a Standard Problem for Multi-agent Economics - Concept and Background.",
                    "pages": "208-217",
                    "url": "db/conf/jsai/jsai2001.html#KurumataniO01",
                    "year": "2001",
                    "type": "inproceedings",
                    "_key": "conf::jsai::KurumataniO01",
                    "crossref": ["conf::jsai::2001"]
                },
                {
                    "_id": {"$oid": "595c2c81a7986c0872107abb"},
                    "mdate": "2010-12-01",
                    "author": ["Zahra S. Razaee"],
                    "_key": "homepages::14::8773",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c69a7986c087206c863"},
                    "mdate": "2015-01-03",
                    "author": ["Steven J. Castellucci", "Robert J. Teather", "Andriy Pavlovych"],
                    "ee": "http://doi.acm.org/10.1145/2491367.2491373",
                    "booktitle": "SUI",
                    "title": "Novel metrics for 3D remote pointing.",
                    "pages": "17-20",
                    "url": "db/conf/sui/sui2013.html#CastellucciTP13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::sui::CastellucciTP13",
                    "crossref": ["conf::sui::2013"]
                },
                {
                    "_id": {"$oid": "595c2c6ca7986c0872080887"},
                    "mdate": "2017-05-24",
                    "author": ["Scott Pakin"],
                    "ee": "https://doi.org/10.1109/HPEC.2016.7761637",
                    "booktitle": "HPEC",
                    "title": "A quantum macro assembler.",
                    "pages": "1-8",
                    "url": "db/conf/hpec/hpec2016.html#Pakin16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::hpec::Pakin16",
                    "crossref": ["conf::hpec::2016"]
                },
                {
                    "_id": {"$oid": "595c2bf7a7986c0872d6c302"},
                    "ee": ["https://doi.org/10.1109/69.846289", "http://doi.ieeecomputersociety.org/10.1109/69.846289"],
                    "number": "3",
                    "year": "2000",
                    "mdate": "2017-05-20",
                    "author": ["Eui-Hong Han", "George Karypis", "Vipin Kumar"],
                    "type": "article",
                    "journal": "IEEE Trans. Knowl. Data Eng.",
                    "volume": "12",
                    "pages": "377-352",
                    "url": "db/journals/tkde/tkde12.html#HanKK00",
                    "title": "Scalable Parallel Data Mining for Association Rules.",
                    "_key": "journals::tkde::HanKK00"
                },
                {
                    "_id": {"$oid": "595c2c74a7986c08720bc81e"},
                    "mdate": "2017-05-19",
                    "author": ["Markus Kallinger", "Alfred Mertins"],
                    "ee": "https://doi.org/10.1109/ICASSP.2006.1661222",
                    "booktitle": "ICASSP (5)",
                    "title": "Multi-Channel Room Impulse Response Shaping - A Study.",
                    "pages": "101-104",
                    "url": "db/conf/icassp/icassp2006-5.html#KallingerM06",
                    "year": "2006",
                    "type": "inproceedings",
                    "_key": "conf::icassp::KallingerM06",
                    "crossref": ["conf::icassp::2006"]
                },
                {
                    "_id": {"$oid": "595c2c22a7986c0872e93c1c"},
                    "volume": "174",
                    "mdate": "2017-05-20",
                    "author": ["Xin Gao", "Jian Hou"],
                    "ee": "https://doi.org/10.1016/j.neucom.2015.10.018",
                    "title": "An improved SVM integrated GS-PCA fault diagnosis approach of Tennessee Eastman process.",
                    "pages": "906-911",
                    "url": "db/journals/ijon/ijon174.html#GaoH16",
                    "journal": "Neurocomputing",
                    "year": "2016",
                    "type": "article",
                    "_key": "journals::ijon::GaoH16"
                },
                {
                    "_id": {"$oid": "595c2c03a7986c0872dbe06e"},
                    "ee": "http://dx.doi.org/10.1016/S0377-2217(01)00170-9",
                    "number": "3",
                    "year": "2002",
                    "mdate": "2010-10-26",
                    "author": ["Steffen Jrgensen", "Peter M. Kort"],
                    "type": "article",
                    "journal": "European Journal of Operational Research",
                    "volume": "138",
                    "pages": "578-600",
                    "url": "db/journals/eor/eor138.html#JorgensenK02",
                    "title": "Optimal pricing and inventory policies: Centralized and decentralized decision making.",
                    "_key": "journals::eor::JorgensenK02"
                },
                {
                    "_id": {"$oid": "595c2c21a7986c0872e8eaba"},
                    "ee": "http://dx.doi.org/10.1021/ci960027v",
                    "number": "5",
                    "year": "1996",
                    "mdate": "2003-05-13",
                    "author": ["Harry P. Schultz", "Emily B. Schultz", "Tor P. Schultz"],
                    "type": "article",
                    "journal": "Journal of Chemical Information and Computer Sciences",
                    "volume": "36",
                    "pages": "996-1000",
                    "url": "db/journals/jcisd/jcisd36.html#SchultzSS96",
                    "title": "Topological Organic Chemistry. 10. Graph Theory and Topological Indices of Conformational Isomers.",
                    "_key": "journals::jcisd::SchultzSS96"
                },
                {
                    "_id": {"$oid": "595c2c90a7986c08721d265c"},
                    "mdate": "2015-07-05",
                    "author": ["Yves-Laurent Kom Samo"],
                    "_key": "homepages::164::7320",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c32a7986c0872f09b56"},
                    "mdate": "2017-05-17",
                    "author": ["Sumant Kulkarni", "Srinath Srinivasa", "Jyotiska Nath Khasnabish", "Kartikay Nagal", "Sandeep G. Kurdagi"],
                    "ee": ["https://doi.org/10.1109/ICDEW.2014.6818309", "http://doi.ieeecomputersociety.org/10.1109/ICDEW.2014.6818309"],
                    "booktitle": "ICDE Workshops",
                    "title": "SortingHat: A framework for deep matching between classes of entities.",
                    "pages": "90-93",
                    "url": "db/conf/icde/icdew2014.html#KulkarniSKNK14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::icde::KulkarniSKNK14",
                    "crossref": ["conf::icde::2014w"]
                },
                {
                    "_id": {"$oid": "595c2ca0a7986c08722958ba"},
                    "mdate": "2014-04-07",
                    "author": ["Kazutaka Kouda"],
                    "_key": "homepages::144::0573",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c9ba7986c087225dd01"},
                    "mdate": "2012-05-07",
                    "author": ["Hyanghong Kang"],
                    "_key": "homepages::13::11300",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c88a7986c087216a98d"},
                    "mdate": "2009-06-09",
                    "author": ["Samuel S. Chiu"],
                    "_key": "homepages::77::2798",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c6aa7986c08720732a0"},
                    "mdate": "2017-05-23",
                    "author": ["Greet Bilsen", "Rudy Lauwereins", "J. A. Peperstraete"],
                    "ee": ["https://doi.org/10.1109/HICSS.1995.375467", "http://doi.ieeecomputersociety.org/10.1109/HICSS.1995.375467"],
                    "booktitle": "HICSS (2)",
                    "title": "Compile-time scheduling with resource-constraints.",
                    "pages": "153-162",
                    "url": "db/conf/hicss/hicss1995-2.html#BilsenLP95",
                    "year": "1995",
                    "type": "inproceedings",
                    "_key": "conf::hicss::BilsenLP95",
                    "crossref": ["conf::hicss::1995"]
                },
                {
                    "_id": {"$oid": "595c2c41a7986c0872f59d26"},
                    "mdate": "2017-05-23",
                    "author": ["David Gray", "David Bowes", "Neil Davey", "Yi Sun", "Bruce Christianson"],
                    "ee": "https://doi.org/10.1007/978-3-642-03969-0_21",
                    "booktitle": "EANN",
                    "title": "Using the Support Vector Machine as a Classification Method for Software Defect Prediction with Static Code Metrics.",
                    "pages": "223-234",
                    "url": "db/conf/eann/eann2009.html#GrayBDSC09",
                    "year": "2009",
                    "type": "inproceedings",
                    "_key": "conf::eann::GrayBDSC09",
                    "crossref": ["conf::eann::2009"]
                },
                {
                    "_id": {"$oid": "595c2c14a7986c0872e32577"},
                    "ee": "http://dx.doi.org/10.1002/stvr.1525",
                    "number": "7",
                    "year": "2014",
                    "mdate": "2014-10-12",
                    "author": ["Sbastien Chdor", "Thierry Jron", "Christophe Morvan"],
                    "type": "article",
                    "journal": "Softw. Test., Verif. Reliab.",
                    "volume": "24",
                    "pages": "532-557",
                    "url": "db/journals/stvr/stvr24.html#ChedorJM14",
                    "title": "Test generation from recursive tile systems.",
                    "_key": "journals::stvr::ChedorJM14"
                },
                {
                    "_id": {"$oid": "595c2c30a7986c0872ef566b"},
                    "ee": "http://dx.doi.org/10.1137/110825698",
                    "number": "4",
                    "year": "2012",
                    "mdate": "2012-12-07",
                    "author": ["Maarten Lffler", "Wolfgang Mulzer"],
                    "type": "article",
                    "journal": "SIAM J. Comput.",
                    "volume": "41",
                    "pages": "941-974",
                    "url": "db/journals/siamcomp/siamcomp41.html#LofflerM12",
                    "title": "Triangulating the Square and Squaring the Triangle: Quadtrees and Delaunay Triangulations are Equivalent.",
                    "_key": "journals::siamcomp::LofflerM12"
                },
                {
                    "_id": {"$oid": "595c2c69a7986c0872069d7c"},
                    "mdate": "2017-05-17",
                    "author": ["Ben Tan", "Erheng Zhong", "Michael K. Ng", "Qiang Yang 0001"],
                    "ee": "https://doi.org/10.1137/1.9781611973440.24",
                    "booktitle": "SDM",
                    "title": "Mixed-Transfer: Transfer Learning over Mixed Graphs.",
                    "pages": "208-216",
                    "url": "db/conf/sdm/sdm2014.html#TanZNY14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::sdm::TanZNY14",
                    "crossref": ["conf::sdm::2014"]
                },
                {
                    "_id": {"$oid": "595c2c54a7986c0872fe0c26"},
                    "mdate": "2013-04-08",
                    "author": ["Sandeva Goonetilleke", "Yoshihiko Hayashi", "Yuichi Itoh", "Fumio Kishino"],
                    "ee": "http://aclweb.org/anthology/I/I08/I08-3009.pdf",
                    "booktitle": "IJCNLP",
                    "title": "SriShell Primo: A Predictive Sinhala Text Input System.",
                    "pages": "43-50",
                    "url": "db/conf/ijcnlp/ijcnlp2008.html#GoonetillekeHIK08",
                    "year": "2008",
                    "type": "inproceedings",
                    "_key": "conf::ijcnlp::GoonetillekeHIK08",
                    "crossref": ["conf::ijcnlp::2008"]
                },
                {
                    "_id": {"$oid": "595c2c42a7986c0872f616c4"},
                    "mdate": "2017-05-23",
                    "author": ["Xingqin Qi", "Kyle Christensen", "Robert Duval", "Edgar Fuller", "Arian Spahiu", "Qin Wu", "Cun-Quan Zhang"],
                    "ee": ["https://doi.org/10.1109/ASONAM.2010.81", "http://doi.ieeecomputersociety.org/10.1109/ASONAM.2010.81"],
                    "booktitle": "ASONAM",
                    "title": "A Hierarchical Algorithm for Clustering Extremist Web Pages.",
                    "pages": "458-463",
                    "url": "db/conf/asunam/asonam2010.html#QiCDFSWZ10",
                    "year": "2010",
                    "type": "inproceedings",
                    "_key": "conf::asunam::QiCDFSWZ10",
                    "crossref": ["conf::asunam::2010"]
                },
                {
                    "_id": {"$oid": "595c2c1aa7986c0872e594b3"},
                    "volume": "abs/1409.4813",
                    "mdate": "2014-10-01",
                    "author": ["Xiao Zhang", "Travis Martin", "Mark E. J. Newman"],
                    "ee": "http://arxiv.org/abs/1409.4813",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1409.html#ZhangMN14",
                    "journal": "CoRR",
                    "title": "Identification of core-periphery structure in networks.",
                    "year": "2014",
                    "type": "article",
                    "_key": "journals::corr::ZhangMN14"
                },
                {
                    "_id": {"$oid": "595c2c93a7986c08721f0c95"},
                    "mdate": "2014-12-04",
                    "author": ["Pavel Lobanov"],
                    "_key": "homepages::154::9721",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c64a7986c0872046ffa"},
                    "mdate": "2017-05-25",
                    "author": ["Afef Feki", "Vronique Capdevielle"],
                    "ee": "https://doi.org/10.1109/PIMRC.2011.6140047",
                    "booktitle": "PIMRC",
                    "title": "Autonomous resource allocation for dense LTE networks: A Multi Armed Bandit formulation.",
                    "pages": "66-70",
                    "url": "db/conf/pimrc/pimrc2011.html#FekiC11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::pimrc::FekiC11",
                    "crossref": ["conf::pimrc::2011"]
                },
                {
                    "_id": {"$oid": "595c2c21a7986c0872e8c3f1"},
                    "ee": ["http://dx.doi.org/10.1109/TSC.2008.2", "http://doi.ieeecomputersociety.org/10.1109/TSC.2008.2"],
                    "number": "2",
                    "year": "2008",
                    "mdate": "2016-03-09",
                    "author": ["San-Yih Hwang", "Ee-Peng Lim", "Chien-Hsiang Lee", "Cheng-Hung Chen"],
                    "type": "article",
                    "journal": "IEEE Trans. Services Computing",
                    "volume": "1",
                    "pages": "104-116",
                    "url": "db/journals/tsc/tsc1.html#HwangLLC08",
                    "title": "Dynamic Web Service Selection for Reliable Web Service Composition.",
                    "_key": "journals::tsc::HwangLLC08"
                },
                {
                    "_id": {"$oid": "595c2c93a7986c08721f3d24"},
                    "mdate": "2013-11-06",
                    "author": ["A. Newson"],
                    "_key": "homepages::136::7475",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c6da7986c087208c29f"},
                    "mdate": "2017-05-24",
                    "author": ["Tarek El Falah", "Maroua Ghnimi", "Mourad Elloumi"],
                    "ee": "https://doi.org/10.1109/DEXA.2014.24",
                    "booktitle": "DEXA Workshops",
                    "title": "A Consensus Algorithm for Simple Motifs Finding.",
                    "pages": "33-37",
                    "url": "db/conf/dexaw/dexaw2014.html#FalahGE14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::dexaw::FalahGE14",
                    "crossref": ["conf::dexaw::2014"]
                },
                {
                    "_id": {"$oid": "595c2ca5a7986c08722cd5f8"},
                    "publisher": "Shaker",
                    "school": ["University of Passau, Germany"],
                    "mdate": "2017-01-13",
                    "author": ["Christian Rank"],
                    "ee": "http://d-nb.info/953294005",
                    "title": "Mehrdimensionale Voting-Methoden zum Design fehlertoleranter Computernetzwerke.",
                    "pages": "1-199",
                    "_key": "phd::dnb::Rank98",
                    "year": "1998",
                    "isbn": "978-3-8265-3599-4",
                    "type": "phdthesis"
                },
                {
                    "_id": {"$oid": "595c2c98a7986c08722372ea"},
                    "mdate": "2017-05-18",
                    "author": ["Frdric Banville"],
                    "_key": "homepages::199::9750",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2ca4a7986c08722c52d7"},
                    "mdate": "2017-05-16",
                    "author": ["William Pelgrin"],
                    "ee": "https://doi.org/10.3233/978-1-61499-372-8-107",
                    "booktitle": "Best Practices in Computer Network Defense",
                    "title": "A Model For Positive Change: Influencing Positive Change in Cyber Security Strategy, Human Factor, and Leadership.",
                    "pages": "107-117",
                    "url": "db/series/natosec/natosec35.html#Pelgrin14",
                    "year": "2014",
                    "type": "incollection",
                    "_key": "series::natosec::Pelgrin14",
                    "crossref": ["series::natosec::35"]
                },
                {
                    "_id": {"$oid": "595c2c43a7986c0872f69c9f"},
                    "mdate": "2017-05-22",
                    "author": ["Sebastian Staamann"],
                    "ee": "https://doi.org/10.1007/978-3-642-38553-7_23",
                    "booktitle": "AFRICACRYPT",
                    "title": "An Identity-Based Key-Encapsulation Mechanism Built on Identity-Based Factors Selection.",
                    "pages": "392-405",
                    "url": "db/conf/africacrypt/africacrypt2013.html#Staamann13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::africacrypt::Staamann13",
                    "crossref": ["conf::africacrypt::2013"]
                },
                {
                    "_id": {"$oid": "595c2bfca7986c0872d91b99"},
                    "ee": "https://doi.org/10.1023/A:1026143128448",
                    "number": "4",
                    "year": "2003",
                    "mdate": "2017-05-20",
                    "author": ["Richard Canham", "Andrew M. Tyrrell"],
                    "type": "article",
                    "journal": "Genetic Programming and Evolvable Machines",
                    "volume": "4",
                    "pages": "359-382",
                    "url": "db/journals/gpem/gpem4.html#CanhamT03",
                    "title": "A Hardware Artificial Immune System and Embryonic Array for Fault Tolerant Systems.",
                    "_key": "journals::gpem::CanhamT03"
                },
                {
                    "_id": {"$oid": "595c2c6ea7986c087208d9f4"},
                    "mdate": "2012-05-10",
                    "author": ["Florian Kluge", "Chenglong Yu", "Jrg Mische", "Sascha Uhrig", "Theo Ungerer"],
                    "ee": "http://dl.acm.org/citation.cfm?id=1543828",
                    "booktitle": "SCOPES",
                    "title": "Implementing AUTOSAR scheduling and resource management on an embedded SMT processor.",
                    "pages": "33-42",
                    "url": "db/conf/scopes/scopes2009.html#KlugeYMUU09",
                    "year": "2009",
                    "type": "inproceedings",
                    "_key": "conf::scopes::KlugeYMUU09",
                    "crossref": ["conf::scopes::2009"]
                },
                {
                    "_id": {"$oid": "595c2c6da7986c0872085efc"},
                    "mdate": "2017-05-26",
                    "author": ["Germano Caronni", "Marcel Waldvogel", "Dan Sun", "Bernhard Plattner"],
                    "ee": ["https://doi.org/10.1109/ENABL.1998.725721", "http://doi.ieeecomputersociety.org/10.1109/ENABL.1998.725721"],
                    "booktitle": "WETICE",
                    "title": "Efficient Security for Large and Dynamic Multicast Groups.",
                    "pages": "376-383",
                    "url": "db/conf/wetice/wetice1998.html#CaronniWSP98",
                    "year": "1998",
                    "type": "inproceedings",
                    "_key": "conf::wetice::CaronniWSP98",
                    "crossref": ["conf::wetice::1998"]
                },
                {
                    "_id": {"$oid": "595c2c11a7986c0872e20300"},
                    "volume": "223",
                    "mdate": "2013-09-06",
                    "author": ["Ibrahima Dione", "Jos M. Urquiza"],
                    "ee": "http://dx.doi.org/10.1016/j.amc.2013.07.026",
                    "title": "Finite element approximations of the Lam system with penalized ideal contact boundary conditions.",
                    "pages": "115-126",
                    "url": "db/journals/amc/amc223.html#DioneU13",
                    "journal": "Applied Mathematics and Computation",
                    "year": "2013",
                    "type": "article",
                    "_key": "journals::amc::DioneU13"
                },
                {
                    "_id": {"$oid": "595c2c03a7986c0872db8dee"},
                    "ee": "https://doi.org/10.1007/s00454-008-9068-8",
                    "number": "2",
                    "year": "2009",
                    "mdate": "2017-05-18",
                    "author": ["Gideon Schechtman", "Adi Shraibman"],
                    "type": "article",
                    "journal": "Discrete & Computational Geometry",
                    "volume": "41",
                    "pages": "273-283",
                    "url": "db/journals/dcg/dcg41.html#SchechtmanS09",
                    "title": "Lower Bounds for Local Versions of Dimension Reductions.",
                    "_key": "journals::dcg::SchechtmanS09"
                },
                {
                    "_id": {"$oid": "595c2ca0a7986c0872296f34"},
                    "mdate": "2014-04-27",
                    "author": ["Max-Robert Ulbricht"],
                    "_key": "homepages::144::5854",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c48a7986c0872f876c0"},
                    "mdate": "2014-09-22",
                    "author": ["Eileen B. Ahles"],
                    "ee": "http://www.cmg.org/?s2member_file_download=/proceedings/1989/89INT116.pdf",
                    "booktitle": "Int. CMG Conference",
                    "title": "Meaningful Chargeback Reporting.",
                    "pages": "1089-1094",
                    "url": "db/conf/cmg/cmg1989.html#Ahles89",
                    "year": "1989",
                    "type": "inproceedings",
                    "_key": "conf::cmg::Ahles89",
                    "crossref": ["conf::cmg::1989"]
                },
                {
                    "_id": {"$oid": "595c2c00a7986c0872dab217"},
                    "ee": "https://doi.org/10.1016/j.chb.2013.05.001",
                    "number": "6",
                    "year": "2013",
                    "mdate": "2017-05-20",
                    "author": ["David B. Vallett", "Richard L. Lamb", "Leonard A. Annetta"],
                    "type": "article",
                    "journal": "Computers in Human Behavior",
                    "volume": "29",
                    "pages": "2183-2187",
                    "url": "db/journals/chb/chb29.html#VallettLA13",
                    "title": "The gorilla in the room: The impacts of video-game play on visual attention.",
                    "_key": "journals::chb::VallettLA13"
                },
                {
                    "_id": {"$oid": "595c2c58a7986c0872ffd7d5"},
                    "mdate": "2017-05-17",
                    "author": ["Yanjie Liu", "Mingyue Wu", "Guobao Xu", "Lining Sun"],
                    "ee": "https://doi.org/10.1109/URAI.2011.6145938",
                    "booktitle": "URAI",
                    "title": "Frame vibration suppression for wafer transfer system.",
                    "pages": "87-91",
                    "url": "db/conf/urai/urai2011.html#LiuWXS11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::urai::LiuWXS11",
                    "crossref": ["conf::urai::2011"]
                },
                {
                    "_id": {"$oid": "595c2c8da7986c08721a54e1"},
                    "mdate": "2011-10-23",
                    "author": ["Sheneela Naz"],
                    "_key": "homepages::88::10307",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c53a7986c0872fd97e1"},
                    "mdate": "2017-05-23",
                    "author": ["Aaron D. Ward", "Ghassan Hamarneh"],
                    "ee": "https://doi.org/10.1007/978-3-540-75757-3_34",
                    "booktitle": "MICCAI (1)",
                    "title": "Statistical Shape Modeling Using MDL Incorporating Shape, Appearance, and Expert Knowledge.",
                    "pages": "278-285",
                    "url": "db/conf/miccai/miccai2007-1.html#WardH07",
                    "year": "2007",
                    "type": "inproceedings",
                    "_key": "conf::miccai::WardH07",
                    "crossref": ["conf::miccai::2007-1"]
                },
                {
                    "_id": {"$oid": "595c2c94a7986c087220926a"},
                    "mdate": "2011-09-02",
                    "author": ["Jalal Chachi"],
                    "_key": "homepages::80::9095",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c2da7986c0872ee0e55"},
                    "ee": "http://dx.doi.org/10.1016/j.cviu.2011.03.004",
                    "number": "7",
                    "year": "2011",
                    "mdate": "2011-05-17",
                    "author": ["Brijnesh J. Jain", "Klaus Obermayer"],
                    "type": "article",
                    "journal": "Computer Vision and Image Understanding",
                    "volume": "115",
                    "pages": "946-961",
                    "url": "db/journals/cviu/cviu115.html#JainO11",
                    "title": "Graph quantization.",
                    "_key": "journals::cviu::JainO11"
                },
                {
                    "_id": {"$oid": "595c2bfaa7986c0872d81bdb"},
                    "ee": "https://doi.org/10.1109/TBCAS.2013.2255052",
                    "number": "2",
                    "year": "2013",
                    "mdate": "2017-05-18",
                    "author": ["JongKwan Choi", "MinGyu Choi", "Jae-Myoung Kim", "Hyeon-Min Bae"],
                    "type": "article",
                    "journal": "IEEE Trans. Biomed. Circuits and Systems",
                    "volume": "7",
                    "pages": "169-177",
                    "url": "db/journals/tbcas/tbcas7.html#ChoiCKB13",
                    "title": "Efficient Data Extraction Method for Near-Infrared Spectroscopy (NIRS) Systems With High Spatial and Temporal Resolution.",
                    "_key": "journals::tbcas::ChoiCKB13"
                },
                {
                    "_id": {"$oid": "595c2c2ea7986c0872eeb7ea"},
                    "ee": "http://dx.doi.org/10.1016/0097-3165(74)90007-7",
                    "number": "2",
                    "year": "1974",
                    "mdate": "2011-08-03",
                    "author": ["Charles C. Lindner"],
                    "type": "article",
                    "journal": "J. Comb. Theory, Ser. A",
                    "volume": "17",
                    "pages": "204-209",
                    "url": "db/journals/jct/jcta17.html#Lindner74",
                    "title": "A Simple Construction of Disjoint and Almost Disjoint Steiner Triple Systems.",
                    "_key": "journals::jct::Lindner74"
                },
                {
                    "_id": {"$oid": "595c2c4ba7986c0872fa2b75"},
                    "mdate": "2016-06-29",
                    "author": ["Csaba Veres"],
                    "ee": "http://ceur-ws.org/Vol-1615/semdevPaper1.pdf",
                    "booktitle": "LIME/SemDev@ESWC",
                    "title": "Creating Semantic Mind Maps from Linked Data with AutoMind Creator.",
                    "url": "db/conf/esws/lime2016.html#Veres16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::esws::Veres16",
                    "crossref": ["conf::esws::2016lime"]
                },
                {
                    "_id": {"$oid": "595c2c03a7986c0872dbc789"},
                    "ee": "http://dx.doi.org/10.1016/j.ejor.2012.03.048",
                    "number": "2",
                    "year": "2012",
                    "mdate": "2012-06-05",
                    "author": ["Ibrahim Muter", "S. Ilker Birbil", "Kerem Blbl", "Gven Sahin"],
                    "type": "article",
                    "journal": "European Journal of Operational Research",
                    "volume": "221",
                    "pages": "306-307",
                    "url": "db/journals/eor/eor221.html#MuterBBS12",
                    "title": "A note on \"A LP-based heuristic for a time-constrained routing problem\".",
                    "_key": "journals::eor::MuterBBS12"
                },
                {
                    "_id": {"$oid": "595c2c81a7986c087210df0b"},
                    "mdate": "2013-06-28",
                    "author": ["Yoav Weizman"],
                    "_key": "homepages::131::5141",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c0aa7986c0872dee8d7"},
                    "ee": "http://doi.acm.org/10.1145/1236471.1236473",
                    "number": "3",
                    "year": "2007",
                    "mdate": "2017-01-05",
                    "author": ["Surong Wang", "Manoranjan Dash", "Liang-Tien Chia", "Min Xu"],
                    "type": "article",
                    "journal": "TOMCCAP",
                    "volume": "3",
                    "pages": "14",
                    "url": "db/journals/tomccap/tomccap3.html#WangDCX07",
                    "title": "Efficient sampling of training set in large and noisy multimedia data.",
                    "_key": "journals::tomccap::WangDCX07"
                },
                {
                    "_id": {"$oid": "595c2c22a7986c0872e944ff"},
                    "volume": "237",
                    "mdate": "2017-05-20",
                    "author": ["Marco Frasca", "Giorgio Valentini"],
                    "ee": "https://doi.org/10.1016/j.neucom.2015.11.096",
                    "title": "COSNet: An R package for label prediction in unbalanced biological networks.",
                    "pages": "397-400",
                    "url": "db/journals/ijon/ijon237.html#FrascaV17",
                    "journal": "Neurocomputing",
                    "year": "2017",
                    "type": "article",
                    "_key": "journals::ijon::FrascaV17"
                },
                {
                    "_id": {"$oid": "595c2c21a7986c0872e89875"},
                    "volume": "53",
                    "mdate": "2015-04-16",
                    "author": ["Andrea Marinoni", "Ettore Rizzo", "Ivan Limongelli", "Paolo Gamba", "Riccardo Bellazzi"],
                    "ee": "http://dx.doi.org/10.1016/j.jbi.2014.10.001",
                    "title": "A kinetic model-based algorithm to classify NGS short reads by their allele origin.",
                    "pages": "121-127",
                    "url": "db/journals/jbi/jbi53.html#MarinoniRLGB15",
                    "journal": "Journal of Biomedical Informatics",
                    "year": "2015",
                    "type": "article",
                    "_key": "journals::jbi::MarinoniRLGB15"
                },
                {
                    "_id": {"$oid": "595c2c0fa7986c0872e0becc"},
                    "ee": "http://dx.doi.org/10.1016/S0165-1684(97)00127-8",
                    "number": "2",
                    "year": "1997",
                    "mdate": "2012-02-17",
                    "author": ["N. Chatterjee", "Pinakpani Pal", "J. Das"],
                    "type": "article",
                    "journal": "Signal Processing",
                    "volume": "62",
                    "pages": "229-235",
                    "url": "db/journals/sigpro/sigpro62.html#ChatterjeePD97",
                    "title": "Boundary extraction of sodar images.",
                    "_key": "journals::sigpro::ChatterjeePD97"
                },
                {
                    "_id": {"$oid": "595c2bfda7986c0872d99701"},
                    "ee": "https://doi.org/10.1109/TSG.2014.2357346",
                    "number": "1",
                    "year": "2015",
                    "mdate": "2017-05-20",
                    "author": ["Najmeh Forouzandehmehr", "Mohammad Esmalifalak", "Hamed Mohsenian Rad", "Zhu Han"],
                    "type": "article",
                    "journal": "IEEE Trans. Smart Grid",
                    "volume": "6",
                    "pages": "291-300",
                    "url": "db/journals/tsg/tsg6.html#ForouzandehmehrEMH15",
                    "title": "Autonomous Demand Response Using Stochastic Differential Games.",
                    "_key": "journals::tsg::ForouzandehmehrEMH15"
                },
                {
                    "_id": {"$oid": "595c2c96a7986c08722241d5"},
                    "mdate": "2009-09-14",
                    "author": ["Marc Messing"],
                    "_key": "homepages::45::7322",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c7fa7986c08720f26be"},
                    "mdate": "2017-05-21",
                    "author": ["Rahul Urgaonkar", "Michael J. Neely"],
                    "ee": ["https://doi.org/10.1109/WIOPT.2006.1666480", "http://eudl.eu/doi/10.1109/WIOPT.2006.1666480"],
                    "booktitle": "WiOpt",
                    "title": "Capacity region, minimum energy and delay for a mobile ad-hoc network.",
                    "pages": "222-231",
                    "url": "db/conf/wiopt/wiopt2006.html#UrgaonkarN06",
                    "year": "2006",
                    "type": "inproceedings",
                    "_key": "conf::wiopt::UrgaonkarN06",
                    "crossref": ["conf::wiopt::2006"]
                },
                {
                    "_id": {"$oid": "595c2c86a7986c0872146249"},
                    "mdate": "2011-02-10",
                    "author": ["Paul Teller"],
                    "_key": "homepages::61::9099",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c92a7986c08721e6507"},
                    "mdate": "2009-06-10",
                    "author": ["Shubhada Sahasrabudhe"],
                    "_key": "homepages::34::6409",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c9ba7986c08722637a6"},
                    "mdate": "2013-01-14",
                    "author": ["Marcel Kanta"],
                    "_key": "homepages::124::2352",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c2ca7986c0872edc81e"},
                    "ee": ["https://doi.org/10.1109/38.920623", "http://doi.ieeecomputersociety.org/10.1109/38.920623"],
                    "number": "3",
                    "year": "2001",
                    "mdate": "2017-05-20",
                    "author": ["Hanspeter Pfister", "William E. Lorensen", "Chandrajit L. Bajaj", "Gordon L. Kindlmann", "William J. Schroeder", "Lisa Sobierajski Avila", "Ken Martin", "Raghu Machiraju", "Jinho Lee"],
                    "type": "article",
                    "journal": "IEEE Computer Graphics and Applications",
                    "volume": "21",
                    "pages": "16-22",
                    "url": "db/journals/cga/cga21.html#PfisterLBKSAMML01",
                    "title": "The Transfer Function Bake-Off.",
                    "_key": "journals::cga::PfisterLBKSAMML01"
                },
                {
                    "_id": {"$oid": "595c2c97a7986c087222a083"},
                    "mdate": "2009-06-09",
                    "author": ["Hazza S. Al-Harbi"],
                    "_key": "homepages::00::1246",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c6fa7986c0872094fff"},
                    "mdate": "2015-10-30",
                    "author": ["Josef Eisl"],
                    "ee": "http://doi.acm.org/10.1145/2814189.2814199",
                    "booktitle": "SPLASH (Companion Volume)",
                    "title": "Trace register allocation.",
                    "pages": "21-23",
                    "url": "db/conf/oopsla/splash2015c.html#Eisl15",
                    "year": "2015",
                    "type": "inproceedings",
                    "_key": "conf::oopsla::Eisl15",
                    "crossref": ["conf::oopsla::2015c"]
                },
                {
                    "_id": {"$oid": "595c2c00a7986c0872daab75"},
                    "ee": "https://doi.org/10.1016/j.chb.2004.02.001",
                    "number": "1",
                    "year": "2005",
                    "mdate": "2017-05-20",
                    "author": ["Kitty Dumont", "Wolfgang Frindte"],
                    "type": "article",
                    "journal": "Computers in Human Behavior",
                    "volume": "21",
                    "pages": "73-83",
                    "url": "db/journals/chb/chb21.html#DumontF05",
                    "title": "Content analysis of the homepages of academic psychologists.",
                    "_key": "journals::chb::DumontF05"
                },
                {
                    "_id": {"$oid": "595c2c07a7986c0872dd5d63"},
                    "ee": "http://dx.doi.org/10.1162/COLI_a_00276",
                    "number": "1",
                    "year": "2017",
                    "mdate": "2017-04-24",
                    "author": ["Ivan Habernal", "Iryna Gurevych"],
                    "type": "article",
                    "journal": "Computational Linguistics",
                    "volume": "43",
                    "pages": "125-179",
                    "url": "db/journals/coling/coling43.html#HabernalG17",
                    "title": "Argumentation Mining in User-Generated Web Discourse.",
                    "_key": "journals::coling::HabernalG17"
                },
                {
                    "_id": {"$oid": "595c2c45a7986c0872f7556f"},
                    "mdate": "2011-06-07",
                    "author": ["N. Joshi", "I. Mathur", "S. Mathur"],
                    "ee": "http://doi.acm.org/10.1145/1980022.1980175",
                    "booktitle": "ICWET",
                    "title": "Translation memory for indian languages: an aid for human translators.",
                    "pages": "711-714",
                    "url": "db/conf/icwet/icwet2011.html#JoshiMM11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::icwet::JoshiMM11",
                    "crossref": ["conf::icwet::2011"]
                },
                {
                    "_id": {"$oid": "595c2c3aa7986c0872f33535"},
                    "mdate": "2015-06-30",
                    "author": ["Alan Williams", "Kevin Burrage"],
                    "ee": ["http://doi.acm.org/10.1145/224170.224192", "http://doi.ieeecomputersociety.org/10.1109/SUPERC.1995.69"],
                    "booktitle": "SC",
                    "title": "Surface Fitting Using GCV Smoothing Splines on Supercomputers.",
                    "pages": "11",
                    "url": "db/conf/sc/sc1995.html#WilliamsB95",
                    "year": "1995",
                    "type": "inproceedings",
                    "_key": "conf::sc::WilliamsB95",
                    "crossref": ["conf::sc::1995"]
                },
                {
                    "_id": {"$oid": "595c2c8aa7986c087217f089"},
                    "mdate": "2009-07-01",
                    "author": ["Cathy D. Melvin"],
                    "_key": "homepages::52::7114",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c62a7986c087203be0b"},
                    "mdate": "2009-02-24",
                    "author": ["Hamid Mcheick", "Hafedh Mili", "Rakan Mcheik"],
                    "_key": "conf::icsoft::McheickMM07",
                    "booktitle": "ICSOFT (SE)",
                    "title": "A Case Study of Distributed and Evolving Applications Using Separation of Concerns.",
                    "pages": "393-400",
                    "url": "db/conf/icsoft/icsoft2007-2.html#McheickMM07",
                    "year": "2007",
                    "type": "inproceedings",
                    "crossref": ["conf::icsoft::2007-2"]
                },
                {
                    "_id": {"$oid": "595c2ca4a7986c08722c6750"},
                    "mdate": "2017-05-16",
                    "author": ["Madhabananda Das", "Satchidananda Dehuri"],
                    "ee": "https://doi.org/10.1142/9789814280150_0010",
                    "booktitle": "Integration of Swarm Intelligence and Artificial Neural Network",
                    "title": "Some Studies on Particle Swarm Optimization for Single and Multi-Objective Problems.",
                    "pages": "239-304",
                    "url": "db/series/smpai/smpai78.html#DasD11",
                    "year": "2011",
                    "type": "incollection",
                    "_key": "series::smpai::DasD11",
                    "crossref": ["series::smpai::78"]
                },
                {
                    "_id": {"$oid": "595c2c9ea7986c087228036f"},
                    "mdate": "2013-09-03",
                    "author": ["Markta Nvratov"],
                    "_key": "homepages::133::9444",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c4aa7986c0872f98182"},
                    "mdate": "2017-05-26",
                    "author": ["Lin Liu 0001", "Eric S. K. Yu"],
                    "ee": "https://doi.org/10.1007/11610113_95",
                    "booktitle": "APWeb",
                    "title": "Modeling Identity Management Architecture Within a Social Setting.",
                    "pages": "917-922",
                    "url": "db/conf/apweb/apweb2006.html#LiuY06",
                    "year": "2006",
                    "type": "inproceedings",
                    "_key": "conf::apweb::LiuY06",
                    "crossref": ["conf::apweb::2006"]
                },
                {
                    "_id": {"$oid": "595c2c98a7986c087223d666"},
                    "mdate": "2010-12-02",
                    "author": ["Paul Farago"],
                    "_key": "homepages::71::8781",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c0ba7986c0872df643b"},
                    "ee": "http://dx.doi.org/10.1109/TIP.2005.864171",
                    "number": "6",
                    "year": "2006",
                    "mdate": "2016-03-09",
                    "author": ["Ramesh Neelamani", "Ricardo L. de Queiroz", "Zhigang Fan", "Sanjeeb Dash", "Richard G. Baraniuk"],
                    "type": "article",
                    "journal": "IEEE Trans. Image Processing",
                    "volume": "15",
                    "pages": "1365-1378",
                    "url": "db/journals/tip/tip15.html#NeelamaniQFDB06",
                    "title": "JPEG compression history estimation for color images.",
                    "_key": "journals::tip::NeelamaniQFDB06"
                },
                {
                    "_id": {"$oid": "595c2c8da7986c08721af45b"},
                    "mdate": "2012-12-17",
                    "author": ["Min B. Shin"],
                    "_key": "homepages::123::1476",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2ca1a7986c08722a86f9"},
                    "mdate": "2009-06-10",
                    "author": ["Oguzhan Cicekoglu"],
                    "_key": "homepages::23::5283",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c59a7986c0872002a92"},
                    "mdate": "2007-02-21",
                    "author": ["Tomasz Andrysiak", "Michal Choras"],
                    "_key": "conf::icinco::AndrysiakC06",
                    "booktitle": "ICINCO-RA",
                    "title": "Stereo disparity estimation using discrete orthogonal moments.",
                    "pages": "504-507",
                    "url": "db/conf/icinco/icinco2006-ra.html#AndrysiakC06",
                    "year": "2006",
                    "type": "inproceedings",
                    "crossref": ["conf::icinco::2006ra"]
                },
                {
                    "_id": {"$oid": "595c2c82a7986c08721175c2"},
                    "mdate": "2010-10-24",
                    "author": ["Zitian LI"],
                    "_key": "homepages::36::8620",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c10a7986c0872e1581c"},
                    "ee": "http://dx.doi.org/10.1007/s10202-012-0111-8",
                    "number": "3-4",
                    "year": "2012",
                    "mdate": "2013-06-27",
                    "author": ["Michael Decker"],
                    "type": "article",
                    "journal": "Poiesis & Praxis",
                    "volume": "9",
                    "pages": "181-200",
                    "url": "db/journals/pap/pap9.html#Decker12",
                    "title": "Service robots in the mirror of reflective research.",
                    "_key": "journals::pap::Decker12"
                },
                {
                    "_id": {"$oid": "595c2c4ca7986c0872fa4053"},
                    "mdate": "2017-04-30",
                    "author": ["Luka Mijatovic", "Hrvoje Dean", "Miroslav Rozic"],
                    "ee": "http://ieeexplore.ieee.org/document/6240928/",
                    "booktitle": "MIPRO",
                    "title": "Implementation of algorithm for detection and correction of defective pixels in FPGA.",
                    "pages": "1731-1735",
                    "url": "db/conf/mipro/mipro2012.html#MijatovicDR12",
                    "year": "2012",
                    "type": "inproceedings",
                    "_key": "conf::mipro::MijatovicDR12",
                    "crossref": ["conf::mipro::2012"]
                },
                {
                    "_id": {"$oid": "595c2c3da7986c0872f43b8e"},
                    "mdate": "2016-09-20",
                    "author": ["Miao Chen", "Klaus Zechner"],
                    "ee": "http://aclweb.org/anthology/W/W12/W12-2010.pdf",
                    "booktitle": "BEA@NAACL-HLT",
                    "title": "Using an Ontology for Improved Automated Content Scoring of Spontaneous Non-Native Speech.",
                    "pages": "86-94",
                    "url": "db/conf/bea/bea2012.html#ChenZ12",
                    "year": "2012",
                    "type": "inproceedings",
                    "_key": "conf::bea::ChenZ12",
                    "crossref": ["conf::bea::2012"]
                },
                {
                    "_id": {"$oid": "595c2c97a7986c087222f829"},
                    "mdate": "2009-06-10",
                    "author": ["Sun Young Hwang"],
                    "_key": "homepages::51::4875",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c28a7986c0872ebccd9"},
                    "ee": "https://doi.org/10.3166/ts.32.39-64",
                    "number": "1",
                    "year": "2015",
                    "mdate": "2017-05-18",
                    "author": ["Jrme Fellus", "David Picard", "Philippe-Henri Gosselin"],
                    "type": "article",
                    "journal": "Traitement du Signal",
                    "volume": "32",
                    "pages": "39-64",
                    "url": "db/journals/tds/tds32.html#FellusPG15",
                    "title": "Indexation multimdia par dictionnaires visuels en environnement dcentralis. Une approche par protocoles Gossip.",
                    "_key": "journals::tds::FellusPG15"
                },
                {
                    "_id": {"$oid": "595c2ca5a7986c08722cf9cd"},
                    "publisher": "Shaker",
                    "school": ["University of Erlangen-Nuremberg, Germany"],
                    "mdate": "2017-01-19",
                    "author": ["Markus Lendl"],
                    "ee": "http://d-nb.info/961133074",
                    "title": "Lernverfahren fr nichtrckgekoppelte neuronale Netzwerke.",
                    "pages": "1-123",
                    "_key": "phd::dnb::Lendl01",
                    "year": "2001",
                    "isbn": "978-3-8265-8674-3",
                    "type": "phdthesis"
                },
                {
                    "_id": {"$oid": "595c2c93a7986c08721f9187"},
                    "mdate": "2010-08-11",
                    "author": ["Stphanie Rialle"],
                    "_key": "homepages::44::8321",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c82a7986c0872119d45"},
                    "mdate": "2012-09-22",
                    "author": ["Tat'yana Vitova"],
                    "_key": "homepages::118::9243",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c7ba7986c08720e836e"},
                    "mdate": "2008-04-29",
                    "author": ["Tony Clear", "Alison Young"],
                    "ee": "http://doi.acm.org/10.1145/377435.377682",
                    "booktitle": "ITiCSE",
                    "title": "Are computing educators and researchers different from the rest?",
                    "pages": "173",
                    "url": "db/conf/iticse/iticse2001.html#ClearY01",
                    "year": "2001",
                    "type": "inproceedings",
                    "_key": "conf::iticse::ClearY01",
                    "crossref": ["conf::iticse::2001"]
                },
                {
                    "_id": {"$oid": "595c2c30a7986c0872ef9e34"},
                    "ee": "https://doi.org/10.1016/0950-5849(92)90091-3",
                    "number": "1",
                    "year": "1992",
                    "mdate": "2017-05-17",
                    "author": ["M. Hart", "Robert H. Davis"],
                    "type": "article",
                    "journal": "Information & Software Technology",
                    "volume": "34",
                    "pages": "16-27",
                    "url": "db/journals/infsof/infsof34.html#HartD92",
                    "title": "Cryptic crossword clue interpreter.",
                    "_key": "journals::infsof::HartD92"
                },
                {
                    "_id": {"$oid": "595c2ca1a7986c087229d93f"},
                    "mdate": "2016-05-10",
                    "author": ["Marcel A. J. A. van Veen"],
                    "_key": "homepages::179::6223",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c9fa7986c087228900b"},
                    "mdate": "2011-01-09",
                    "author": ["Joseph Orville"],
                    "_key": "homepages::50::8942",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c04a7986c0872dbeeb7"},
                    "ee": "http://dx.doi.org/10.1007/s10100-014-0362-7",
                    "number": "4",
                    "year": "2015",
                    "mdate": "2015-11-12",
                    "author": ["Balzs Bnhelyi", "Endre Palatinus", "Balzs L. Lvai"],
                    "type": "article",
                    "journal": "CEJOR",
                    "volume": "23",
                    "pages": "815-832",
                    "url": "db/journals/cejor/cejor23.html#BanhelyiPL15",
                    "title": "Optimal circle covering problems and their applications.",
                    "_key": "journals::cejor::BanhelyiPL15"
                },
                {
                    "_id": {"$oid": "595c2c87a7986c087215890f"},
                    "mdate": "2009-06-10",
                    "author": ["Jack M. Wolfe"],
                    "_key": "homepages::05::6030",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c27a7986c0872eb98da"},
                    "ee": "http://content.iospress.com/articles/fundamenta-informaticae/fi49-1-3-16",
                    "number": "1-3",
                    "year": "2002",
                    "mdate": "2015-05-18",
                    "author": ["Solomon Marcus"],
                    "type": "article",
                    "journal": "Fundam. Inform.",
                    "volume": "49",
                    "pages": "223-227",
                    "url": "db/journals/fuin/fuin49.html#Marcus02",
                    "title": "Membranes Versus DNA.",
                    "_key": "journals::fuin::Marcus02"
                },
                {
                    "_id": {"$oid": "595c2c1aa7986c0872e5a993"},
                    "volume": "abs/1607.04768",
                    "mdate": "2016-08-02",
                    "author": ["F. Abdolhosseini", "S. Akbari", "H. Hashemi", "M. S. Moradian"],
                    "ee": "http://arxiv.org/abs/1607.04768",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1607.html#AbdolhosseiniAH16",
                    "journal": "CoRR",
                    "title": "Hoffmann-Ostenhof's conjecture for traceable cubic graphs.",
                    "year": "2016",
                    "type": "article",
                    "_key": "journals::corr::AbdolhosseiniAH16"
                },
                {
                    "_id": {"$oid": "595c2bf9a7986c0872d7a93f"},
                    "volume": "34",
                    "mdate": "2013-01-15",
                    "author": ["Peter Sonneveld"],
                    "ee": "http://dx.doi.org/10.1137/100789889",
                    "title": "On the Convergence Behavior of IDR(s) and Related Methods.",
                    "number": "5",
                    "url": "db/journals/siamsc/siamsc34.html#Sonneveld12",
                    "journal": "SIAM J. Scientific Computing",
                    "year": "2012",
                    "type": "article",
                    "_key": "journals::siamsc::Sonneveld12"
                },
                {
                    "_id": {"$oid": "595c2c49a7986c0872f92113"},
                    "mdate": "2017-05-25",
                    "author": ["Xiangle Cheng", "Xuming Fang"],
                    "ee": "https://doi.org/10.1109/HMWC.2014.7000212",
                    "booktitle": "HMWC",
                    "title": "Principal component analysis based multiplexing solution for MIMO systems in high-speed railway.",
                    "pages": "48-52",
                    "url": "db/conf/hmwc/hmwc2014.html#ChengF14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::hmwc::ChengF14",
                    "crossref": ["conf::hmwc::2014"]
                },
                {
                    "_id": {"$oid": "595c2c2ba7986c0872ed641f"},
                    "ee": "https://doi.org/10.1038/527302a",
                    "number": "7578",
                    "year": "2015",
                    "mdate": "2017-05-20",
                    "author": ["Francine F. Abeles"],
                    "type": "article",
                    "journal": "Nature",
                    "volume": "527",
                    "pages": "302-304",
                    "url": "db/journals/nature/nature527.html#Abeles15",
                    "title": "Mathematics: Logic and Lewis Carroll.",
                    "_key": "journals::nature::Abeles15"
                },
                {
                    "_id": {"$oid": "595c2c2aa7986c0872ecaa1c"},
                    "ee": "http://doi.acm.org/10.1145/1344418.1344421",
                    "number": "2",
                    "year": "2008",
                    "mdate": "2017-01-11",
                    "author": ["Kishore Kumar Muchherla", "Pinhong Chen", "Dongsheng Ma", "Janet Meiling Wang"],
                    "type": "article",
                    "journal": "ACM Trans. Design Autom. Electr. Syst.",
                    "volume": "13",
                    "pages": "25:1-25:21",
                    "url": "db/journals/todaes/todaes13.html#MuchherlaCMW08",
                    "title": "A noniterative equivalent waveform model for timing analysis in presence of crosstalk.",
                    "_key": "journals::todaes::MuchherlaCMW08"
                },
                {
                    "_id": {"$oid": "595c2c70a7986c087209ecd2"},
                    "mdate": "2017-05-19",
                    "author": ["Michael Kohlhase"],
                    "ee": ["https://doi.org/10.1109/SYNASC.2012.78", "http://doi.ieeecomputersociety.org/10.1109/SYNASC.2012.78"],
                    "booktitle": "SYNASC",
                    "title": "The Flexiformalist Manifesto.",
                    "pages": "30-35",
                    "url": "db/conf/synasc/synasc2012.html#Kohlhase12",
                    "year": "2012",
                    "type": "inproceedings",
                    "_key": "conf::synasc::Kohlhase12",
                    "crossref": ["conf::synasc::2012"]
                },
                {
                    "_id": {"$oid": "595c2c35a7986c0872f1caa7"},
                    "mdate": "2017-05-21",
                    "author": ["Anne Gerdes", "Henrik Legind Larsen", "Jacobo Rouces"],
                    "ee": "https://doi.org/10.1007/978-3-642-40769-7_14",
                    "booktitle": "FQAS",
                    "title": "Issues of Security and Informational Privacy in Relation to an Environmental Scanning System for Fighting Organized Crime.",
                    "pages": "155-163",
                    "url": "db/conf/fqas/fqas2013.html#GerdesLR13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::fqas::GerdesLR13",
                    "crossref": ["conf::fqas::2013"]
                },
                {
                    "_id": {"$oid": "595c2c92a7986c08721e5c13"},
                    "mdate": "2009-06-09",
                    "author": ["Clinton R. Foulk"],
                    "_key": "homepages::34::3092",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c68a7986c0872062613"},
                    "mdate": "2015-11-06",
                    "author": ["Marco Mezzavilla", "Sourjya Dutta", "Menglei Zhang", "Mustafa Riza Akdeniz", "Sundeep Rangan"],
                    "ee": "http://doi.acm.org/10.1145/2811587.2811619",
                    "booktitle": "MSWiM",
                    "title": "5G MmWave Module for the ns-3 Network Simulator.",
                    "pages": "283-290",
                    "url": "db/conf/mswim/mswim2015.html#MezzavillaDZAR15",
                    "year": "2015",
                    "type": "inproceedings",
                    "_key": "conf::mswim::MezzavillaDZAR15",
                    "crossref": ["conf::mswim::2015"]
                },
                {
                    "_id": {"$oid": "595c2c76a7986c08720c6a88"},
                    "mdate": "2017-05-22",
                    "author": ["Haitao Luo"],
                    "ee": "https://doi.org/10.1117/12.2030633",
                    "booktitle": "ICDIP",
                    "title": "Local thresholding de-noise speech signal.",
                    "pages": "88780E",
                    "url": "db/conf/icdip/icdip2013.html#Luo13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::icdip::Luo13",
                    "crossref": ["conf::icdip::2013"]
                },
                {
                    "_id": {"$oid": "595c2c98a7986c087223e52a"},
                    "mdate": "2010-11-17",
                    "author": ["Adrian Iftime"],
                    "_key": "homepages::09::8714",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c81a7986c087211224b"},
                    "mdate": "2010-04-14",
                    "author": ["Kyu-Il Kim"],
                    "_key": "homepages::65::7973",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c04a7986c0872dc466c"},
                    "ee": "http://dx.doi.org/10.1016/0140-3664(78)90136-6",
                    "number": "4",
                    "year": "1978",
                    "mdate": "2006-06-22",
                    "author": ["Bernard Jamet", "M. Monnet"],
                    "type": "article",
                    "journal": "Computer Communications",
                    "volume": "1",
                    "pages": "188-195",
                    "url": "db/journals/comcom/comcom1.html#JametM78",
                    "title": "Terminal handling protocols in a packet-switched public data network.",
                    "_key": "journals::comcom::JametM78"
                },
                {
                    "_id": {"$oid": "595c2c95a7986c0872215dc0"},
                    "mdate": "2011-09-21",
                    "author": ["Anita Ratna Dewi Susanti"],
                    "_key": "homepages::35::10160",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c98a7986c087223d57b"},
                    "mdate": "2009-06-09",
                    "author": ["F. Pace"],
                    "_key": "homepages::71::1963",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c63a7986c087203e137"},
                    "mdate": "2016-11-22",
                    "author": ["Netta Iivari", "Tonja Molin-Juustila", "Marianne Kinnula"],
                    "ee": "http://aisel.aisnet.org/icis2016/DigitalInnovation/Presentations/2",
                    "booktitle": "ICIS",
                    "title": "The Future Digital Innovators: Empowering the Young Generation with Digital Fabrication and Making.",
                    "url": "db/conf/icis/icis2016.html#IivariMK16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::icis::IivariMK16",
                    "crossref": ["conf::icis::2016"]
                },
                {
                    "_id": {"$oid": "595c2c19a7986c0872e5593d"},
                    "volume": "abs/1104.1279",
                    "mdate": "2012-10-10",
                    "author": ["Ashok V. Sutagundar", "Sunilkumar S. Manvi"],
                    "ee": "http://arxiv.org/abs/1104.1279",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1104.html#abs-1104-1279",
                    "journal": "CoRR",
                    "title": "Context Aware Multisensor Image Fusion for Military Sensor Networks using Multi Agent System",
                    "year": "2011",
                    "type": "article",
                    "_key": "journals::corr::abs-1104-1279"
                },
                {
                    "_id": {"$oid": "595c2c73a7986c08720b18aa"},
                    "mdate": "2017-05-23",
                    "author": ["Caoyang Jiang", "Saeid Nooshabadi"],
                    "ee": "https://doi.org/10.1109/DCC.2016.22",
                    "booktitle": "DCC",
                    "title": "Massively Efficient Motion Estimation by Exploiting Inter-Pixel Similarities.",
                    "pages": "608",
                    "url": "db/conf/dcc/dcc2016.html#JiangN16a",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::dcc::JiangN16a",
                    "crossref": ["conf::dcc::2016"]
                },
                {
                    "_id": {"$oid": "595c2ca3a7986c08722bb2f8"},
                    "mdate": "2016-04-03",
                    "author": ["Kendall C. DeJonge"],
                    "_key": "homepages::177::9688",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c14a7986c0872e34241"},
                    "ee": "https://doi.org/10.1109/TGRS.2011.2163160",
                    "number": "11",
                    "year": "2011",
                    "mdate": "2017-05-18",
                    "author": ["Shaohui Mei", "Mingyi He", "Yifan Zhang", "Zhiyong Wang", "David Dagan Feng"],
                    "type": "article",
                    "journal": "IEEE Trans. Geoscience and Remote Sensing",
                    "volume": "49",
                    "pages": "4210-4222",
                    "url": "db/journals/tgrs/tgrs49.html#MeiHZWF11",
                    "title": "Improving Spatial-Spectral Endmember Extraction in the Presence of Anomalous Ground Objects.",
                    "_key": "journals::tgrs::MeiHZWF11"
                },
                {
                    "_id": {"$oid": "595c2c45a7986c0872f77d0c"},
                    "mdate": "2017-05-16",
                    "author": ["Min Ding 0001", "Dechang Chen", "Kai Xing", "Xiuzhen Cheng"],
                    "ee": "https://doi.org/10.1109/INFCOM.2005.1498320",
                    "booktitle": "INFOCOM",
                    "title": "Localized fault-tolerant event boundary detection in sensor networks.",
                    "pages": "902-913",
                    "url": "db/conf/infocom/infocom2005.html#DingCXC05",
                    "year": "2005",
                    "type": "inproceedings",
                    "_key": "conf::infocom::DingCXC05",
                    "crossref": ["conf::infocom::2005"]
                },
                {
                    "_id": {"$oid": "595c2c14a7986c0872e32782"},
                    "ee": "http://dx.doi.org/10.1007/s11222-011-9282-8",
                    "number": "3",
                    "year": "2012",
                    "mdate": "2012-04-23",
                    "author": ["Anestis Antoniadis", "Alberto Pasanisi"],
                    "type": "article",
                    "journal": "Statistics and Computing",
                    "volume": "22",
                    "pages": "677-679",
                    "url": "db/journals/sac/sac22.html#AntoniadisP12",
                    "title": "Modeling of computer experiments for uncertainty propagation and sensitivity analysis.",
                    "_key": "journals::sac::AntoniadisP12"
                },
                {
                    "_id": {"$oid": "595c2c32a7986c0872f05357"},
                    "publisher": "Springer",
                    "mdate": "2017-05-16",
                    "author": ["Slav Petrov"],
                    "ee": "https://doi.org/10.1007/978-3-642-22743-1",
                    "series": ["Theory and Applications of Natural Language Processing"],
                    "title": "Coarse-to-Fine Natural Language Processing.",
                    "pages": "I-XX, 1-105",
                    "_key": "books::daglib::0032688",
                    "year": "2012",
                    "isbn": ["978-3-642-22742-4", "978-3-642-22743-1"],
                    "type": "book"
                },
                {
                    "_id": {"$oid": "595c2c8ba7986c087218e62b"},
                    "mdate": "2012-10-18",
                    "author": ["Esra Satir"],
                    "_key": "homepages::119::9120",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c98a7986c087223a95c"},
                    "mdate": "2009-09-15",
                    "author": ["Mostafa Farahani"],
                    "_key": "homepages::94::7330",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c26a7986c0872eb391e"},
                    "ee": "http://dx.doi.org/10.3166/jds.10.307-326",
                    "number": "2",
                    "year": "2001",
                    "mdate": "2014-01-02",
                    "author": ["Andrew M. McCosh"],
                    "type": "article",
                    "journal": "Journal of Decision Systems",
                    "volume": "10",
                    "pages": "307-326",
                    "url": "db/journals/jds/jds10.html#McCosh01",
                    "title": "Adapting Systems for a New Corporate Home.",
                    "_key": "journals::jds::McCosh01"
                },
                {
                    "_id": {"$oid": "595c2c1ea7986c0872e74647"},
                    "ee": "https://doi.org/10.1177/0278364913514283",
                    "number": "4",
                    "year": "2014",
                    "mdate": "2017-05-18",
                    "author": ["Liefeng Bo", "Xiaofeng Ren", "Dieter Fox"],
                    "type": "article",
                    "journal": "I. J. Robotics Res.",
                    "volume": "33",
                    "pages": "581-599",
                    "url": "db/journals/ijrr/ijrr33.html#BoRF14",
                    "title": "Learning hierarchical sparse features for RGB-(D) object recognition.",
                    "_key": "journals::ijrr::BoRF14"
                },
                {
                    "_id": {"$oid": "595c2c99a7986c0872240665"},
                    "mdate": "2009-06-10",
                    "author": ["Jun Shao"],
                    "_key": "homepages::09::5442",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c04a7986c0872dc10da"},
                    "ee": ["https://doi.org/10.1109/MPRV.2004.4", "http://doi.ieeecomputersociety.org/10.1109/MPRV.2004.4"],
                    "number": "4",
                    "year": "2004",
                    "mdate": "2017-05-18",
                    "author": ["William Merrill", "Lewis Girod", "Brian Schiffer", "Dustin McIntire", "Guillaume Rava", "Katayoun Sohrabi", "Fredric Newberg", "Jeremy Elson", "William J. Kaiser"],
                    "type": "article",
                    "journal": "IEEE Pervasive Computing",
                    "volume": "3",
                    "pages": "84-90",
                    "url": "db/journals/pervasive/pervasive3.html#MerrillGSMRSNEK04",
                    "title": "Dynamic Networking and Smart Sensing Enable Next-Generation Landmines.",
                    "_key": "journals::pervasive::MerrillGSMRSNEK04"
                },
                {
                    "_id": {"$oid": "595c2ca2a7986c08722aef9a"},
                    "mdate": "2015-01-01",
                    "author": ["Andreas Olofsson"],
                    "_key": "homepages::156::0230",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c96a7986c087221daf7"},
                    "mdate": "2014-07-31",
                    "author": ["Sonali Bora"],
                    "_key": "homepages::149::1616",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c34a7986c0872f16173"},
                    "mdate": "2017-05-17",
                    "author": ["Scott Gallant", "Chris Gaughan"],
                    "ee": ["https://doi.org/10.1109/WSC.2010.5679044", "http://dl.acm.org/citation.cfm?id=2433692"],
                    "booktitle": "Winter Simulation Conference",
                    "title": "Systems engineering for distributed live, virtual, and constructive (LVC) simulation.",
                    "pages": "1501-1511",
                    "url": "db/conf/wsc/wsc2010.html#GallantG10",
                    "year": "2010",
                    "type": "inproceedings",
                    "_key": "conf::wsc::GallantG10",
                    "crossref": ["conf::wsc::2010"]
                },
                {
                    "_id": {"$oid": "595c2c8ba7986c087219408e"},
                    "mdate": "2009-06-09",
                    "author": ["Tong-jun He"],
                    "_key": "homepages::60::2149",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c17a7986c0872e46c12"},
                    "volume": "abs/1208.0952",
                    "mdate": "2012-12-13",
                    "author": ["Paolo Gasti", "Gene Tsudik", "Ersin Uzun", "Lixia Zhang 0001"],
                    "ee": "http://arxiv.org/abs/1208.0952",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1208.html#abs-1208-0952",
                    "journal": "CoRR",
                    "title": "DoS and DDoS in Named-Data Networking",
                    "year": "2012",
                    "type": "article",
                    "_key": "journals::corr::abs-1208-0952"
                },
                {
                    "_id": {"$oid": "595c2c0ca7986c0872dfd12a"},
                    "ee": "https://doi.org/10.1016/j.compmedimag.2006.09.014",
                    "number": "6-7",
                    "year": "2006",
                    "mdate": "2017-05-18",
                    "author": ["Cheick Oumar Bagayoko", "Henning Mller", "Antoine Geissbhler"],
                    "type": "article",
                    "journal": "Comp. Med. Imag. and Graph.",
                    "volume": "30",
                    "pages": "407-416",
                    "url": "db/journals/cmig/cmig30.html#BagayokoMG06",
                    "title": "Assessment of Internet-based tele-medicine in Africa (the RAFT project).",
                    "_key": "journals::cmig::BagayokoMG06"
                },
                {
                    "_id": {"$oid": "595c2c5ba7986c087200e5ef"},
                    "mdate": "2017-05-23",
                    "author": ["Aline Fernandes", "Monideepa Tarafdar", "Martin Spring"],
                    "ee": "http://aisel.aisnet.org/amcis2017/StrategicIT/Presentations/21",
                    "booktitle": "AMCIS",
                    "title": "IT alignment in temporary organizations: examining the 2016 Olympics.",
                    "url": "db/conf/amcis/amcis2017.html#FernandesTS17",
                    "year": "2017",
                    "type": "inproceedings",
                    "_key": "conf::amcis::FernandesTS17",
                    "crossref": ["conf::amcis::2017"]
                },
                {
                    "_id": {"$oid": "595c2c06a7986c0872dcd55c"},
                    "ee": "http://doi.acm.org/10.1145/227234.227245",
                    "number": "3",
                    "year": "1996",
                    "mdate": "2011-06-07",
                    "author": ["Anthony Ralston"],
                    "type": "article",
                    "journal": "Commun. ACM",
                    "volume": "39",
                    "pages": "78-84",
                    "url": "db/journals/cacm/cacm39.html#Ralston96",
                    "title": "The Demographics of Candidates for Faculty Positions in Computer Science.",
                    "_key": "journals::cacm::Ralston96"
                },
                {
                    "_id": {"$oid": "595c2c74a7986c08720b8a4f"},
                    "mdate": "2017-05-19",
                    "author": ["Kwok-Wah Law", "Cheung-Fat Chan"],
                    "ee": ["https://doi.org/10.1109/ICASSP.1994.389248", "http://doi.ieeecomputersociety.org/10.1109/ICASSP.1994.389248"],
                    "booktitle": "ICASSP (1)",
                    "title": "A novel split residual vector quantization scheme for low bit rate speech coding.",
                    "pages": "493-496",
                    "url": "db/conf/icassp/icassp1994.html#LawC94",
                    "year": "1994",
                    "type": "inproceedings",
                    "_key": "conf::icassp::LawC94",
                    "crossref": ["conf::icassp::1994"]
                },
                {
                    "_id": {"$oid": "595c2c36a7986c0872f250fb"},
                    "mdate": "2017-05-25",
                    "author": ["Lili Fang", "Budan Wu", "Junliang Chen"],
                    "ee": ["https://doi.org/10.1109/ICIS.2012.98", "http://doi.ieeecomputersociety.org/10.1109/ICIS.2012.98"],
                    "booktitle": "ACIS-ICIS",
                    "title": "Service Management Model Based on Ontology.",
                    "pages": "438-443",
                    "url": "db/conf/ACISicis/ACISicis2012.html#FangWC12",
                    "year": "2012",
                    "type": "inproceedings",
                    "_key": "conf::ACISicis::FangWC12",
                    "crossref": ["conf::ACISicis::2012"]
                },
                {
                    "_id": {"$oid": "595c2c2ea7986c0872ee8460"},
                    "ee": "https://doi.org/10.1016/0031-3203(78)90025-0",
                    "number": "3",
                    "year": "1978",
                    "mdate": "2017-05-18",
                    "author": ["Harry Blum", "Roger N. Nagel"],
                    "type": "article",
                    "journal": "Pattern Recognition",
                    "volume": "10",
                    "pages": "167-180",
                    "url": "db/journals/pr/pr10.html#BlumN78",
                    "title": "Shape description using weighted symmetric axis features.",
                    "_key": "journals::pr::BlumN78"
                },
                {
                    "_id": {"$oid": "595c2c0fa7986c0872e12362"},
                    "ee": "http://dx.doi.org/10.1109/MCOM.2012.6163573",
                    "number": "3",
                    "year": "2012",
                    "mdate": "2012-03-09",
                    "author": ["Rolf Frantz"],
                    "type": "article",
                    "journal": "IEEE Communications Magazine",
                    "volume": "50",
                    "pages": "6",
                    "url": "db/journals/cm/cm50.html#Frantz12",
                    "title": "Leadership changes [Certification Corner].",
                    "_key": "journals::cm::Frantz12"
                },
                {
                    "_id": {"$oid": "595c2ca1a7986c087229d8e2"},
                    "mdate": "2016-05-08",
                    "author": ["Eswar Prasad"],
                    "_key": "homepages::179::4833",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c04a7986c0872dc55e4"},
                    "ee": "https://doi.org/10.1109/TWC.2015.2443796",
                    "number": "11",
                    "year": "2015",
                    "mdate": "2017-05-18",
                    "author": ["Mehrdad Khaledi", "Alhussein A. Abouzeid"],
                    "type": "article",
                    "journal": "IEEE Trans. Wireless Communications",
                    "volume": "14",
                    "pages": "5900-5912",
                    "url": "db/journals/twc/twc14.html#KhalediA15",
                    "title": "Dynamic Spectrum Sharing Auction With Time-Evolving Channel Qualities.",
                    "_key": "journals::twc::KhalediA15"
                },
                {
                    "_id": {"$oid": "595c2c8ca7986c0872198f2d"},
                    "mdate": "2011-04-01",
                    "author": ["Alexandre Boulch"],
                    "_key": "homepages::47::9368",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2ca2a7986c08722b3c65"},
                    "mdate": "2013-03-06",
                    "author": ["Biprashekhar Chakraborty"],
                    "_key": "homepages::126::7481",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c42a7986c0872f602dd"},
                    "mdate": "2008-08-13",
                    "author": ["Jackson He", "Enrique Castro-Leon"],
                    "_key": "conf::iceis::HeC08",
                    "booktitle": "ICEIS (4)",
                    "title": "The Decentralized Data Center - In the Age of Service Oriented Architecture.",
                    "pages": "226-229",
                    "url": "db/conf/iceis/iceis2008-4.html#HeC08",
                    "year": "2008",
                    "type": "inproceedings",
                    "crossref": ["conf::iceis::2008-4"]
                },
                {
                    "_id": {"$oid": "595c2c12a7986c0872e2490b"},
                    "ee": ["http://dx.doi.org/10.2307/2266509", "http://projecteuclid.org/euclid.jsl/1183730617"],
                    "number": "2",
                    "year": "1949",
                    "mdate": "2014-08-05",
                    "author": ["Zoltan Paul Dienes"],
                    "type": "article",
                    "journal": "J. Symb. Log.",
                    "volume": "14",
                    "pages": "95-97",
                    "url": "db/journals/jsyml/jsyml14.html#Dienes49a",
                    "title": "On an Implication Function in Many-Valued Systems of Logic.",
                    "_key": "journals::jsyml::Dienes49a"
                },
                {
                    "_id": {"$oid": "595c2c30a7986c0872ef5e8c"},
                    "ee": "http://dx.doi.org/10.1137/S0097539791224893",
                    "number": "4",
                    "year": "1994",
                    "mdate": "2011-09-12",
                    "author": ["Karel Culik II", "Juhani Karhumki"],
                    "type": "article",
                    "journal": "SIAM J. Comput.",
                    "volume": "23",
                    "pages": "789-814",
                    "url": "db/journals/siamcomp/siamcomp23.html#CulikK94",
                    "title": "Finite Automata Computing Real Functions.",
                    "_key": "journals::siamcomp::CulikK94"
                },
                {
                    "_id": {"$oid": "595c2c93a7986c08721f793a"},
                    "mdate": "2009-06-10",
                    "author": ["Kwoung Hee Choi"],
                    "_key": "homepages::49::3807",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c18a7986c0872e491ba"},
                    "volume": "abs/1307.6784",
                    "mdate": "2017-03-28",
                    "author": ["Nadine Rons"],
                    "ee": "http://arxiv.org/abs/1307.6784",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1307.html#Rons13b",
                    "journal": "CoRR",
                    "title": "Interdisciplinary Research Collaborations: Evaluation of a Funding Program.",
                    "year": "2013",
                    "type": "article",
                    "_key": "journals::corr::Rons13b"
                },
                {
                    "_id": {"$oid": "595c2c3da7986c0872f43aa6"},
                    "mdate": "2017-05-23",
                    "author": ["Roy Meshulam", "Avi Wigderson"],
                    "ee": ["https://doi.org/10.1109/CCC.2002.1004328", "http://doi.ieeecomputersociety.org/10.1109/CCC.2002.1004328"],
                    "booktitle": "IEEE Conference on Computational Complexity",
                    "title": "Expanders from Symmetric Codes.",
                    "pages": "16",
                    "url": "db/conf/coco/coco2002.html#MeshulamW02",
                    "year": "2002",
                    "type": "inproceedings",
                    "_key": "conf::coco::MeshulamW02",
                    "crossref": ["conf::coco::2002"]
                },
                {
                    "_id": {"$oid": "595c2ca0a7986c08722971bd"},
                    "mdate": "2014-04-26",
                    "author": ["Voahangy Rakotonirina"],
                    "_key": "homepages::144::5459",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c83a7986c087212354d"},
                    "mdate": "2009-06-10",
                    "author": ["Guanghui Chang"],
                    "_key": "homepages::48::6131",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c87a7986c087215503f"},
                    "mdate": "2014-02-21",
                    "author": ["C. M. M. Mota"],
                    "_key": "homepages::141::7817",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c32a7986c0872f03e6a"},
                    "publisher": "O'Reilly",
                    "mdate": "2011-04-07",
                    "author": ["Jose Mojica"],
                    "_key": "books::daglib::0006344",
                    "title": "C# and VB.NET conversion - pocket reference: converting code from one language to another.",
                    "pages": "I-IV, 1-139",
                    "year": "2002",
                    "isbn": "978-0-596-00319-7",
                    "type": "book"
                },
                {
                    "_id": {"$oid": "595c2c41a7986c0872f5c719"},
                    "mdate": "2017-05-26",
                    "author": ["Piotr Kaminski"],
                    "ee": ["https://doi.org/10.1109/WCRE.2007.42", "http://doi.ieeecomputersociety.org/10.1109/WCRE.2007.42"],
                    "booktitle": "WCRE",
                    "title": "Reforming Software Design Documentation.",
                    "pages": "277-280",
                    "url": "db/conf/wcre/wcre2007.html#Kaminski07",
                    "year": "2007",
                    "type": "inproceedings",
                    "_key": "conf::wcre::Kaminski07",
                    "crossref": ["conf::wcre::2007"]
                },
                {
                    "_id": {"$oid": "595c2c8ea7986c08721b9aa5"},
                    "mdate": "2010-12-19",
                    "author": ["Khresna Bayu Sangka"],
                    "_key": "homepages::37::8864",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c82a7986c0872119b75"},
                    "mdate": "2012-09-19",
                    "author": ["Liesbeth Huybrechts"],
                    "_key": "homepages::118::7979",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c00a7986c0872daa38a"},
                    "volume": "23",
                    "mdate": "2017-05-20",
                    "author": ["Panos Alexopoulos", "John Pavlopoulos", "Phivos Mylonas"],
                    "ee": "https://doi.org/10.1142/S0218213014400089",
                    "title": "A Semantic Framework for Harvesting Vague Enterprise Knowledge from Microposts.",
                    "number": "2",
                    "url": "db/journals/ijait/ijait23.html#AlexopoulosPM14",
                    "journal": "International Journal on Artificial Intelligence Tools",
                    "year": "2014",
                    "type": "article",
                    "_key": "journals::ijait::AlexopoulosPM14"
                },
                {
                    "_id": {"$oid": "595c2bfda7986c0872d991bb"},
                    "ee": "http://eccc.hpi-web.de/eccc-reports/1997/TR97-006/index.html",
                    "publtype": "informal publication",
                    "number": "6",
                    "year": "1997",
                    "mdate": "2011-12-07",
                    "author": ["Marco Cesati", "Miriam Di Ianni"],
                    "type": "article",
                    "journal": "Electronic Colloquium on Computational Complexity (ECCC)",
                    "volume": "4",
                    "url": "db/journals/eccc/eccc4.html#ECCC-TR97-006",
                    "title": "Parameterized Parallel Complexity",
                    "_key": "journals::eccc::ECCC-TR97-006"
                },
                {
                    "_id": {"$oid": "595c2ca4a7986c08722c7af4"},
                    "mdate": "2017-05-16",
                    "author": ["Lior Rokach", "Roni Romano", "Barak Chizi", "Oded Maimon"],
                    "ee": "https://doi.org/10.1007/3-540-33880-2_21",
                    "booktitle": "Advances in Web Intelligence and Data Mining",
                    "title": "A Decision Tree Framework for Semi-Automatic Extraction of Product Attributes from the Web.",
                    "pages": "201-210",
                    "url": "db/series/sci/sci23.html#RokachRCM06",
                    "year": "2006",
                    "type": "incollection",
                    "_key": "series::sci::RokachRCM06",
                    "crossref": ["series::sci::2006-23"]
                },
                {
                    "_id": {"$oid": "595c2c72a7986c08720aa555"},
                    "mdate": "2017-05-17",
                    "author": ["Daniel Moreno", "Sergio F. Ochoa", "Roc Messeguer"],
                    "ee": "https://doi.org/10.1109/SMC.2014.6974067",
                    "booktitle": "SMC",
                    "title": "Understanding confidence of positioning measurements in collaborative outdoor environments.",
                    "pages": "1141-1146",
                    "url": "db/conf/smc/smc2014.html#MorenoOM14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::smc::MorenoOM14",
                    "crossref": ["conf::smc::2014"]
                },
                {
                    "_id": {"$oid": "595c2c16a7986c0872e3abad"},
                    "ee": "http://dx.doi.org/10.1093/nar/gkg051",
                    "number": "1",
                    "year": "2003",
                    "mdate": "2015-11-10",
                    "author": ["Daniel W. A. Buchan", "Stuart C. G. Rison", "James E. Bray", "David A. Lee", "Frances M. G. Pearl", "Janet M. Thornton", "Christine A. Orengo"],
                    "type": "article",
                    "journal": "Nucleic Acids Research",
                    "volume": "31",
                    "pages": "469-473",
                    "url": "db/journals/nar/nar31.html#BuchanRBLPTO03",
                    "title": "Gene3D: structural assignments for the biologist and bioinformaticist alike.",
                    "_key": "journals::nar::BuchanRBLPTO03"
                },
                {
                    "_id": {"$oid": "595c2c75a7986c08720be097"},
                    "mdate": "2017-05-19",
                    "author": ["Yanmin Qian", "Tian Tan", "Dong Yu"],
                    "ee": "https://doi.org/10.1109/ICASSP.2016.7472774",
                    "booktitle": "ICASSP",
                    "title": "An investigation into using parallel data for far-field speech recognition.",
                    "pages": "5725-5729",
                    "url": "db/conf/icassp/icassp2016.html#QianTY16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::icassp::QianTY16",
                    "crossref": ["conf::icassp::2016"]
                },
                {
                    "_id": {"$oid": "595c2c9ca7986c0872269744"},
                    "mdate": "2010-02-15",
                    "author": ["Alessia D'Acunti"],
                    "_key": "homepages::67::7834",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c95a7986c087220ef2a"},
                    "mdate": "2017-03-19",
                    "author": ["Adelaide Dinoi"],
                    "_key": "homepages::196::8881",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c2ca7986c0872eda4e9"},
                    "ee": "http://dx.doi.org/10.1002/dac.495",
                    "number": "6",
                    "year": "2001",
                    "mdate": "2015-05-06",
                    "author": ["Jyh-Horng Wen", "Wen-Jiang Chen", "Shang-Yo Lin", "Kuo-Ting Huang"],
                    "type": "article",
                    "journal": "Int. J. Communication Systems",
                    "volume": "14",
                    "pages": "575-591",
                    "url": "db/journals/ijcomsys/ijcomsys14.html#WenCLH01",
                    "title": "Performance evaluation of LIBTA/hybrid time-slot selection algorithm for cellular systems.",
                    "_key": "journals::ijcomsys::WenCLH01"
                },
                {
                    "_id": {"$oid": "595c2bfaa7986c0872d7cc23"},
                    "ee": "https://doi.org/10.1007/s11229-012-0069-z",
                    "number": "1",
                    "year": "2012",
                    "mdate": "2017-05-20",
                    "author": ["Dominique Tourns"],
                    "type": "article",
                    "journal": "Synthese",
                    "volume": "186",
                    "pages": "257-288",
                    "url": "db/journals/synthese/synthese186.html#Tournes12",
                    "title": "Diagrams in the theory of differential equations (eighteenth to nineteenth centuries).",
                    "_key": "journals::synthese::Tournes12"
                },
                {
                    "_id": {"$oid": "595c2c55a7986c0872fe7538"},
                    "mdate": "2017-03-16",
                    "author": ["Srinivas Patil", "Prithviraj Banerjee"],
                    "ee": "http://doi.acm.org/10.1145/74382.74439",
                    "booktitle": "DAC",
                    "title": "A Parallel Branch and Bound Algorithm for Test Generation.",
                    "pages": "339-343",
                    "url": "db/conf/dac/dac89.html#PatilB89",
                    "year": "1989",
                    "type": "inproceedings",
                    "_key": "conf::dac::PatilB89",
                    "crossref": ["conf::dac::1989"]
                },
                {
                    "_id": {"$oid": "595c2c1fa7986c0872e7e79c"},
                    "ee": "http://dx.doi.org/10.1109/TCIAIG.2010.2050590",
                    "number": "2",
                    "year": "2010",
                    "mdate": "2016-01-08",
                    "author": ["Daniele Loiacono", "Pier Luca Lanzi", "Julian Togelius", "Enrique Onieva", "David A. Pelta", "Martin V. Butz", "Thies D. Lnneker", "Luigi Cardamone", "Diego Perez Liebana", "Yago Sez", "Mike Preuss", "Jan Quadflieg"],
                    "type": "article",
                    "journal": "IEEE Trans. Comput. Intellig. and AI in Games",
                    "volume": "2",
                    "pages": "131-147",
                    "url": "db/journals/tciaig/tciaig2.html#LoiaconoLTOPBLCPSPQ10",
                    "title": "The 2009 Simulated Car Racing Championship.",
                    "_key": "journals::tciaig::LoiaconoLTOPBLCPSPQ10"
                },
                {
                    "_id": {"$oid": "595c2c98a7986c087223f3bb"},
                    "mdate": "2009-06-10",
                    "author": ["Shunichi Kato"],
                    "_key": "homepages::09::3897",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c82a7986c0872117fcb"},
                    "mdate": "2009-06-08",
                    "author": ["A. Josub"],
                    "_key": "homepages::36::57",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c57a7986c0872ff670b"},
                    "mdate": "2017-05-21",
                    "author": ["Hongli He", "Hangguan Shan", "Aiping Huang", "Long Sun"],
                    "ee": "https://doi.org/10.1109/ICCChina.2015.7448691",
                    "booktitle": "ICCC",
                    "title": "SMDP-based resource allocation for video streaming in cognitive vehicular networks.",
                    "pages": "1-6",
                    "url": "db/conf/iccchina/iccchina2015.html#HeSHS15",
                    "year": "2015",
                    "type": "inproceedings",
                    "_key": "conf::iccchina::HeSHS15",
                    "crossref": ["conf::iccchina::2015"]
                },
                {
                    "_id": {"$oid": "595c2ca2a7986c08722b3379"},
                    "mdate": "2010-02-07",
                    "author": ["Zhou Ziyong"],
                    "_key": "homepages::41::7821",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c0aa7986c0872deee51"},
                    "ee": "http://dx.doi.org/10.1007/s00373-012-1243-2",
                    "number": "1",
                    "year": "2013",
                    "mdate": "2012-12-17",
                    "author": ["Xueliang Li", "Yongtang Shi", "Yuefang Sun"],
                    "type": "article",
                    "journal": "Graphs and Combinatorics",
                    "volume": "29",
                    "pages": "1-38",
                    "url": "db/journals/gc/gc29.html#LiSS13",
                    "title": "Rainbow Connections of Graphs: A Survey.",
                    "_key": "journals::gc::LiSS13"
                },
                {
                    "_id": {"$oid": "595c2c18a7986c0872e48d73"},
                    "volume": "abs/1404.7843",
                    "mdate": "2014-05-01",
                    "author": ["Farhan Farhan"],
                    "ee": "http://arxiv.org/abs/1404.7843",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1404.html#Farhan14",
                    "journal": "CoRR",
                    "title": "Study of Timing Synchronization in MIMO-OFDM Systems Using DVB-T.",
                    "year": "2014",
                    "type": "article",
                    "_key": "journals::corr::Farhan14"
                },
                {
                    "_id": {"$oid": "595c2c9fa7986c087228a860"},
                    "mdate": "2014-04-23",
                    "author": ["Pedro D. Doate"],
                    "_key": "homepages::50::6788",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c28a7986c0872ebbce7"},
                    "ee": "http://dx.doi.org/10.1016/j.orl.2016.02.008",
                    "number": "3",
                    "year": "2016",
                    "mdate": "2016-06-08",
                    "author": ["Hoda Bidkhori", "David Simchi-Levi", "Yehua Wei"],
                    "type": "article",
                    "journal": "Oper. Res. Lett.",
                    "volume": "44",
                    "pages": "291-296",
                    "url": "db/journals/orl/orl44.html#BidkhoriSW16",
                    "title": "Analyzing process flexibility: A distribution-free approach with partial expectations.",
                    "_key": "journals::orl::BidkhoriSW16"
                },
                {
                    "_id": {"$oid": "595c2c38a7986c0872f2d1f6"},
                    "mdate": "2017-05-26",
                    "author": ["Chuan Luo", "Xiaolong Zheng", "Daniel Dajun Zeng"],
                    "ee": "https://doi.org/10.1109/JISIC.2014.50",
                    "booktitle": "JISIC",
                    "title": "Causal Inference in Social Media Using Convergent Cross Mapping.",
                    "pages": "260-263",
                    "url": "db/conf/isi/jisic2014.html#LuoZZ14",
                    "year": "2014",
                    "type": "inproceedings",
                    "_key": "conf::isi::LuoZZ14",
                    "crossref": ["conf::isi::2014"]
                },
                {
                    "_id": {"$oid": "595c2c58a7986c0872ffe33a"},
                    "mdate": "2017-05-26",
                    "author": ["Jaakko Peltonen", "Ziyuan Lin"],
                    "ee": "https://doi.org/10.1007/978-3-319-50106-2_5",
                    "booktitle": "Graph Drawing",
                    "title": "Peacock Bundles: Bundle Coloring for Graphs with Globality-Locality Trade-Off.",
                    "pages": "52-64",
                    "url": "db/conf/gd/gd2016.html#PeltonenL16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::gd::PeltonenL16",
                    "crossref": ["conf::gd::2016"]
                },
                {
                    "_id": {"$oid": "595c2c89a7986c0872173f36"},
                    "mdate": "2009-06-09",
                    "author": ["Roger M. Enoka"],
                    "_key": "homepages::18::2102",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c96a7986c0872221559"},
                    "mdate": "2014-05-08",
                    "author": ["Jennifer L. Miksis-Olds"],
                    "_key": "homepages::145::0949",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2ca0a7986c08722988bf"},
                    "mdate": "2014-04-06",
                    "author": ["Mathias Gergely"],
                    "_key": "homepages::143::9993",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c93a7986c08721f57e7"},
                    "mdate": "2009-06-09",
                    "author": ["Xiang-rong Zhou"],
                    "_key": "homepages::49::2968",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c0da7986c0872e0194c"},
                    "ee": "https://doi.org/10.1007/s11432-012-4606-7",
                    "number": "8",
                    "year": "2012",
                    "mdate": "2017-05-17",
                    "author": ["Jialian Sheng", "Lei Zhang 0019", "Gang Xu", "Mengdao Xing", "Zheng Bao"],
                    "type": "article",
                    "journal": "SCIENCE CHINA Information Sciences",
                    "volume": "55",
                    "pages": "1898-1909",
                    "url": "db/journals/chinaf/chinaf55.html#ShengZXXB12",
                    "title": "Coherent processing for ISAR imaging with sparse apertures.",
                    "_key": "journals::chinaf::ShengZXXB12"
                },
                {
                    "_id": {"$oid": "595c2c6ba7986c087207aadc"},
                    "mdate": "2017-05-24",
                    "author": ["Nadia Magnenat-Thalmann", "Pascal Volino", "Frederic Cordier"],
                    "ee": ["https://doi.org/10.1109/CA.2002.1017537", "http://doi.ieeecomputersociety.org/10.1109/CA.2002.1017537"],
                    "booktitle": "CA",
                    "title": "Avenues of Research in Dynamic Clothing.",
                    "pages": "193-202",
                    "url": "db/conf/ca/ca2002.html#Magnenat-ThalmannVC02",
                    "year": "2002",
                    "type": "inproceedings",
                    "_key": "conf::ca::Magnenat-ThalmannVC02",
                    "crossref": ["conf::ca::2002"]
                },
                {
                    "_id": {"$oid": "595c2c94a7986c0872208e2f"},
                    "mdate": "2012-05-09",
                    "author": ["Karekin D. Esmeryan"],
                    "_key": "homepages::80::11318",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c80a7986c08720fd02c"},
                    "mdate": "2016-06-14",
                    "author": ["Kiara Colon"],
                    "_key": "homepages::181::3750",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c3ea7986c0872f4a731"},
                    "mdate": "2017-05-25",
                    "author": ["G. R. Gangadharan", "Vincenzo D'Andrea", "Michael Weiss"],
                    "ee": ["https://doi.org/10.1007/978-0-387-72486-7_24", "http://dl.ifip.org/db/conf/oss/oss2007/GangadharanDW07.pdf"],
                    "booktitle": "OSS",
                    "title": "Free/Open Services: Conceptualization, Classification, and Commercialization.",
                    "pages": "253-258",
                    "url": "db/conf/oss/oss2007.html#GangadharanDW07",
                    "year": "2007",
                    "type": "inproceedings",
                    "_key": "conf::oss::GangadharanDW07",
                    "crossref": ["conf::oss::2007"]
                },
                {
                    "_id": {"$oid": "595c2c9aa7986c0872259f3c"},
                    "mdate": "2014-10-10",
                    "author": ["Charles Y. Liu"],
                    "_key": "homepages::152::1953",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c4ba7986c0872fa2be3"},
                    "volume": "682",
                    "publisher": "CEUR-WS:2Eorg",
                    "mdate": "2016-05-30",
                    "ee": ["http://ceur-ws.org/Vol-682", "http://nbn-resolving.de/urn:nbn:de:0074-682-4"],
                    "series": ["CEUR Workshop Proceedings"],
                    "booktitle": "SBPM",
                    "title": "Proceedings of the 5th International Workshop on Semantic Business Process Management SBPM 2010, held in conjunction with the European Semantic Web Conference (ESWC 2010), Heraklion, Greece, May 31, 2010",
                    "url": "db/conf/esws/sbpm2010.html",
                    "editor": ["Nenad Stojanovic", "Barry Norton"],
                    "year": "2010",
                    "type": "proceedings",
                    "_key": "conf::esws::2010sbpm"
                },
                {
                    "_id": {"$oid": "595c2c4fa7986c0872fbcf0f"},
                    "mdate": "2017-05-26",
                    "author": ["Jihwan Lee", "Keehwan Park", "Sunil Prabhakar"],
                    "ee": "https://doi.org/10.1109/ICDM.2016.0125",
                    "booktitle": "ICDM",
                    "title": "Mining Statistically Significant Attribute Associations in Attributed Graphs.",
                    "pages": "991-996",
                    "url": "db/conf/icdm/icdm2016.html#LeePP16",
                    "year": "2016",
                    "type": "inproceedings",
                    "_key": "conf::icdm::LeePP16",
                    "crossref": ["conf::icdm::2016"]
                },
                {
                    "_id": {"$oid": "595c2c62a7986c087203c0d9"},
                    "mdate": "2017-05-21",
                    "author": ["Adarsh K. Ramasubramonian", "John W. Woods"],
                    "ee": "https://doi.org/10.1117/12.872897",
                    "booktitle": "Visual Information Processing and Communication",
                    "title": "MD/PNC with feedback for heterogeneous video multicast in lossy networks.",
                    "pages": "78820M",
                    "url": "db/conf/vipc/vipc2011.html#Ramasubramonian11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::vipc::Ramasubramonian11",
                    "crossref": ["conf::vipc::2011"]
                },
                {
                    "_id": {"$oid": "595c2ca1a7986c08722a17ee"},
                    "mdate": "2009-06-10",
                    "author": ["J. Mononen"],
                    "_key": "homepages::01::6504",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c17a7986c0872e41c1f"},
                    "volume": "abs/cs/0504028",
                    "mdate": "2011-12-05",
                    "author": ["Michael Peleg", "Amichai Sanderovich", "Shlomo Shamai"],
                    "ee": "http://arxiv.org/abs/cs/0504028",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr0504.html#abs-cs-0504028",
                    "journal": "CoRR",
                    "title": "On Extrinsic Information of Good Codes Operating Over Discrete Memoryless Channels",
                    "year": "2005",
                    "type": "article",
                    "_key": "journals::corr::abs-cs-0504028"
                },
                {
                    "_id": {"$oid": "595c2c5fa7986c0872020841"},
                    "mdate": "2014-08-12",
                    "author": ["Luisa Portoni", "Carlo Combi", "Francesco Pinciroli"],
                    "ee": "http://knowledge.amia.org/amia-55142-a1998a-1.588514/t-002-1.590026/f-001-1.590027/a-279-1.590196/a-280-1.590193",
                    "booktitle": "AMIA",
                    "title": "Clinical Views: Object-Oriented Views for Clinical Databases.",
                    "url": "db/conf/amia/amia1998.html#PortoniCP98",
                    "year": "1998",
                    "type": "inproceedings",
                    "_key": "conf::amia::PortoniCP98",
                    "crossref": ["conf::amia::1998"]
                },
                {
                    "_id": {"$oid": "595c2c90a7986c08721d5d87"},
                    "mdate": "2011-08-28",
                    "author": ["Yixing Yuan"],
                    "_key": "homepages::83::10016",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c88a7986c087216d030"},
                    "mdate": "2012-12-10",
                    "author": ["Kristin Hoffmann"],
                    "_key": "homepages::122::7823",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c95a7986c087220c055"},
                    "mdate": "2009-06-09",
                    "author": ["Valentyn Omelyanchyk"],
                    "_key": "homepages::64::3175",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c3da7986c0872f44ebd"},
                    "mdate": "2014-07-28",
                    "author": ["David A. Mandell"],
                    "_key": "conf::icpp::Mandell87",
                    "booktitle": "ICPP",
                    "title": "Experiences and Results Multitasking a Hydrodynamics Code on Global and Local Memory Machines.",
                    "pages": "415-420",
                    "url": "db/conf/icpp/icpp1987.html#Mandell87",
                    "year": "1987",
                    "type": "inproceedings",
                    "crossref": ["conf::icpp::1987"]
                },
                {
                    "_id": {"$oid": "595c2c19a7986c0872e50a35"},
                    "volume": "abs/1201.4754",
                    "mdate": "2012-10-10",
                    "author": ["Haris Aziz", "Florian Brandl"],
                    "ee": "http://arxiv.org/abs/1201.4754",
                    "publtype": "informal publication",
                    "url": "db/journals/corr/corr1201.html#abs-1201-4754",
                    "journal": "CoRR",
                    "title": "Existence of Stability in Hedonic Coalition Formation Games",
                    "year": "2012",
                    "type": "article",
                    "_key": "journals::corr::abs-1201-4754"
                },
                {
                    "_id": {"$oid": "595c2c1ba7986c0872e5fb58"},
                    "ee": "https://doi.org/10.1177/0018720815599284",
                    "number": "8",
                    "year": "2015",
                    "mdate": "2017-05-18",
                    "author": ["Baekhee Lee", "Mina Lee", "Myeung Sook Yoh", "Heecheon You", "Hyunji Park", "Kihyo Jung", "Byung Hwa Lee", "Duk L. Na", "Geon Ha Kim"],
                    "type": "article",
                    "journal": "Human Factors",
                    "volume": "57",
                    "pages": "1348-1358",
                    "url": "db/journals/hf/hf57.html#LeeLYYPJLNK15",
                    "title": "The Effects of Age, Gender, and Hand on Force Control Capabilities of Healthy Adults.",
                    "_key": "journals::hf::LeeLYYPJLNK15"
                },
                {
                    "_id": {"$oid": "595c2c8da7986c08721ab624"},
                    "mdate": "2009-06-10",
                    "author": ["Tobias Surmann"],
                    "_key": "homepages::99::6581",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c48a7986c0872f8a477"},
                    "mdate": "2017-05-25",
                    "author": ["Michael Mller 0001"],
                    "ee": "https://doi.org/10.1109/IGARSS.2012.6351899",
                    "booktitle": "IGARSS",
                    "title": "The adaptive inverse scale space method for hyperspectral unmixing.",
                    "pages": "7492-7495",
                    "url": "db/conf/igarss/igarss2012.html#Moller12",
                    "year": "2012",
                    "type": "inproceedings",
                    "_key": "conf::igarss::Moller12",
                    "crossref": ["conf::igarss::2012"]
                },
                {
                    "_id": {"$oid": "595c2c66a7986c0872053292"},
                    "mdate": "2013-07-07",
                    "author": ["Izdihar Jamil", "Kenton O'Hara", "Mark J. Perry", "Abhijit Karnik", "Sriram Subramanian"],
                    "ee": "http://doi.acm.org/10.1145/1978942.1979393",
                    "booktitle": "CHI",
                    "title": "The effects of interaction techniques on talk patterns in collaborative peer learning around interactive tables.",
                    "pages": "3043-3052",
                    "url": "db/conf/chi/chi2011.html#JamilOPKS11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::chi::JamilOPKS11",
                    "crossref": ["conf::chi::2011"]
                },
                {
                    "_id": {"$oid": "595c2c8ea7986c08721b82c9"},
                    "mdate": "2009-06-09",
                    "author": ["Bijilash Babu"],
                    "_key": "homepages::37::2135",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c1ba7986c0872e64a89"},
                    "ee": "http://dx.doi.org/10.1109/JSAC.2006.875112",
                    "number": "9",
                    "year": "2006",
                    "mdate": "2016-03-18",
                    "author": ["Y.-H. Han", "J. Choi", "S.-H. Hwang"],
                    "type": "article",
                    "journal": "IEEE Journal on Selected Areas in Communications",
                    "volume": "24",
                    "pages": "1758-1772",
                    "url": "db/journals/jsac/jsac24.html#HanCH06",
                    "title": "Reactive Handover Optimization in IPv6-Based Mobile Networks.",
                    "_key": "journals::jsac::HanCH06"
                },
                {
                    "_id": {"$oid": "595c2c3ca7986c0872f3b6bb"},
                    "volume": "6003",
                    "publisher": "Springer",
                    "mdate": "2017-05-19",
                    "ee": "https://doi.org/10.1007/978-3-642-12365-8",
                    "series": ["Lecture Notes in Computer Science"],
                    "booktitle": "TMA",
                    "title": "Traffic Monitoring and Analysis, Second International Workshop, TMA 2010, Zurich, Switzerland, April 7, 2010, Proceedings",
                    "url": "db/conf/tma/tma2010.html",
                    "editor": ["Fabio Ricciato", "Marco Mellia", "Ernst W. Biersack"],
                    "year": "2010",
                    "isbn": "978-3-642-12364-1",
                    "type": "proceedings",
                    "_key": "conf::tma::2010"
                },
                {
                    "_id": {"$oid": "595c2c4aa7986c0872f95c2b"},
                    "mdate": "2017-05-19",
                    "author": ["Daniel Mueller-Gritschneder", "Kun Lu", "Ulf Schlichtmann"],
                    "ee": ["https://doi.org/10.1109/DSD.2011.82", "http://doi.ieeecomputersociety.org/10.1109/DSD.2011.82"],
                    "booktitle": "DSD",
                    "title": "Control-Flow-Driven Source Level Timing Annotation for Embedded Software Models on Transaction Level.",
                    "pages": "600-607",
                    "url": "db/conf/dsd/dsd2011.html#Mueller-GritschnederLS11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::dsd::Mueller-GritschnederLS11",
                    "crossref": ["conf::dsd::2011"]
                },
                {
                    "_id": {"$oid": "595c2c1da7986c0872e6dd71"},
                    "ee": "http://dx.doi.org/10.1198/tech.2006.s429",
                    "number": "4",
                    "year": "2006",
                    "mdate": "2016-08-15",
                    "author": ["Stephen J. Ganocy"],
                    "type": "article",
                    "journal": "Technometrics",
                    "volume": "48",
                    "pages": "569",
                    "url": "db/journals/technometrics/technometrics48.html#Ganocy06",
                    "title": "Numerical Methods for Nonlinear Estimating Equations.",
                    "_key": "journals::technometrics::Ganocy06"
                },
                {
                    "_id": {"$oid": "595c2ca0a7986c0872294b99"},
                    "mdate": "2009-06-10",
                    "author": ["B. S. Northcote"],
                    "_key": "homepages::25::4748",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c26a7986c0872eb0f18"},
                    "ee": "http://dx.doi.org/10.5755/j01.itc.46.1.13881",
                    "number": "1",
                    "year": "2017",
                    "mdate": "2017-04-10",
                    "author": ["Mona Faraji-Niri", "Mohammad-Reza Jahed Motlagh"],
                    "type": "article",
                    "journal": "ITC",
                    "volume": "46",
                    "pages": "37-52",
                    "url": "db/journals/itc/itc46.html#Faraji-NiriM17",
                    "title": "Stochastic Stability and Stabilization of Semi-Markov Jump Linear Systems with Uncertain Transition Rates.",
                    "_key": "journals::itc::Faraji-NiriM17"
                },
                {
                    "_id": {"$oid": "595c2c37a7986c0872f2cb99"},
                    "mdate": "2017-05-24",
                    "author": ["Hoang-Quynh Le", "Mai-Vu Tran", "Nhat-Nam Bui", "Nguyen-Cuong Phan", "Quang-Thuy Ha"],
                    "ee": ["https://doi.org/10.1109/IALP.2011.37", "http://doi.ieeecomputersociety.org/10.1109/IALP.2011.37"],
                    "booktitle": "IALP",
                    "title": "An Integrated Approach Using Conditional Random Fields for Named Entity Recognition and Person Property Extraction in Vietnamese Text.",
                    "pages": "115-118",
                    "url": "db/conf/ialp/ialp2011.html#LeTBPH11",
                    "year": "2011",
                    "type": "inproceedings",
                    "_key": "conf::ialp::LeTBPH11",
                    "crossref": ["conf::ialp::2011"]
                },
                {
                    "_id": {"$oid": "595c2c93a7986c08721f4245"},
                    "mdate": "2013-11-05",
                    "author": ["Changyi Sun"],
                    "_key": "homepages::136::6903",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c48a7986c0872f8bbae"},
                    "mdate": "2017-05-25",
                    "author": ["Bei Zhao", "Yanfei Zhong", "Liangpei Zhang"],
                    "ee": "https://doi.org/10.1109/IGARSS.2013.6721125",
                    "booktitle": "IGARSS",
                    "title": "Hybrid generative/discriminative scene classification strategy based on latent dirichlet allocation for high spatial resolution remote sensing imagery.",
                    "pages": "196-199",
                    "url": "db/conf/igarss/igarss2013.html#ZhaoZZ13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::igarss::ZhaoZZ13",
                    "crossref": ["conf::igarss::2013"]
                },
                {
                    "_id": {"$oid": "595c2c6fa7986c0872094093"},
                    "mdate": "2017-05-22",
                    "author": ["Yudai Fudaba", "Yuko Tsusaka", "Jun Ozawa"],
                    "ee": "https://doi.org/10.1109/IROS.2013.6696337",
                    "booktitle": "IROS",
                    "title": "Vascular load reduction control based on operator's skill for catheter insertion.",
                    "pages": "90-95",
                    "url": "db/conf/iros/iros2013.html#FudabaTO13",
                    "year": "2013",
                    "type": "inproceedings",
                    "_key": "conf::iros::FudabaTO13",
                    "crossref": ["conf::iros::2013"]
                },
                {
                    "_id": {"$oid": "595c2c8fa7986c08721be7ec"},
                    "mdate": "2009-06-10",
                    "author": ["Jong-Myung Choi"],
                    "_key": "homepages::55::5549",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2bfca7986c0872d8dced"},
                    "ee": "https://doi.org/10.1305/ndjfl/1093882948",
                    "number": "1",
                    "year": "1980",
                    "mdate": "2017-05-18",
                    "author": ["D. Michael Miller", "Jon C. Muzio"],
                    "type": "article",
                    "journal": "Notre Dame Journal of Formal Logic",
                    "volume": "21",
                    "pages": "148-154",
                    "url": "db/journals/ndjfl/ndjfl21.html#MillerM80",
                    "title": "A class of two-place three-valued unary generators.",
                    "_key": "journals::ndjfl::MillerM80"
                },
                {
                    "_id": {"$oid": "595c2c91a7986c08721dbd7d"},
                    "mdate": "2011-01-12",
                    "author": ["Gianluca Buffa"],
                    "_key": "homepages::02::8974",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c32a7986c0872f0766e"},
                    "mdate": "2017-05-17",
                    "author": ["Peifang Zhou", "Oliver W. W. Yang"],
                    "ee": "https://doi.org/10.1109/ICCCN.1999.805553",
                    "booktitle": "ICCCN",
                    "title": "Scalability and QoS guarantee in IP networks.",
                    "pages": "427-433",
                    "url": "db/conf/icccn/icccn1999.html#ZhouY99",
                    "year": "1999",
                    "type": "inproceedings",
                    "_key": "conf::icccn::ZhouY99",
                    "crossref": ["conf::icccn::1999"]
                },
                {
                    "_id": {"$oid": "595c2c9ba7986c087226640b"},
                    "mdate": "2010-06-18",
                    "author": ["Max Haberstroh"],
                    "_key": "homepages::97::8206",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c88a7986c0872164ab9"},
                    "mdate": "2012-05-31",
                    "author": ["P. Pitchipoo"],
                    "_key": "homepages::68::11459",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c0ea7986c0872e0965f"},
                    "ee": ["http://dx.doi.org/10.1109/TPDS.2011.284", "http://doi.ieeecomputersociety.org/10.1109/TPDS.2011.284"],
                    "number": "8",
                    "year": "2012",
                    "mdate": "2016-03-04",
                    "author": ["Elias Procpio Duarte Jr.", "Andra Weber", "Keiko Vernica Ono Fonseca"],
                    "type": "article",
                    "journal": "IEEE Trans. Parallel Distrib. Syst.",
                    "volume": "23",
                    "pages": "1415-1426",
                    "url": "db/journals/tpds/tpds23.html#DuarteWF12",
                    "title": "Distributed Diagnosis of Dynamic Events in Partitionable Arbitrary Topology Networks.",
                    "_key": "journals::tpds::DuarteWF12"
                },
                {
                    "_id": {"$oid": "595c2c33a7986c0872f0bc01"},
                    "mdate": "2013-06-23",
                    "author": ["Maja Pantic", "Robbert-Jan Grootjans", "Reinier Zwitserloot"],
                    "_key": "conf::iadis::PanticGZ04",
                    "booktitle": "CELDA",
                    "title": "Fleeble Agent Framework for Teaching an Introductory Course In AI.",
                    "pages": "525-532",
                    "url": "db/conf/iadis/celda2004.html#PanticGZ04",
                    "year": "2004",
                    "type": "inproceedings",
                    "crossref": ["conf::iadis::2004celda"]
                },
                {
                    "_id": {"$oid": "595c2c4ba7986c0872f9d9c5"},
                    "mdate": "2011-03-28",
                    "author": ["Asuncin Moreno", "Miquel Rutlln"],
                    "ee": "http://www.isca-speech.org/archive/icslp_1996/i96_1281.html",
                    "booktitle": "ICSLP",
                    "title": "Integrated polispectrum on speech recognition.",
                    "url": "db/conf/interspeech/icslp1996.html#MorenoR96",
                    "year": "1996",
                    "type": "inproceedings",
                    "_key": "conf::interspeech::MorenoR96",
                    "crossref": ["conf::interspeech::1996"]
                },
                {
                    "_id": {"$oid": "595c2c86a7986c0872151490"},
                    "mdate": "2017-01-25",
                    "author": ["Elger L. Abrahamse"],
                    "_key": "homepages::193::8756",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c8aa7986c087217fae6"},
                    "mdate": "2014-03-05",
                    "author": ["Tim Simon", "Timothy M. Simon"],
                    "_key": "homepages::52::10073",
                    "title": "Home Page",
                    "type": "www"
                },
                {
                    "_id": {"$oid": "595c2c02a7986c0872db23a7"},
                    "ee": "http://dx.doi.org/10.1002/spe.4380161002",
                    "number": "10",
                    "year": "1986",
                    "mdate": "2012-04-14",
                    "author": ["A. J. Fisher"],
                    "type": "article",
                    "journal": "Softw., Pract. Exper.",
                    "volume": "16",
                    "pages": "875-892",
                    "url": "db/journals/spe/spe16.html#Fisher86a",
                    "title": "A Multi-processor Implementation of occam.",
                    "_key": "journals::spe::Fisher86a"
                },
                {
                    "_id": {"$oid": "595c2c08a7986c0872dde477"},
                    "volume": "3",
                    "mdate": "2017-05-20",
                    "author": ["Noel M. O'Boyle", "Michael Banck", "Craig A. James", "Chris Morley", "Tim Vandermeersch", "Geoffrey R. Hutchison"],
                    "ee": "https://doi.org/10.1186/1758-2946-3-33",
                    "title": "Open Babel: An open chemical toolbox.",
                    "pages": "33",
                    "url": "db/journals/jcheminf/jcheminf3.html#OBoyleBJMVH11",
                    "journal": "J. Cheminformatics",
                    "year": "2011",
                    "type": "article",
                    "_key": "journals::jcheminf::OBoyleBJMVH11"
                },
                {
                    "_id": {"$oid": "595c2c28a7986c0872ebdeae"},
                    "ee": "http://dx.doi.org/10.1111/j.1467-8659.2007.01087.x",
                    "number": "3",
                    "year": "2007",
                    "mdate": "2008-09-15",
                    "author": ["Nico Pietroni", "Miguel A. Otaduy", "Bernd Bickel", "Fabio Ganovelli", "Markus H. Gross"],
                    "type": "article",
                    "journal": "Comput. Graph. Forum",
                    "volume": "26",
                    "pages": "637-644",
                    "url": "db/journals/cgf/cgf26.html#PietroniOBGG07",
                    "title": "Texturing Internal Surfaces from a Few Cross Sections.",
                    "_key": "journals::cgf::PietroniOBGG07"
                },
                {
                    "_id": {"$oid": "595c2c34a7986c0872f174cf"},
                    "mdate": "2017-05-17",
                    "author": ["Vlatka Hlupic", "Amardeep Singh Mann"],
                    "ee": ["https://doi.org/10.1109/WSC.1995.478849", "http://doi.ieeecomputersociety.org/10.1109/WSC.1995.478849", "http://doi.acm.org/10.1145/224401.224718"],
                    "booktitle": "Winter Simulation Conference",
                    "title": "SimSelect: A System for Simulation Software Selection.",
                    "pages": "720-727",
                    "url": "db/conf/wsc/wsc1995.html#HlupicM95",
                    "year": "1995",
                    "type": "inproceedings",
                    "_key": "conf::wsc::HlupicM95",
                    "crossref": ["conf::wsc::1995"]
                },
                {
                    "_id": {"$oid": "595c2c1da7986c0872e70c1c"},
                    "volume": "58",
                    "mdate": "2017-03-07",
                    "author": ["Ioannis Rigas", "Oleg V. Komogortsev"],
                    "ee": "http://dx.doi.org/10.1016/j.imavis.2016.03.014",
                    "title": "Current research in eye movement biometrics: An analysis based on BioEye 2015 competition.",
                    "pages": "129-141",
                    "url": "db/journals/ivc/ivc58.html#RigasK17",
                    "journal": "Image Vision Comput.",
                    "year": "2017",
                    "type": "article",
                    "_key": "journals::ivc::RigasK17"
                }
            ]
        }
    };


}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
