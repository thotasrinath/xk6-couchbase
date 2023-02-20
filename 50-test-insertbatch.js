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
