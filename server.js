require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PokitDok = require("pokitdok-nodejs");

const authenticate = require("./src/authenticate");
const request = require("./src/request");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
const pokitdok = new PokitDok(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_SECRET);

app.get("/eligibility", async (request, response) => {
  pokitdok.eligibility(
    {
      member: {
        birth_date: "1982-01-27",
        first_name: "Angela",
        last_name: "Duena",
        id: "625900685",
      },
      provider: {
        first_name: "WILLIAM",
        last_name: "CHOI",
        npi: "1720396427",
      },
      service_types: ["health_benefit_plan_coverage"],
      trading_partner_id: "cigna",
    },
    function(err, res) {
      if (err) {
        return console.log(err, res.statusCode);
      }
      // print the member eligibility for the specified provider

      response.json({ data: res.data });
    },
  );
});

app.get("/proc", (_, response) => {
  pokitdok.medicalProcedureCodes({}, function(err, res) {
    if (err) {
      return console.log(err, res.statusCode);
    }

    for (var i = 0, ilen = res.data.length; i < ilen; i++) {
      console.log(res.data[i].code.name);
    }

    response.json({ data: res.data });
  });
});

app.get("/trading", (_, response) => {
  pokitdok.tradingPartners(function(err, res) {
    if (err) {
      return console.log(err, res.statusCode);
    }

    const dental = [];
    // print the name and trading_partner_id of each trading partner
    for (var i = 0, ilen = res.data.length; i < ilen; i++) {
      var tradingPartner = res.data[i];
      if (tradingPartner.name.toLowerCase().includes("cigna")) {
        dental.push({ name: tradingPartner.name, id: tradingPartner.id });
      }
      console.log(tradingPartner.name + ":" + tradingPartner.id);
    }

    response.json({ data: dental, count: dental.length });
  });
});

app.get("/insurance", (_, response) => {
  pokitdok.insurancePrices(
    {
      zip_code: "946213524",
      cpt_code: "90658",
    },
    function(err, res) {
      if (err) {
        return console.log(err, res.statusCode);
      }
      // print the cpt and geo_zip
      // print the average price per payment types
      for (var i = 0, ilen = res.data.amounts.length; i < ilen; i++) {
        var price = res.data.amounts[i];
        console.log(price.payment_type + ":" + price.average);
      }

      response.json({ data: res.data });
    },
  );
});

app.get("/plans", (_, response) => {
  pokitdok.plans({ plan_type: "EPO", state: "SC" }, (err, res) => {
    if (err) {
      return console.log(err.data.errors.validation, res.statusCode);
    }
    response.json({ data: res.data });
  });
});

app.get("/claims", (_, response) => {
  pokitdok.claims(
    {
      transaction_code: "chargeable",
      trading_partner_id: "MOCKPAYER",
      billing_provider: {
        taxonomy_code: "207Q00000X",
        first_name: "Jerome",
        last_name: "Aya-Ay",
        npi: "1467560003",
        address: {
          address_lines: ["8311 WARREN H ABERNATHY HWY"],
          city: "SPARTANBURG",
          state: "SC",
          zipcode: "29301",
        },
        tax_id: "123456789",
      },
      subscriber: {
        first_name: "Jane",
        last_name: "Doe",
        member_id: "W000000000",
        address: {
          address_lines: ["123 N MAIN ST"],
          city: "SPARTANBURG",
          state: "SC",
          zipcode: "29301",
        },
        birth_date: "1970-01-01",
        gender: "female",
      },
      claim: {
        total_charge_amount: 60.0,
        service_lines: [
          {
            procedure_code: "99213",
            charge_amount: 60.0,
            unit_count: 1.0,
            diagnosis_codes: ["487.1"],
            service_date: "2014-06-01",
          },
        ],
      },
    },
    function(err, res) {
      if (err) {
        return console.log(err, res.statusCode);
      }
      // print the activity id, name and state
      response({ data: res.data.id + ":" + res.data.name + ":" + res.data.state.name });
    },
  );
});

app.get("/payment", async (_, response) => {
  const token = await authenticate();
  const method = "GET";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const data = await request({ url: "https://platform.pokitdok.com/api/v4/payments/", headers, method });

  response.json({ data });
});

app.listen(process.env.PORT || 3009);

console.log("We are ON");
