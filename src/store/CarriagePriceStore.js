import { makeAutoObservable } from "mobx";

export default class CarriagePriceStore {
  constructor() {
    this._prices = [
      {
        id: 1,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 50,
        min_cost: 200,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 2,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 3,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 4,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 35,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 5,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "",
        load_capacity: "",
        carrier_id: undefined,
        range: 5000,
        price: 30,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },

      {
        id: 6,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "walk",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 50,
        min_cost: 200,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 7,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "walk",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 8,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "walk",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 9,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "walk",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 35,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 10,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "walk",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5000,
        price: 30,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: false,
      },

      {
        id: 11,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "bike",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 50,
        min_cost: 200,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 12,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "bike",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 13,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "bike",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 14,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "bike",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 35,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 15,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "bike",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5000,
        price: 30,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: false,
      },

      {
        id: 16,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 50,
        min_cost: 200,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 17,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 18,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 19,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 35,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 20,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5000,
        price: 30,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: false,
      },

      {
        id: 21,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "electric_scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 50,
        min_cost: 200,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 22,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "electric_scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 23,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "electric_scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 24,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "electric_scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 35,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 25,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "electric_scooter",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5000,
        price: 30,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: false,
      },

      {
        id: 26,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "car",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 300,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 27,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "car",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 28,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "car",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 29,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "car",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 30,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },
      {
        id: 30,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "car",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5000,
        price: 20,
        min_cost: undefined,
        thermo_bag_markup: 1.1,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: 50,
        possible: true,
      },

      {
        id: 31,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "combi",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 300,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 32,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "combi",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 33,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "combi",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 34,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "combi",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 35,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "combi",
        load_capacity: undefined,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 36,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 500,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 37,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 38,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 39,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 40,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 41,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 3,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 500,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 42,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 3,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 43,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 3,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 44,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 3,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 45,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "minibus",
        load_capacity: 3,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 46,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 47,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 48,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 49,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 50,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 1.5,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 51,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 3,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 52,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 3,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 53,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 3,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 54,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 3,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 55,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 3,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 56,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 5,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 57,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 5,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 58,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 5,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 59,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 5,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 60,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 5,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 61,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 10,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 62,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 10,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 63,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 10,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 64,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 10,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 65,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 10,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },

      {
        id: 66,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 20,
        carrier_id: undefined,
        range: 3,
        price: 90,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 67,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 20,
        carrier_id: undefined,
        range: 5,
        price: 70,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 68,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 20,
        carrier_id: undefined,
        range: 10,
        price: 50,
        min_cost: 1000,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 69,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 20,
        carrier_id: undefined,
        range: 30,
        price: 45,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
      {
        id: 70,
        country: "russia",
        city: "",
        city_lat: undefined,
        city_lng: undefined,
        city_id: "",
        type: "truck",
        load_capacity: 20,
        carrier_id: undefined,
        range: 5000,
        price: 40,
        min_cost: undefined,
        thermo_bag_markup: undefined,
        thermo_van_markup: undefined,
        ref_markup: undefined,
        additional_point: undefined,
        possible: true,
      },
    ];

    makeAutoObservable(this);
  }

  setPrices(value) {
    this._prices = value;
  }

  get prices() {
    return this._prices;
  }
}
